import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
} from 'three'
import { gsap } from '../core/gsap.js'
import { particlesFragment, particlesVertex } from './shaders/particles.glsl.js'

const COUNT = 2600
const Z_BASE = -4

/* ---- formation generators ---- */

const cloud = () => {
  const a = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    a[i * 3] = (Math.random() * 2 - 1) * 22
    a[i * 3 + 1] = (Math.random() * 2 - 1) * 14
    a[i * 3 + 2] = 4 - Math.random() * 28
  }
  return a
}

const lattice = () => {
  const a = new Float32Array(COUNT * 3)
  const side = Math.ceil(Math.cbrt(COUNT))
  const s = 13 / side
  for (let i = 0; i < COUNT; i++) {
    const x = i % side
    const y = Math.floor(i / side) % side
    const z = Math.floor(i / (side * side))
    a[i * 3] = (x - side / 2) * s
    a[i * 3 + 1] = (y - side / 2) * s
    a[i * 3 + 2] = (z - side / 2) * s + Z_BASE
  }
  return a
}

/**
 * Sample a text string into COUNT particle targets: draw it on an offscreen
 * canvas, collect inked pixels, map them into world units. `maxH`/`maxW` fit
 * single glyphs by height and long strings by width.
 */
const textPoints = (text, { maxH = 10, maxW = 30, depth = 1.4 } = {}) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const fontPx = 130
  const font = `700 ${fontPx}px 'Space Grotesk', system-ui, sans-serif`
  ctx.font = font
  canvas.width = Math.ceil(ctx.measureText(text).width) + 24
  canvas.height = Math.ceil(fontPx * 1.3)
  ctx.font = font // canvas resize resets state
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  ctx.fillText(text, 12, canvas.height / 2)

  const { width: w, height: h } = canvas
  const img = ctx.getImageData(0, 0, w, h).data
  const pts = []
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (img[(y * w + x) * 4 + 3] > 128) pts.push([x / w - 0.5, 0.5 - y / h])
    }
  }
  if (!pts.length) return cloud() // canvas blocked or empty glyph — degrade gracefully

  const aspect = w / h
  const sizeH = Math.min(maxH, maxW / aspect)
  const a = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const [px, py] = pts[(Math.random() * pts.length) | 0]
    a[i * 3] = px * sizeH * aspect + (Math.random() - 0.5) * 0.14
    a[i * 3 + 1] = py * sizeH + (Math.random() - 0.5) * 0.14
    a[i * 3 + 2] = (Math.random() - 0.5) * depth + Z_BASE
  }
  return a
}

// One formation per page section, in DOM order:
// hero, stats, about → M, experience → V, projects → T, skills → MVT, contact → MVT-boizdeeptry
const buildFormations = () => [
  cloud(),
  lattice(),
  textPoints('M'),
  textPoints('V'),
  textPoints('T'),
  textPoints('MVT', { maxH: 8.5 }),
  textPoints('MVT-boizdeeptry', { maxH: 5, maxW: 26 }),
]
const DRIFT = [0.6, 0.08, 0.07, 0.07, 0.07, 0.07, 0.09]

/**
 * Morphing GPU particle field — particles fly between per-section formations
 * (free cloud → grid → the letters of the owner's identity), glowing while in
 * transit. Text formations are resampled once webfonts finish loading so the
 * glyphs render in Space Grotesk, not the fallback.
 */
export class ParticleField {
  constructor(pixelRatio = Math.min(window.devicePixelRatio, 2)) {
    const scales = new Float32Array(COUNT)
    const phases = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      scales[i] = 0.4 + Math.random() * 1.4
      phases[i] = Math.random()
    }

    this.formations = buildFormations()
    this.current = 0

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(this.formations[0].slice(), 3))
    geometry.setAttribute('aTarget', new BufferAttribute(this.formations[0].slice(), 3))
    geometry.setAttribute('aScale', new BufferAttribute(scales, 1))
    geometry.setAttribute('aPhase', new BufferAttribute(phases, 1))
    this.geometry = geometry

    document.fonts?.ready.then(() => {
      this.formations = buildFormations()
      if (this.current > 0) {
        // Re-aim at the (now correctly shaped) active formation.
        this.geometry.getAttribute('aTarget').copyArray(this.formations[this.current])
        this.geometry.getAttribute('aTarget').needsUpdate = true
      }
    })

    this.color = new Color('#6fe3ff')
    this.material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 5.5 },
        uPixelRatio: { value: pixelRatio },
        uColor: { value: this.color.clone() },
        uMorph: { value: 1 },
        uDriftA: { value: DRIFT[0] },
        uDriftB: { value: DRIFT[0] },
      },
      vertexShader: particlesVertex,
      fragmentShader: particlesFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
    })

    this.points = new Points(geometry, this.material)
    this.points.frustumCulled = false
    this.elapsed = 0
  }

  morphTo(section) {
    const i = Math.max(0, Math.min(section, this.formations.length - 1))
    if (i === this.current) return
    const u = this.material.uniforms

    this.geometry.getAttribute('position').copyArray(this.formations[this.current])
    this.geometry.getAttribute('position').needsUpdate = true
    this.geometry.getAttribute('aTarget').copyArray(this.formations[i])
    this.geometry.getAttribute('aTarget').needsUpdate = true

    u.uDriftA.value = DRIFT[this.current]
    u.uDriftB.value = DRIFT[i]
    u.uMorph.value = 0
    gsap.to(u.uMorph, { value: 1, duration: 1.8, ease: 'power2.inOut', overwrite: true })

    this.current = i
  }

  update(dt, accent) {
    this.elapsed += dt
    this.material.uniforms.uTime.value = this.elapsed
    if (accent) {
      this.color.lerp(accent, 1 - Math.exp(-2 * dt))
      this.material.uniforms.uColor.value.copy(this.color)
    }
  }
}
