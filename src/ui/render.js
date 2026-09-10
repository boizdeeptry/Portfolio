import * as en from '../data/profile.js'
import * as vi from '../data/profile.vi.js'
import { PROJECTS as CORES } from '../data/projects.js'
import { mergeProjects } from '../data/project-merge.js'
// NOTE: do NOT statically import ProjectModal.js here — it pulls gsap/lenis.

const html = (strings, ...values) => strings.reduce((out, s, i) => out + s + (values[i] ?? ''), '')

/** Pure: one project card's HTML. Card is a <button> so it is keyboard-focusable.
 *  The badge only *signals* live-vs-private — the clickable link lives in the
 *  modal, because an <a> nested inside a <button> is invalid and unfocusable. */
export function projectCardHTML(p, labels = {}) {
  const live = Boolean(p.url)
  const badge = live ? (labels.live ?? 'Live') : (labels.private ?? 'Private')
  return html`
    <button type="button" class="project-card" data-project-id="${p.id}" data-reveal>
      <div class="project-top">
        <div class="project-head">
          <h3>${p.name}</h3>
          <span class="mono project-badge ${live ? 'is-live' : 'is-private'}">${badge}</span>
        </div>
        <span class="mono project-role">${p.role}</span>
      </div>
      <p>${p.summary}</p>
      <div class="project-stack">${p.stack.map((t) => `<span class="tag mono">${t}</span>`).join('')}</div>
    </button>`
}

/** Render all data-driven sections into their containers. */
export function renderContent() {
  // Language is declared by the page (<html lang>) — one bundle serves both.
  const locale = document.documentElement.lang === 'vi' ? vi : en
  const { CONTACT, EXPERIENCE, SKILLS, PROJECT_GROUP_LABELS, PROJECT_LINK } = locale

  document.getElementById('timelineItems').innerHTML = EXPERIENCE.map(
    (job) => html`
      <article class="timeline-item" data-reveal>
        <div class="timeline-dot" aria-hidden="true"></div>
        <header class="timeline-head">
          <h3>${job.company}</h3>
          <span class="mono timeline-period">${job.period}</span>
        </header>
        ${job.roles
          .map(
            (role) => html`
              <div class="timeline-role">
                <div class="timeline-role-head">
                  <h4>${role.title}</h4>
                  <span class="mono">${role.period}</span>
                </div>
                <ul>
                  ${role.points.map((p) => `<li>${p}</li>`).join('')}
                </ul>
              </div>
            `,
          )
          .join('')}
      </article>
    `,
  ).join('')

  const projects = mergeProjects(locale.PROJECTS, CORES)
  const projectsById = new Map(projects.map((p) => [p.id, p]))

  const grid = document.getElementById('projectsGrid')
  grid.innerHTML = projects.map((p) => projectCardHTML(p, PROJECT_LINK)).join('')
  // Delegated open — cards are buttons, so Enter/Space fire click natively.
  // Lazy-import keeps gsap/lenis out of the initial bundle until first open.
  grid.addEventListener('click', async (e) => {
    const card = e.target.closest('[data-project-id]')
    if (!card) return
    const project = projectsById.get(card.dataset.projectId)
    if (!project) return
    try {
      const { openProject } = await import('./ProjectModal.js')
      openProject(project, PROJECT_GROUP_LABELS, PROJECT_LINK)
    } catch (err) {
      console.error('failed to open project modal', err)
    }
  })

  document.getElementById('skillsRows').innerHTML = SKILLS.map(
    (row) => html`
      <div class="skills-row" data-reveal>
        <span class="skills-group mono">${row.group}</span>
        <div class="skills-items">${row.items.map((i) => `<span class="tag">${i}</span>`).join('')}</div>
      </div>
    `,
  ).join('')

  document.getElementById('contactLinks').innerHTML = CONTACT.map((c) =>
    c.href
      ? html`<a class="contact-link" data-reveal href="${c.href}" target="_blank" rel="noreferrer">
          <span class="mono contact-label">${c.label}</span><span class="contact-value">${c.value}</span>
        </a>`
      : html`<div class="contact-link contact-link--static" data-reveal>
          <span class="mono contact-label">${c.label}</span><span class="contact-value">${c.value}</span>
        </div>`,
  ).join('')
}
