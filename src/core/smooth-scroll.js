import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap.js'

let lenis = null

export const getLenis = () => lenis

/** Boot Lenis and drive it from GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // Anchor links scroll through Lenis so easing stays consistent.
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: 0, duration: 1.4 })
    })
  })

  return lenis
}
