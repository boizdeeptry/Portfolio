import { Color, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { gsap } from '../core/gsap.js'
import { ParticleField } from './ParticleField.js'

// Camera waypoint per section — a slow dolly ride through the field
// (hero, about, experience, projects, skills, contact).
const CAM = [
  { x: 0, y: 0, z: 10, tilt: 0 },
  { x: -1.4, y: -0.8, z: 12, tilt: -0.05 },
  { x: 1.8, y: 2.2, z: 16, tilt: 0.06 },
  { x: -1.2, y: -1.6, z: 12.5, tilt: -0.04 },
  { x: 1.0, y: 1.0, z: 14.5, tilt: 0.05 },
  { x: 0, y: 0, z: 19, tilt: 0 },
]

/**
 * WebGL stage: morphing particle field, per-section camera journey, bloom and
 * scroll-velocity chromatic aberration (post pipeline), mouse parallax.
 */
export class Stage {
  constructor(canvas) {
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: false, // the bloom pass smooths points; MSAA is wasted here
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(55, 1, 0.1, 100)
    this.base = { ...CAM[0] }
    this.camera.position.set(this.base.x, this.base.y, this.base.z)

    this.field = new ParticleField(this.renderer.getPixelRatio())
    this.scene.add(this.field.points)

    // Post pipeline: render → bloom → chromatic aberration → color output.
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(new Vector2(1, 1), 0.55, 0.75, 0.12)
    this.composer.addPass(this.bloom)
    this.rgb = new ShaderPass(RGBShiftShader)
    this.rgb.uniforms.amount.value = 0
    this.composer.addPass(this.rgb)
    this.composer.addPass(new OutputPass())

    this.accent = new Color('#6fe3ff')
    this.mouse = { x: 0, y: 0 }
    this.aberration = 0
    this.last = performance.now()
    this.raf = 0
    this.running = false

    window.addEventListener('resize', () => this.resize())
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    })
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.pause() : this.resume()
    })
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      this.pause()
    })
    canvas.addEventListener('webglcontextrestored', () => this.resume())
    this.resize()
  }

  setAccent(rgbChannels) {
    const [r, g, b] = rgbChannels.split(' ').map((v) => Number(v) / 255)
    this.accent.setRGB(r, g, b)
  }

  /** Fly the camera to a section's waypoint and morph the field's formation. */
  setSection(i) {
    const target = CAM[Math.max(0, Math.min(i, CAM.length - 1))]
    gsap.to(this.base, { ...target, duration: 2.2, ease: 'power2.inOut', overwrite: true })
    // Solid shapes sit right-of-center so the text column stays readable;
    // ambient formations (hero cloud, contact galaxy) stay centered.
    const last = i === CAM.length - 1
    const offsetX = i === 0 || last ? 0 : 5.5
    const offsetY = last ? -6.2 : 0 // signature sits below the contact links
    gsap.to(this.field.points.position, { x: offsetX, y: offsetY, duration: 2.2, ease: 'power2.inOut', overwrite: true })
    this.field.morphTo(i)
  }

  /** Scroll velocity → chromatic aberration kick (decays in tick). */
  setVelocity(v) {
    this.aberration = Math.min(Math.abs(v) * 0.00022, 0.004)
  }

  resize() {
    const { innerWidth: w, innerHeight: h } = window
    this.renderer.setSize(w, h, false)
    this.composer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  tick = () => {
    const now = performance.now()
    const dt = Math.min((now - this.last) / 1000, 0.05)
    this.last = now

    // Waypoint base + eased mouse parallax on top.
    const k = 1 - Math.exp(-3 * dt)
    this.parX = (this.parX ?? 0) + (this.mouse.x * 0.9 - (this.parX ?? 0)) * k
    this.parY = (this.parY ?? 0) + (-this.mouse.y * 0.6 - (this.parY ?? 0)) * k
    this.camera.position.set(this.base.x + this.parX, this.base.y + this.parY, this.base.z)
    this.camera.lookAt(0, this.base.y * 0.25, -4)
    this.camera.rotation.z += this.base.tilt

    // Aberration eases back to rest between scroll kicks.
    this.rgb.uniforms.amount.value +=
      (this.aberration - this.rgb.uniforms.amount.value) * (1 - Math.exp(-6 * dt))
    this.aberration *= Math.exp(-2.5 * dt)

    this.field.update(dt, this.accent)
    this.composer.render()
    this.raf = requestAnimationFrame(this.tick)
  }

  start() {
    this.resume()
  }

  resume() {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.tick)
  }

  pause() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }
}
