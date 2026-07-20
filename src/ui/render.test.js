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
console.log('render: all assertions passed')
