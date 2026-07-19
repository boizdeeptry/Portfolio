// src/core/render-lifecycle.js
// Central render-lifecycle coordinator. Animation loops register here; it
// pauses/resumes them so the app never renders what the user can't see —
// saving CPU/GPU/battery and reducing concurrent WebGL contexts.
//
// A "loop" is any object with idempotent pause() and resume() methods. The
// coordinator is the SOLE driver of start/stop: it calls resume() to start a
// loop that should run, pause() to stop one that shouldn't.

class RenderLifecycle {
  constructor() {
    this.covered = false // terminal overlay is covering the main scene
    this.hidden = typeof document !== 'undefined' ? document.hidden : false
    this.entries = new Set()
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => this.setHidden(document.hidden))
    }
  }

  // Register a loop. `pauseWhenCovered` adds the terminal-cover gate (true for
  // the main scene; terminal-owned loops leave it false). Applies the current
  // state immediately. Returns an unregister function.
  register(loop, { pauseWhenCovered = false } = {}) {
    const entry = { loop, pauseWhenCovered, running: false }
    this.entries.add(entry)
    this.#apply(entry)
    return () => this.entries.delete(entry)
  }

  setCovered(value) {
    if (value === this.covered) return
    this.covered = value
    this.#applyAll()
  }

  setHidden(value) {
    if (value === this.hidden) return
    this.hidden = value
    this.#applyAll()
  }

  #shouldRun(entry) {
    return !this.hidden && !(entry.pauseWhenCovered && this.covered)
  }

  #apply(entry) {
    const should = this.#shouldRun(entry)
    if (should && !entry.running) {
      entry.running = true
      entry.loop.resume()
    } else if (!should && entry.running) {
      entry.running = false
      entry.loop.pause()
    }
  }

  #applyAll() {
    for (const entry of this.entries) this.#apply(entry)
  }
}

export const renderLifecycle = new RenderLifecycle()
