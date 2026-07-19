const DEFAULT_SPEED = 16 // ms per character

/**
 * Append `text` into `target` one character at a time. Resolves when done; if
 * `signal` aborts, stops and resolves early. Instant under reduced motion.
 */
export function typeInto(target, text, { speed = DEFAULT_SPEED, signal } = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || speed <= 0) {
    target.textContent += text
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    let i = 0
    const id = setInterval(() => {
      if (signal?.aborted) {
        clearInterval(id)
        resolve()
        return
      }
      target.textContent += text[i] ?? ''
      if (++i >= text.length) {
        clearInterval(id)
        resolve()
      }
    }, speed)
    signal?.addEventListener('abort', () => { clearInterval(id); resolve() }, { once: true })
  })
}

/** Type an array of lines, each followed by a newline. Cancelable via `signal`. */
export async function typeLines(target, lines, opts = {}) {
  for (const line of lines) {
    if (opts.signal?.aborted) return
    await typeInto(target, line + '\n', opts)
  }
}
