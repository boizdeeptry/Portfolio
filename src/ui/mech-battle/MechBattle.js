import { Application, Assets, Rectangle, Texture } from 'pixi.js'
import { Director } from './director.js'
import { VARIANTS } from './parts.js'
import { renderLifecycle } from '../../core/render-lifecycle.js'

/**
 * Slice a horizontal sprite strip into per-frame textures. The frame size is
 * derived from the sheet height (frames are square), so a sheet with a different
 * frame size — e.g. Special2 at 102px — just works without per-sheet config.
 */
async function loadStrip(url) {
  const sheet = await Assets.load(url)
  sheet.source.scaleMode = 'nearest' // crisp pixels, no smoothing
  const fh = sheet.height
  const fw = fh
  const count = Math.max(1, Math.round(sheet.width / fw))
  const frames = []
  for (let i = 0; i < count; i++) {
    frames.push(new Texture({ source: sheet.source, frame: new Rectangle(i * fw, 0, fw, fh) }))
  }
  return frames
}

async function loadVariant(v) {
  const entries = await Promise.all(
    Object.entries(v.sheets).map(async ([state, url]) => [state, await loadStrip(url)]),
  )
  return { accent: v.accent, frames: Object.fromEntries(entries) }
}

/**
 * Mount a decorative pixel mech battle into `container` (the terminal's
 * `.term__scene`). Returns a handle whose `destroy()` is idempotent and safe
 * even if called before the async Pixi `init()` / asset loads resolve (the
 * destroy-before-init race — the #1 Pixi v8 pitfall).
 */
export function mountMechBattle(container, { reducedMotion = false } = {}) {
  let app = null
  let destroyed = false
  let loop = null
  let disposeLifecycle = null

  ;(async () => {
    const a = new Application()
    try {
      await a.init({
        width: Math.max(320, container.clientWidth || 800),
        height: Math.max(160, container.clientHeight || 210), // taller stage → room for high dodge leaps (CSS sets .term__scene height)
        backgroundAlpha: 0, // transparent — the terminal shows through
        antialias: false, // crisp pixels
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
        // Keep every sprite sheet resident. Pixi's GC unloads GPU textures unused
        // for ~60s; the rarely-shown sheets (hurt/fly/death) get evicted, and on
        // re-upload a mech briefly samples a stale GPU slot — flashing ANOTHER
        // mech's body for a frame (the "green↔blue swaps shape" glitch). The mech
        // art is tiny (a handful of sheets), so pinning it costs almost nothing.
        gcActive: false,
      })
    } catch (e) {
      console.warn('mech-battle: pixi init failed', e)
      return
    }
    if (destroyed) {
      a.destroy({ removeView: true }, { children: true })
      return
    }

    let variants, specialFrames
    try {
      // Special.png is a single shared shockwave sheet (no per-variant version),
      // loaded once and reused for every mech's ultimate burst.
      ;[variants, specialFrames] = await Promise.all([
        Promise.all(VARIANTS.map(loadVariant)),
        loadStrip('/mech/Special.png'),
      ])
    } catch (e) {
      console.warn('mech-battle: sprite load failed', e)
      a.destroy({ removeView: true }, { children: true })
      return
    }
    if (destroyed) {
      a.destroy({ removeView: true }, { children: true })
      return
    }

    app = a
    a.stage.roundPixels = true
    container.appendChild(a.canvas)

    const director = new Director(a, variants, specialFrames)
    if (import.meta.env.DEV) window.__mbDirector = director // debug hook (stripped from prod build)
    if (!reducedMotion) {
      loop = (ticker) => {
        if (import.meta.env.DEV) window.__mechFrames = (window.__mechFrames || 0) + 1
        director.update(Math.min(ticker.deltaMS / 1000, 0.05))
      }
      a.ticker.add(loop)
      a.ticker.stop() // let the coordinator drive start/stop
      disposeLifecycle = renderLifecycle.register(
        {
          resume: () => a.ticker.start(),
          pause: () => a.ticker.stop(),
        },
        { pauseWhenCovered: false }, // the mech lives INSIDE the terminal — only the tab-hidden gate applies
      )
    } else {
      director.update(0) // lay out mechs + draw HP bars once
      director.freeze() // ...then hold a still pose (no looping animation)
      a.render() // paint that one static frame (autoStart hasn't ticked yet)...
      a.ticker.stop() // ...then idle the CPU — nothing animates under reduced motion
    }
  })()

  return {
    destroy() {
      destroyed = true
      disposeLifecycle?.()
      if (app) {
        if (loop) app.ticker.remove(loop)
        app.ticker.stop()
        app.destroy({ removeView: true }, { children: true })
        app = null
      }
    },
  }
}
