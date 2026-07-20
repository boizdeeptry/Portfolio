import * as en from '../data/profile.js'
import * as vi from '../data/profile.vi.js'

// Language is declared by the page (<html lang>) — one bundle serves both.
const { CONTACT, EXPERIENCE, PROJECTS, SKILLS } = document.documentElement.lang === 'vi' ? vi : en

const html = (strings, ...values) => strings.reduce((out, s, i) => out + s + (values[i] ?? ''), '')

/** Render all data-driven sections into their containers. */
export function renderContent() {
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

  document.getElementById('projectsGrid').innerHTML = PROJECTS.map(
    (p) => html`
      <article class="project-card" data-reveal>
        <div class="project-top">
          <h3>${p.name}</h3>
          <span class="mono project-role">${p.role}</span>
        </div>
        <p>${p.desc}</p>
        <div class="project-stack">${p.stack.map((t) => `<span class="tag mono">${t}</span>`).join('')}</div>
      </article>
    `,
  ).join('')

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
