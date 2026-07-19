import { gsap } from '../core/gsap.js'
import { el } from './dom.js'

const HOVERABLES = 'a, button, .project-card'

/** Custom cursor: instant dot + lagging ring that swells over interactives. */
export function mountCursor() {
  if (!window.matchMedia('(hover: fine)').matches) return

  const dot = el('div', { class: 'cursor-dot', 'aria-hidden': 'true' })
  const ring = el('div', { class: 'cursor-ring', 'aria-hidden': 'true' }, el('span', { class: 'cursor-ring-c' }))
  document.body.append(dot, ring)
  document.body.classList.add('has-cursor')

  let x = innerWidth / 2
  let y = innerHeight / 2
  let rx = x
  let ry = y

  window.addEventListener('pointermove', (e) => {
    x = e.clientX
    y = e.clientY
    dot.style.transform = `translate(${x}px, ${y}px)`
  })

  gsap.ticker.add(() => {
    rx += (x - rx) * 0.16
    ry += (y - ry) * 0.16
    ring.style.transform = `translate(${rx}px, ${ry}px)`
  })

  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(HOVERABLES)) document.body.classList.add('cursor-hover')
  })
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(HOVERABLES)) document.body.classList.remove('cursor-hover')
  })
}
