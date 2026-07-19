import './styles/main.css'

import { ScrollTrigger } from './core/gsap.js'
import { initSmoothScroll, getLenis } from './core/smooth-scroll.js'
import { renderContent } from './ui/render.js'
import { runPreloader } from './ui/Preloader.js'
import { mountTerminalIntro } from './ui/TerminalIntro.js'
import { mountCursor } from './ui/Cursor.js'
import {
  animateHeader,
  animateHero,
  animateReveals,
  animateScrambles,
  animateStats,
  animateTimeline,
  trackAccents,
} from './ui/reveal.js'

const ENTERED_KEY = 'mvt-entered'

function boot() {
  renderContent()
  initSmoothScroll()

  // Gate once per browser session: after the first entry, reloads (dev HMR,
  // F5, back/forward) land straight on the content instead of replaying the
  // preloader + terminal intro.
  const entered = sessionStorage.getItem(ENTERED_KEY) === '1'
  if (!entered) getLenis().stop() // locked behind the terminal intro

  const canvas = document.createElement('canvas')
  canvas.className = 'webgl-canvas'
  document.body.prepend(canvas)

  const grain = document.createElement('div')
  grain.className = 'grain'
  grain.setAttribute('aria-hidden', 'true')
  document.body.appendChild(grain)

  animateReveals()
  animateScrambles()
  animateStats()
  animateTimeline()
  animateHeader()
  mountCursor()

  // Boot order: the inline preloader (0 → 100) is the true first paint; the
  // 3D stage streams in behind it. When assets are ready the loader hands off
  // to the terminal intro, whose dismissal unlocks scroll + fires the hero.
  let resolveStage
  const stageReady = new Promise((resolve) => { resolveStage = resolve })

  import('./three/Stage.js')
    .then(({ Stage }) => {
      const stage = new Stage(canvas)
      stage.start()
      trackAccents((channels, index) => {
        stage.setAccent(channels)
        stage.setSection(index)
      })
      getLenis()?.on('scroll', () => stage.setVelocity(getLenis().velocity || 0))
    })
    .catch((e) => console.warn('webgl stage failed to load', e))
    .finally(() => resolveStage())

  if (entered) {
    document.getElementById('preloader')?.remove()
  } else {
    runPreloader({ ready: stageReady }).then(() => {
      mountTerminalIntro({
        gateReady: stageReady,
        onDismiss: () => {
          sessionStorage.setItem(ENTERED_KEY, '1')
          getLenis().start()
          animateHero()
        },
      })
    })
  }

  window.addEventListener('load', () => ScrollTrigger.refresh())
  setTimeout(() => ScrollTrigger.refresh(), 400)
}

boot()
