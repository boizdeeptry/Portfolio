// src/ui/render.test.js
import assert from 'node:assert/strict'
import { projectCardHTML } from './render.js'

const html = projectCardHTML({ id: 'prm', name: 'PRM', role: 'Tech Lead', summary: 'S', stack: ['Next.js', 'Docker'] })
assert.ok(html.includes('data-project-id="prm"'))
assert.ok(html.includes('PRM'))
assert.ok(html.includes('Tech Lead'))
assert.ok(html.includes('>S<') || html.includes('S</p>'))
assert.ok(html.includes('Next.js') && html.includes('Docker'))
assert.ok(html.includes('<button'))          // focusable trigger
assert.ok(html.includes('is-private'))       // no url -> Private signal
assert.ok(html.includes('Private'))

// a live product shows the Live badge, localized when labels are supplied
const liveHTML = projectCardHTML(
  { id: 'ddcc', name: 'DDCC', role: 'Tech Lead', summary: 'S', stack: ['Next.js'], url: 'https://ddcc.vn/' },
  { live: 'Live', private: 'Private' },
)
assert.ok(liveHTML.includes('is-live'))
assert.ok(!liveHTML.includes('is-private'))
// the card never carries the href — an <a> inside a <button> is invalid
assert.ok(!liveHTML.includes('href'))

console.log('render: all assertions passed')
