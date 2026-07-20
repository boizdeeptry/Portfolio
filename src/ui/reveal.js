import { gsap, ScrollTrigger } from '../core/gsap.js'

/* Terminal-style scramble: characters flicker through random glyphs, then
 * settle left-to-right into the final text (igloo text-glitch nod). */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#'
const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]

function scramble(node, final, { duration = 850, delay = 0 } = {}) {
  const roll = (settled) =>
    final
      .split('')
      .map((c, i) => (i < settled || c === ' ' ? c : glyph()))
      .join('')
  node.nodeValue = roll(0) // mask the final text immediately — no first-frame flash
  const start = performance.now() + delay
  const step = (now) => {
    const p = Math.min(Math.max(now - start, 0) / duration, 1)
    node.nodeValue = p < 1 ? roll(Math.floor(p * final.length)) : final
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/** Hero entrance — the title scrambles in, the rest fades up. Plays once on load. */
export function animateHero() {
  document.querySelectorAll('.hero-title [data-hero="line"]').forEach((line, i) => {
    const textNode = line.firstChild // leading text node; keeps the caret span intact
    if (textNode?.nodeType === Node.TEXT_NODE) {
      scramble(textNode, textNode.nodeValue, { delay: 350 + i * 160 })
    }
  })

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-hero="kicker"]', { y: 24, autoAlpha: 0, duration: 0.7 })
    .from('[data-hero="sub"]', { y: 28, autoAlpha: 0, duration: 0.8 }, '+=0.6')
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

/** Scramble reveal for single-line section titles, fired once on scroll-in. */
export function animateScrambles() {
  document.querySelectorAll('.section-title').forEach((title) => {
    const textNode = title.firstChild // single text node; multi-line titles are skipped
    if (textNode?.nodeType !== Node.TEXT_NODE) return
    const final = textNode.nodeValue
    ScrollTrigger.create({
      trigger: title,
      start: 'top 86%',
      once: true,
      onEnter: () => scramble(textNode, final),
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
    trigger: '#about',
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
