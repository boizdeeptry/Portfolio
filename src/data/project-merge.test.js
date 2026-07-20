// src/data/project-merge.test.js
import assert from 'node:assert/strict'
import { mergeProjects, resolveGroupLabel, projectToLines } from './project-merge.js'

// mergeProjects: joins by id, overlay fields win, order follows overlays
const cores = [{ id: 'a', repo: 'ra', stack: ['X'], skills: [] }, { id: 'b', repo: 'rb', stack: [], skills: [] }]
const overlays = [{ id: 'b', name: 'B', summary: 'sb' }, { id: 'a', name: 'A', summary: 'sa' }]
const merged = mergeProjects(overlays, cores)
assert.equal(merged.length, 2)
assert.equal(merged[0].id, 'b')            // order follows overlays
assert.equal(merged[0].repo, 'rb')         // core field present
assert.equal(merged[1].name, 'A')          // overlay field present

// mergeProjects: overlay with no core is dropped
assert.equal(mergeProjects([{ id: 'ghost', name: 'G' }], cores).length, 0)

// resolveGroupLabel: known -> label, unknown -> key
assert.equal(resolveGroupLabel('frontend', { frontend: 'Frontend' }), 'Frontend')
assert.equal(resolveGroupLabel('nope', { frontend: 'Frontend' }), 'nope')

// projectToLines: problem, blank, • highlights, blank, then "Label items"
const lines = projectToLines(
  { problem: 'P', highlights: ['h1', 'h2'], skills: [{ group: 'frontend', items: ['Next.js', 'React'] }] },
  { frontend: 'Frontend' },
)
assert.deepEqual(lines, ['P', '', '• h1', '• h2', '', 'Frontend   Next.js · React'])

console.log('project-merge: all assertions passed')
