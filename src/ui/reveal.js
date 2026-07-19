import { gsap, ScrollTrigger } from '../core/gsap.js'

/** Hero entrance — plays once on load. */
export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('[data-hero="kicker"]', { y: 24, autoAlpha: 0, duration: 0.7 })
    .from('[data-hero="line"]', { yPercent: 110, duration: 1.0, stagger: 0.12 }, '-=0.35')
    .from('[data-hero="sub"]', { y: 28, autoAlpha: 0, duration: 0.8 }, '-=0.5')
    .from('[data-hero="actions"]', { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.5')
    .from('[data-hero="hint"]', { autoAlpha: 0, duration: 0.8 }, '-=0.2')
}

/** Generic fade-up reveals for everything tagged data-reveal. */
export function animateReveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 44,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    })
  })
}

/** Count-up numbers in the stats strip. */
export function animateStats() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const suffix = el.dataset.suffix || ''
    const state = { v: 0 }
    gsap.to(state, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: () => {
        el.textContent = `${Math.round(state.v)}${suffix}`
      },
    })
  })
}

/** Timeline rail fills as you scroll through the experience section. */
export function animateTimeline() {
  gsap.to('#railFill', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#timeline',
      start: 'top 70%',
      end: 'bottom 45%',
      scrub: 0.6,
    },
  })
}

/** Header gains a backdrop once you leave the hero. */
export function animateHeader() {
  ScrollTrigger.create({
    trigger: '#stats',
    start: 'top 80%',
    onEnter: () => document.getElementById('siteHeader').classList.add('is-scrolled'),
    onLeaveBack: () => document.getElementById('siteHeader').classList.remove('is-scrolled'),
  })
}

/**
 * Follow the active section: flip the --accent CSS variable and notify the
 * WebGL stage (tint + formation + camera waypoint) with the section index.
 */
export function trackAccents(onSection) {
  document.querySelectorAll('.section[data-accent]').forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (!self.isActive) return
        const channels = section.dataset.accent
        document.documentElement.style.setProperty('--accent', channels)
        onSection?.(channels, index)
      },
    })
  })
}

/* Terminal-style scramble reveal for section titles (igloo text-glitch nod). */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#'
export function animateScrambles() {
  document.querySelectorAll('.section-title, .contact-title').forEach((base) => {
    const target = base.classList.contains('contact-title') ? null : base
    if (!target) return // keep the multi-line contact title on the fade path
    const final = target.textContent
    ScrollTrigger.create({
      trigger: target,
      start: 'top 86%',
      once: true,
      onEnter: () => scramble(target, final),
    })
  })
}

function scramble(node, final, duration = 850) {
  const start = performance.now()
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const settled = Math.floor(p * final.length)
    node.textContent = final
      .split('')
      .map((c, i) => (i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join('')
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
