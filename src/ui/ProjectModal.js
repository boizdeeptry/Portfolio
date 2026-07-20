import { gsap } from '../core/gsap.js'
import { renderLifecycle } from '../core/render-lifecycle.js'
import { getLenis } from '../core/smooth-scroll.js'
import { el } from './dom.js'
import { typeInto } from './typewriter.js'
import { projectToLines } from '../data/project-merge.js'

let current = null // { overlay, trigger, ctrl }

/** Open the terminal modal for a merged project. Closes any open one first. */
export function openProject(project, labels) {
  closeProject()
  const trigger = document.activeElement
  const repo = project.repo ?? project.id
  const out = el('pre', { class: 'pjm__out' })

  const win = el('div', { class: 'term__win pjm__win' },
    el('div', { class: 'term__bar' },
      el('div', { class: 'term__lights' },
        el('span', { class: 'term__light is-red' }),
        el('span', { class: 'term__light is-amber' }),
        el('span', { class: 'term__light is-green' })),
      el('div', { class: 'term__title' }, `boizdeeptry@portfolio — ${project.name}`),
      el('button', { type: 'button', class: 'term__enter pjm__close', 'aria-label': 'close' }, 'esc')),
    el('div', { class: 'term__body' }, out))

  const overlay = el('div', {
    class: 'term pjm', 'data-lenis-prevent': '', role: 'dialog', 'aria-modal': 'true',
    'aria-label': project.name, tabindex: '-1',
  }, win)

  document.body.appendChild(overlay)
  document.body.classList.add('terminal-open')
  renderLifecycle.setCovered(true)
  getLenis()?.stop()

  const ctrl = new AbortController()
  current = { overlay, trigger, ctrl }

  overlay.focus({ preventScroll: true })
  // Type the command like a real shell, then dump the file at once (cat doesn't
  // type). Keeps long, detailed content readable instead of a slow char crawl.
  const body = projectToLines(project, labels).join('\n')
  typeInto(out, `$ cat ./${repo}.md\n\n`, { signal: ctrl.signal }).then(() => {
    if (!ctrl.signal.aborted) out.textContent += body
  })

  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProject() })
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeProject() })
  win.querySelector('.pjm__close').addEventListener('click', closeProject)
}

/** Close the open modal (if any), restoring scroll + focus. */
export function closeProject() {
  if (!current) return
  const { overlay, trigger, ctrl } = current
  current = null
  ctrl.abort()
  renderLifecycle.setCovered(false)
  getLenis()?.start()
  gsap.to(overlay, {
    opacity: 0, duration: 0.3, ease: 'power2.inOut',
    onComplete: () => {
      overlay.remove()
      // Only restore shared page state if no newer modal opened meanwhile.
      if (!current) {
        document.body.classList.remove('terminal-open')
        trigger?.focus?.()
      }
    },
  })
}
