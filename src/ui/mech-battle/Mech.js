import { AnimatedSprite, Container } from 'pixi.js'

export const MAX_HP = 6
const SCALE = 1.0 // display-size knob for the whole mech (1 = native sprite size)
const ONE_SHOT = new Set(['attack', 'hurt', 'special']) // play once, then revert to base

/**
 * A mech rendered from user-provided sprite sheets. Builds one `AnimatedSprite`
 * per state and shows the current one. The director drives behaviour via a tiny
 * animation state machine: `setIntent('idle'|'walk')` sets the looping base
 * state, while `attack()`/`hit()` play one-shot anims to completion (so the
 * director's per-frame intent never cuts them off).
 */
export class Mech {
  constructor(variant, facing /* 1 = faces right (art default), -1 = mirrored */) {
    this.accent = variant.accent
    this.facing = facing
    this.hp = MAX_HP
    this.dead = false
    this.base = 'idle'
    this.oneShot = null
    // leap (dodge) physics — driven by the director; baseY is the ground line,
    // hopY the current height above it, vy the vertical velocity. While `hovering`
    // the mech hangs at the apex letting the foe's volley pass underneath.
    this.baseY = 0
    this.hopY = 0
    this.vy = 0
    this.vx = 0 // sideways drift during a leap → a diagonal arc, not a straight pop
    this.hovering = false
    this.hoveredYet = false // this leap already hovered (don't re-hover on the way down)
    this.hoverT = 0 // elapsed hover time
    this.leapCd = 0 // grounded-recovery timer; can only leap again when it hits 0
    this.blinkT = 0 // spawn-in flash timer (director blinks the alpha while > 0)
    this.pendingShot = 0 // >0 while an ultimate's wind-up plays before its orbs fire

    this.root = new Container()
    this.sprites = {}
    for (const [key, textures] of Object.entries(variant.frames)) {
      const sprite = new AnimatedSprite(textures)
      sprite.anchor.set(0.5, 1) // feet at the origin (the ground line)
      sprite.animationSpeed = key === 'special' ? 0.34 : 0.16 // ultimate wind-up plays quickly
      sprite.visible = false
      this.root.addChild(sprite)
      this.sprites[key] = sprite
    }
    this.cur = null
    this.root.scale.set(facing * SCALE, SCALE) // mirror to face the opponent
    this.show('idle')
  }

  show(key) {
    const next = this.sprites[key] || this.sprites.idle
    if (this.cur === next) return
    if (this.cur) {
      this.cur.visible = false
      this.cur.stop() // detach from Ticker.shared so only the visible sprite ticks
    }
    this.cur = next
    next.visible = true
    next.loop = !ONE_SHOT.has(key) && key !== 'death'
    next.gotoAndPlay(0)
  }

  setIntent(base) {
    if (this.dead) return
    this.base = base
    if (!this.oneShot) this.show(base)
  }

  attack() {
    if (!this.dead) {
      this.oneShot = 'attack'
      this.show('attack')
    }
  }

  // The ultimate pose: play this variant's own special body animation if it has
  // one (e.g. Green's Special_green sheet); otherwise fall back to the attack pose.
  specialPose() {
    if (this.dead) return
    this.oneShot = this.sprites.special ? 'special' : 'attack'
    this.show(this.oneShot)
  }

  // Materialise as a fresh fighter: a Hurt recoil pose; the director adds the
  // alpha blink for `dur` seconds so it visibly flashes into the arena.
  enterFlash(dur) {
    this.blinkT = dur
    this.oneShot = 'hurt'
    this.show('hurt')
  }

  hit(dmg) {
    if (this.dead) return
    this.hp = Math.max(0, this.hp - dmg)
    if (this.hp === 0) {
      this.dead = true
      this.oneShot = null
      this.show('death')
    } else {
      this.oneShot = 'hurt'
      this.show('hurt')
    }
  }

  // Stop every sprite on its current frame and detach from the shared ticker —
  // a truly static pose for prefers-reduced-motion (AnimatedSprite auto-advances
  // on Ticker.shared otherwise, independent of the director loop).
  freeze() {
    for (const s of Object.values(this.sprites)) {
      s.autoUpdate = false
      s.gotoAndStop(0)
    }
  }

  update(dt) {
    // NB: no colour tint on hit. The sprite bodies are dark and don't match their
    // accents, so any tint recoloured a mech into looking like another fighter.
    // Hit feedback is the hurt recoil + impact ring + HP drop instead.
    // a finished one-shot reverts to the current base intent
    if (this.oneShot && this.cur && !this.cur.playing) {
      this.oneShot = null
      this.show(this.base)
    }
    // after the death animation settles, fade out before the challenger replaces it
    if (this.dead && this.cur && !this.cur.playing) {
      this.root.alpha = Math.max(0, this.root.alpha - dt * 1.2)
    }
  }
}
