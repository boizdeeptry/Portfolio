import assert from 'node:assert/strict'
import { validate } from './projects.check.js'

const labels = { frontend: 'Frontend' }
const en = (id) => ({ id, name: 'A', summary: 'sa', problem: 'pa', highlights: ['h'] })
const vi = (id) => ({ id, name: 'Ạ', summary: 'sạ', problem: 'pạ', highlights: ['h'] })

// consistent -> no errors. url: null is the explicit "Private" choice.
assert.deepEqual(
  validate(
    [{ id: 'a', url: null, skills: [{ group: 'frontend', items: ['X'] }] }],           // cores
    [en('a')], [vi('a')], labels, labels,
  ),
  [],
)
// a live https url is equally valid
assert.deepEqual(
  validate([{ id: 'a', url: 'https://example.com', skills: [] }], [en('a')], [vi('a')], labels, labels),
  [],
)
// core with no VI overlay, unknown group, missing label, empty summary
const errs = validate(
  [{ id: 'a', url: null, skills: [{ group: 'ghost', items: [] }] }],
  [{ id: 'a', name: 'A', summary: '' }],
  [],
  labels, {},
)
assert.ok(errs.some((e) => e.includes('VI') && e.includes('a')))
assert.ok(errs.some((e) => e.includes('ghost')))
assert.ok(errs.some((e) => e.includes('summary')))

// url must be an explicit decision, and must not be plain http
const urlErrs = validate([{ id: 'a', skills: [] }], [en('a')], [vi('a')], labels, labels)
assert.ok(urlErrs.some((e) => e.includes('missing url')), 'undefined url is rejected')
const httpErrs = validate([{ id: 'a', url: 'http://x.com', skills: [] }], [en('a')], [vi('a')], labels, labels)
assert.ok(httpErrs.some((e) => e.includes('non-https')), 'http url is rejected')

console.log('projects.check: all assertions passed')
