import { gsap, ScrollTrigger } from '../core/gsap.js'
import { renderLifecycle } from '../core/render-lifecycle.js'
import { TERMINAL } from '../data/terminal.js'
import { el } from './dom.js'
import { typeInto } from './typewriter.js'

const SCROLL_ENTER_THRESHOLD = 36

/**
 * Fake-terminal entry overlay (adapted from system-design's "mech terminal").
 * Gates entry: scroll / Enter / the hint pill dismisses it, which unlocks Lenis
 * and fires the hero animation via `onDismiss`. Tabs cat/ls persona files with
 * typewritten, shell-coloured output. A decorative pixel mech battle (Pixi)
 * streams into the reserved scene, skipped under reduced motion.
 */
export function mountTerminalIntro({ gateReady, onDismiss } = {}) {
  const t = TERMINAL

  // --- window chrome ---
  const bar = el(
    'div',
    { class: 'term__bar' },
    el(
      'div',
      { class: 'term__lights' },
      el('span', { class: 'term__light is-red' }),
      el('span', { class: 'term__light is-amber' }),
      el('span', { class: 'term__light is-green' }),
    ),
    el('div', { class: 'term__title' }, `${t.host} — bash`),
    el('button', { type: 'button', class: 'term__enter' }, t.enterLabel),
  )

  const tabEls = t.tabs.map((tab) =>
    el(
      'button',
      { type: 'button', class: 'term__tab', 'data-cmd': tab.cmd },
      el('span', { class: 'term__tabicon' }, tab.icon),
      tab.file,
    ),
  )
  const tabRow = el('div', { class: 'term__tabs' }, ...tabEls)

  const out = el('div', { class: 'term__out' })
  const scene = el('div', { class: 'term__scene', 'aria-hidden': 'true' })
  const body = el('div', { class: 'term__body' }, out, scene)

  const clock = el('span', { class: 'term__clock' }, '')
  const status = el(
    'div',
    { class: 'term__status' },
    el('span', {}, t.shell),
    el('div', { class: 'term__statusright' }, el('span', {}, 'UTF-8'), el('span', {}, 'LF'), clock),
  )

  const win = el('div', { class: 'term__win' }, bar, tabRow, body, status)
  const overlay = el('div', { class: 'term', 'data-lenis-prevent': '', tabindex: '-1' }, win)
  document.body.appendChild(overlay)
  document.body.classList.add('terminal-open')
  renderLifecycle.setCovered(true)

  let typing = new AbortController()
  let dismissed = false
  let battle = null
  let loginLine = null

  // --- dismiss → hand off to the page ---
  const dismiss = async () => {
    if (dismissed) return
    dismissed = true
    if (gateReady) await gateReady
    renderLifecycle.setCovered(false)
    typing.abort()
    clearInterval(clockId)
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        battle?.destroy()
        overlay.remove()
        document.body.classList.remove('terminal-open')
        ScrollTrigger.refresh()
        onDismiss?.()
      },
    })
  }

  // --- coloured, typewritten output ---
  const addLine = () => out.appendChild(el('div', { class: 'term__line' }))
  const typeSegs = async (line, segs, signal, speed) => {
    for (const s of segs) {
      if (signal?.aborted) return
      const span = line.appendChild(el('span', s.cls ? { class: s.cls } : {}))
      await typeInto(span, s.text, { signal, speed })
    }
  }
  const classify = (text) => {
    const s = text.trimStart()
    if (s.startsWith('#')) return [{ text, cls: 'tok-comment' }]
    if (s.startsWith('- ')) {
      const i = text.indexOf('- ')
      return [{ text: text.slice(0, i + 2), cls: 'tok-bullet' }, { text: text.slice(i + 2), cls: '' }]
    }
    return [{ text, cls: '' }]
  }
  const promptSegs = (command) => [
    { text: t.host, cls: 'tok-host' },
    { text: ' ~ $ ', cls: 'tok-prompt' },
    { text: command, cls: 'tok-cmd' },
  ]
  const fileToCmd = (file) =>
    file.endsWith('/') ? `ls -la ./${file}` : file.endsWith('.sh') ? `./${file}` : `cat ./${file}`
  const printLines = async (lines, signal, speed) => {
    for (const text of lines) {
      if (signal?.aborted) return
      await typeSegs(addLine(), classify(text), signal, speed)
    }
  }
  const addOutputLabel = () => {
    out.appendChild(
      el(
        'div',
        { class: 'term__line term__outlabel' },
        el('span', { class: 'tok-label-dot' }, '● '),
        el('span', { class: 'tok-label' }, 'output:'),
      ),
    )
  }
  const addPromptLine = () => {
    out.appendChild(
      el(
        'div',
        { class: 'term__line' },
        el('span', { class: 'tok-host' }, t.host),
        el('span', { class: 'tok-prompt' }, ' ~ $ '),
        el('span', { class: 'term__caret', 'aria-hidden': 'true' }),
      ),
    )
  }

  // Contact tab: message field → mailto on Enter.
  const appendContactInput = () => {
    const input = el('input', {
      class: 'term__input',
      type: 'text',
      placeholder: 'your message…',
      'aria-label': 'message',
    })
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        location.href = `mailto:manvantruong2k@gmail.com?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(input.value)}`
      }
    })
    out.appendChild(input)
    return input
  }

  // --- run a tab ---
  const run = async (tab) => {
    typing.abort()
    typing = new AbortController()
    const sig = typing.signal
    out.replaceChildren()
    loginLine = null
    const cmd = fileToCmd(tab.file)
    await typeSegs(addLine(), promptSegs(cmd), sig)
    if (sig.aborted) return
    addOutputLabel()
    await printLines(t.output[tab.cmd], sig)
    if (sig.aborted) return
    if (tab.cmd === 'contact') appendContactInput().focus()
    out.scrollTop = out.scrollHeight
  }

  const setActiveTab = (b) => {
    tabEls.forEach((x) => x.classList.toggle('is-active', x === b))
    tabRow.classList.add('has-active')
  }
  tabEls.forEach((b, i) =>
    b.addEventListener('click', () => {
      setActiveTab(b)
      run(t.tabs[i])
    }),
  )

  // --- entry: wheel / swipe / Enter / hint pill ---
  bar.querySelector('.term__enter').addEventListener('click', dismiss)
  overlay.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault()
      if (e.deltaY > SCROLL_ENTER_THRESHOLD) dismiss()
    },
    { passive: false },
  )
  let touchStartY = null
  overlay.addEventListener('touchstart', (e) => { touchStartY = e.touches[0]?.clientY ?? null }, { passive: true })
  overlay.addEventListener(
    'touchmove',
    (e) => {
      if (touchStartY == null) return
      if (touchStartY - (e.touches[0]?.clientY ?? touchStartY) > SCROLL_ENTER_THRESHOLD) {
        e.preventDefault()
        dismiss()
      }
    },
    { passive: false },
  )
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'INPUT') dismiss()
  })

  // --- live status-bar clock + login banner re-stamp ---
  const pad = (n) => String(n).padStart(2, '0')
  const stampLogin = () => {
    if (loginLine?.isConnected) loginLine.replaceChildren(el('span', {}, t.login()))
  }
  const tick = () => {
    const d = new Date()
    clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    stampLogin()
  }
  tick()
  const clockId = setInterval(tick, 1000)

  // --- boot sequence ---
  const boot = async () => {
    out.replaceChildren()
    addPromptLine()
    const sig = typing.signal
    const line = addLine()
    await typeSegs(line, classify(t.login()), sig)
    if (sig.aborted) return
    loginLine = line
    await printLines([t.hint], sig)
  }
  boot()
  overlay.focus({ preventScroll: true })

  // Decorative pixel mech battle (Pixi) — deferred, skipped under reduced motion
  // or on very short viewports where the scene is hidden.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reducedMotion && !window.matchMedia('(max-height: 560px)').matches) {
    import('./mech-battle/MechBattle.js')
      .then((m) => { if (!dismissed) battle = m.mountMechBattle(scene, { reducedMotion }) })
      .catch((e) => console.warn('mech-battle: load failed', e))
  }
}
