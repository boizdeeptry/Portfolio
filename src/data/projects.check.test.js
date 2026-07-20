import assert from 'node:assert/strict'
import { validate } from './projects.check.js'

const labels = { frontend: 'Frontend' }
// consistent -> no errors
assert.deepEqual(
  validate(
    [{ id: 'a', skills: [{ group: 'frontend', items: ['X'] }] }],                      // cores
    [{ id: 'a', name: 'A', summary: 'sa', problem: 'pa', highlights: ['h'] }],          // en
    [{ id: 'a', name: 'Ạ', summary: 'sạ', problem: 'pạ', highlights: ['h'] }],          // vi
    labels, labels,
  ),
  [],
)
// core with no VI overlay, unknown group, missing label, empty summary
const errs = validate(
  [{ id: 'a', skills: [{ group: 'ghost', items: [] }] }],
  [{ id: 'a', name: 'A', summary: '' }],
  [],
  labels, {},
)
assert.ok(errs.some((e) => e.includes('VI') && e.includes('a')))
assert.ok(errs.some((e) => e.includes('ghost')))
assert.ok(errs.some((e) => e.includes('summary')))

console.log('projects.check: all assertions passed')
