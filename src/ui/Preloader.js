import { gsap } from '../core/gsap.js'

/**
 * Drive the inline #preloader (0 → 100). The counter crawls to 90 while assets
 * load, then snaps to 100 once `ready` resolves (min display time keeps it from
 * blinking on fast loads; a hard timeout keeps it from ever hanging the door).
 * Resolves after the overlay has faded out and been removed.
 */
export function runPreloader({ ready = Promise.resolve(), minDuration = 1.8, maxWait = 6000 } = {}) {
  const root = document.getElementById('preloader')
  if (!root) return Promise.resolve()
  const count = root.querySelector('#preCount')
  const bar = root.querySelector('#preBar')

  const state = { v: 0 }
  let shown = -1
  const render = () => {
    const n = Math.round(state.v)
    if (n === shown) return
    shown = n
    count.textContent = n
    bar.style.transform = `scaleX(${n / 100})`
  }

  const crawl = gsap.to(state, { v: 90, duration: 2.8, ease: 'power2.out', onUpdate: render })
  const minTime = new Promise((r) => setTimeout(r, minDuration * 1000))
  const fonts = document.fonts?.ready ?? Promise.resolve()
  const timeout = new Promise((r) => setTimeout(r, maxWait))

  return Promise.race([Promise.all([ready, fonts, minTime]), timeout]).then(
    () =>
      new Promise((resolve) => {
        crawl.kill()
        gsap.to(state, {
          v: 100,
          duration: 0.35,
          ease: 'power1.in',
          onUpdate: render,
          onComplete: () => {
            gsap.to(root, {
              autoAlpha: 0,
              duration: 0.45,
              delay: 0.15,
              ease: 'power2.inOut',
              onComplete: () => {
                root.remove()
                resolve()
              },
            })
          },
        })
      }),
  )
}
