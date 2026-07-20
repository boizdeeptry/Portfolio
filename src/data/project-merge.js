// src/data/project-merge.js

/** Join localized overlays to neutral cores by id. Overlay order wins; an
 *  overlay with no matching core is dropped with a warning. */
export function mergeProjects(overlays, cores) {
  const byId = new Map(cores.map((c) => [c.id, c]))
  const out = []
  for (const o of overlays) {
    const core = byId.get(o.id)
    if (!core) {
      console.warn(`project overlay "${o.id}" has no core in projects.js — skipped`)
      continue
    }
    out.push({ ...core, ...o })
  }
  return out
}

/** Localized label for a skill-group key; falls back to the key itself. */
export function resolveGroupLabel(key, labels) {
  const label = labels[key]
  if (!label) {
    console.warn(`no label for project skill group "${key}"`)
    return key
  }
  return label
}

/** Text lines for the modal body: summary, blank, then "Label   a · b · c". */
export function projectToLines(project, labels) {
  const lines = []
  if (project.summary) lines.push(project.summary, '')
  for (const { group, items } of project.skills ?? []) {
    lines.push(`${resolveGroupLabel(group, labels).padEnd(10)} ${items.join(' · ')}`)
  }
  return lines
}
