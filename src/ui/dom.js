/**
 * Minimal hyperscript helper. `el('div', { class, onClick, dataset, html }, ...children)`.
 * Children may be nodes, strings, arrays, or null (skipped).
 */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag)
  for (const [key, value] of Object.entries(props)) {
    if (value == null) continue
    if (key === 'class') node.className = value
    else if (key === 'html') node.innerHTML = value
    else if (key === 'dataset') Object.assign(node.dataset, value)
    else if (key.startsWith('on') && typeof value === 'function')
      node.addEventListener(key.slice(2).toLowerCase(), value)
    else node.setAttribute(key, value)
  }
  append(node, children)
  return node
}

function append(node, children) {
  for (const child of children) {
    if (child == null || child === false) continue
    if (Array.isArray(child)) append(node, child)
    else node.appendChild(child instanceof Node ? child : document.createTextNode(String(child)))
  }
}
