import { PROJECTS as CORES } from './projects.js'
import { PROJECTS as EN, PROJECT_GROUP_LABELS as EN_LABELS } from './profile.js'
import { PROJECTS as VI, PROJECT_GROUP_LABELS as VI_LABELS } from './profile.vi.js'

/** Pure validator — returns a list of drift errors (empty = consistent). */
export function validate(cores, en, vi, enLabels, viLabels) {
  const errors = []
  const enIds = new Set(en.map((p) => p.id))
  const viIds = new Set(vi.map((p) => p.id))
  const groups = new Set(Object.keys(enLabels))

  for (const core of cores) {
    if (!enIds.has(core.id)) errors.push(`EN overlay missing for core "${core.id}"`)
    if (!viIds.has(core.id)) errors.push(`VI overlay missing for core "${core.id}"`)
    for (const s of core.skills ?? []) {
      if (!groups.has(s.group)) errors.push(`core "${core.id}" uses unknown group "${s.group}"`)
    }
  }
  for (const key of Object.keys(enLabels)) {
    if (!(key in viLabels)) errors.push(`VI_LABELS missing "${key}"`)
  }
  for (const [loc, list] of [['EN', en], ['VI', vi]]) {
    for (const p of list) {
      if (!p.name) errors.push(`${loc} overlay "${p.id}" missing name`)
      if (!p.summary) errors.push(`${loc} overlay "${p.id}" missing summary`)
      if (!p.problem) errors.push(`${loc} overlay "${p.id}" missing problem`)
      if (!p.highlights?.length) errors.push(`${loc} overlay "${p.id}" missing highlights`)
    }
  }
  return errors
}

/** Bound to the real data files. */
export function checkProjects() {
  return validate(CORES, EN, VI, EN_LABELS, VI_LABELS)
}

// CLI: `node src/data/projects.check.js`
if (process.argv[1]?.endsWith('projects.check.js')) {
  const errors = checkProjects()
  if (errors.length) {
    console.error('projects.check FAILED:\n' + errors.join('\n'))
    process.exit(1)
  }
  console.log(`projects.check: ${CORES.length} projects consistent`)
}
