import { AnimatedSprite, Container, Graphics } from 'pixi.js'
import { Mech, MAX_HP } from './Mech.js'

// Power charges with each normal volley; the Nth shot (3–4) erupts as the
// ultimate — the Special.png shockwave + 3 big gold orbs.
const ULT_MIN = 6 // fewest shots before an ultimate — a rare, charged skill, not every volley
const ULT_MAX = 10 // most shots before an ultimate
// Free-roam combat: each mech wanders its whole side of the terminal and fires
// at any distance — the gap between them constantly varies (no fixed range).
const FIRE_RANGE = 1200 // fire across the whole terminal (distance is never fixed)
const MIN_GAP = 130 // never crowd closer than this (keeps the 96px sprites apart)
const MOVE_SPEED = 44 // px/s ground roam speed — slow, smooth wander
const EDGE = 56 // keep the 96px-wide sprite fully on-screen at the edges
// Dodge as a real leap: the mech springs up so the orb sails underneath, using
// the Fly_up (rising) / Fly_down (falling) sheets. Apex ≈ 90px on the ~210px
// stage clears the orb's ~52px-high flight path with the head still on-screen.
const DODGE_DIST = 95 // orb proximity (px) that arms a leap
const DODGE_CHANCE = 0.45 // chance to leap-dodge an incoming lead orb
const JUMP_V = 300 // initial upward leap velocity (px/s) — apex ≈ 100px, gentle arc
const GRAVITY = 450 // px/s² pulling the leap back (lower → higher, slower, smoother fly)
const LEAP_DRIFT = 26 // px/s sideways drift on rise & fall → a diagonal arc, not a straight pop
const HOVER_MIN = 1.0 // s — hang ~1s at the apex (fire down from up there) before dropping
const HOVER_MAX = 1.3 // s — cap so it never hovers forever if shots keep coming
const LEAP_CD = 1.0 // s grounded recovery after landing before it may leap again
// (forces a hittable ground window between leaps — without it a mech chains
// leaps into near-permanent dodge immunity and fights never resolve)
const RESPAWN_DELAY = 1.4 // s a fallen fighter lies dying before its replacement blinks in
const BLINK_DUR = 0.7 // s the incoming fighter flashes (Hurt blink) as it materialises
const STANDOFF_DUR = 1.0 // s both fighters stand still after the blink, before resuming
const HP_SEG_W = 9 // one health pip: width
const HP_SEG_H = 5 // one health pip: height
const HP_SEG_STEP = 12 // pip width + gap, pip-to-pip
const HP_BAR_W = (MAX_HP - 1) * HP_SEG_STEP + HP_SEG_W // full bar width (for centering on the mech)
const HP_BAR_RISE = 100 // logical px above the ground line — sits right above the ~96px sprite's head (hugs it)

// On a narrow (mobile) terminal two 96px mechs crowd the stage. Shrink the WHOLE
// battle with one scale on the layer, so every spatial constant (gaps, hit boxes,
// leap heights, orb torso height) stays in logical units and the mechs simply
// roam a wider logical world — no per-constant rescaling, no drift.
const FULL_WIDTH = 600 // at/above this stage width the mechs render full size
const MIN_WIDTH = 340 // at/below this, they render at MIN_SCALE
const MIN_SCALE = 0.62 // smallest the fighters shrink to on the narrowest phones
function responsiveScale(w) {
  if (w >= FULL_WIDTH) return 1
  if (w <= MIN_WIDTH) return MIN_SCALE
  return MIN_SCALE + ((w - MIN_WIDTH) / (FULL_WIDTH - MIN_WIDTH)) * (1 - MIN_SCALE)
}

/**
 * Runs the AI fight: two mechs roam freely around the terminal and fire orb
 * volleys (1–3 orbs in the mech's own colour) on the move; a lead orb can be
 * dodged with a real leap (Fly_up/Fly_down) so it sails underneath. Power charges
 * over successive shots and then bursts into an ultimate — the Special.png
 * shockwave plus 3 big, undodgeable 2× gold orbs (the mech keeps its attack
 * pose). King-of-the-hill: when one dies, the SURVIVOR
 * stays on its side and the loser is replaced by the absent third fighter (the
 * just-defeated one sits out a round), so every swap is a real death and the
 * loser never instantly re-enters. A simultaneous double-K.O. (both fall in one
 * frame) has no survivor to crown, so it resets to a fresh random pairing rather
 * than carrying a defeated fighter forward. `update(dt)` is driven by the ticker.
 * Mech art is provided by `variants`.
 */
export class Director {
  constructor(app, variants, specialFrames = null) {
    this.app = app
    this.variants = variants
    this.specialFrames = specialFrames // shared Special.png frames for the ultimate burst
    this.layer = app.stage.addChild(new Container())
    // Shrink the whole battle on narrow stages; mechs roam a wider logical world.
    this.scale = responsiveScale(app.screen.width)
    this.layer.scale.set(this.scale)
    this.projectiles = []
    this.rings = []
    this.fx = [] // active one-shot effect sprites (the ultimate shockwave)
    this.bars = [new Graphics(), new Graphics()].map((g) => this.layer.addChild(g))
    this.respawnT = [0, 0] // per-side countdown while a fallen fighter lies dying
    this.respawning = [false, false] // is side i currently a dying fighter awaiting replacement?
    this.mechs = null
    this.startRound()
  }

  // The battle's logical bounds: the stage is rendered at `this.scale`, so the
  // mechs move/aim in a world that is correspondingly larger than the canvas.
  worldW() {
    return this.app.screen.width / this.scale
  }

  worldH() {
    return this.app.screen.height / this.scale
  }

  pickUlt() {
    return ULT_MIN + Math.floor(Math.random() * (ULT_MAX - ULT_MIN + 1))
  }

  // a variant index that differs from both currently-fielded variants, so the
  // newcomer is always distinct from the survivor (clean king-of-the-hill rotation).
  pickVariant(avoidA, avoidB = -1) {
    const n = this.variants.length
    const pool = []
    for (let x = 0; x < n; x++) if (x !== avoidA && x !== avoidB) pool.push(x)
    if (!pool.length) for (let x = 0; x < n; x++) if (x !== avoidA) pool.push(x)
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : avoidA
  }

  // First round only: two distinct fighters at opposite edges. Later rounds never
  // reset the whole scene — when one falls, spawnChallenger() replaces just that
  // side live, so the survivor and the animation never pause.
  startRound() {
    this.clearMechs()
    const a = Math.floor(Math.random() * this.variants.length)
    const b = this.pickVariant(a)
    const W = this.worldW()
    const H = this.worldH()
    this.left = new Mech(this.variants[a], 1)
    this.right = new Mech(this.variants[b], -1)
    // spawn near opposite edges so the fight opens spread across the whole
    // terminal (long-range shots), then they wander inward from there.
    this.left.root.position.set(EDGE + 20, H - 4)
    this.right.root.position.set(W - EDGE - 20, H - 4)
    for (const m of [this.left, this.right]) {
      m.baseY = m.root.y
      m.hopY = 0
      m.vy = 0
      m.hovering = false
      m.hoveredYet = false
      m.leapCd = 0
      m.blinkT = 0
    }
    this.layer.addChild(this.left.root, this.right.root)
    for (const bar of this.bars) this.layer.addChild(bar) // keep HP pips above the mechs
    this.mechs = [this.left, this.right]
    this.variantIdx = [a, b] // which variant is on each side
    this.cool = [1, 1] // both move a beat before the first shot
    this.roamT = [0, 0] // pause-at-stop timer before re-picking a wander target
    this.charge = [0, 0] // first volleys are normal; power builds to the first ultimate
    this.ultAt = [this.pickUlt(), this.pickUlt()]
    this.roamTarget = [this.left.root.x, this.right.root.x] // start each wander from where it stands
    this.respawnT = [0, 0]
    this.respawning = [false, false]
    this.ceasefire = 0
  }

  // Live-replace the fallen fighter on side i: the survivor fights on uninterrupted
  // while a fresh, distinct challenger blinks in (Hurt flash) at the edge and joins.
  spawnChallenger(i) {
    const newV = this.pickVariant(this.variantIdx[i], this.variantIdx[1 - i])
    const W = this.worldW()
    const H = this.worldH()
    const facing = i === 0 ? 1 : -1
    const m = new Mech(this.variants[newV], facing)
    const x = i === 0 ? EDGE + 20 : W - EDGE - 20
    m.root.position.set(x, H - 4)
    m.baseY = m.root.y
    m.hopY = 0
    m.vy = 0
    m.hovering = false
    m.hoveredYet = false
    m.leapCd = 0
    if (this.mechs[i]) this.mechs[i].root.destroy({ children: true }) // remove the faded corpse
    this.layer.addChild(m.root)
    for (const bar of this.bars) this.layer.addChild(bar) // keep HP pips above the mechs
    this.mechs[i] = m
    if (i === 0) this.left = m
    else this.right = m
    this.variantIdx[i] = newV
    // both fighters move for a beat AFTER the standstill ends before firing again
    this.cool[i] = this.cool[1 - i] = BLINK_DUR + STANDOFF_DUR + 0.8
    this.charge[i] = 0
    this.ultAt[i] = this.pickUlt()
    this.roamT[i] = 0
    this.roamTarget[i] = x
    this.respawnT[i] = 0
    this.respawning[i] = false
    this.ceasefire = BLINK_DUR + STANDOFF_DUR // no firing through the blink + the standstill
    m.enterFlash(BLINK_DUR) // recoil + blink-in (alpha handled in update)
  }

  clearMechs() {
    // destroy the containers + their AnimatedSprites, but keep the shared
    // textures alive — they're loaded once and reused every round
    if (this.mechs) for (const m of this.mechs) m.root.destroy({ children: true })
    for (const p of this.projectiles) p.g.destroy()
    for (const r of this.rings) r.g.destroy()
    for (const s of this.fx) s.destroy()
    this.projectiles = []
    this.rings = []
    this.fx = []
  }

  // The ultimate's signature — a layered shockwave for real impact: a bright
  // white flash, two accent-coloured rings rippling out, and the textured
  // Special.png burst doubled (big + small) over the shooter.
  playSpecialFx(m) {
    const x = m.root.x
    const y = m.root.y - 48 // centred on the mech's torso
    this.ring(x, y, 0xffffff, { r: 16, grow: 540, width: 9, fade: 2.6 }) // hot white flash
    this.ring(x, y, m.accent, { r: 12, grow: 340, width: 6, fade: 1.7 }) // accent shockwave
    this.ring(x, y, m.accent, { r: 8, grow: 200, width: 3, fade: 1.3 }) // inner pulse
    this.spawnFxRing(x, y, 2.0, 0.26) // big textured burst
    this.spawnFxRing(x, y, 1.15, 0.34) // tighter second burst for depth
  }

  // One play-through of the Special.png shockwave sprite, auto-removed on finish.
  spawnFxRing(x, y, scale, speed) {
    if (!this.specialFrames) return
    const s = new AnimatedSprite(this.specialFrames)
    s.anchor.set(0.5)
    s.position.set(x, y)
    s.scale.set(scale)
    s.animationSpeed = speed
    s.loop = false
    s.onComplete = () => {
      s.destroy()
      this.fx = this.fx.filter((f) => f !== s)
    }
    this.layer.addChild(s)
    s.gotoAndPlay(0)
    this.fx.push(s)
  }

  // Fire on cooldown (shared by the grounded and airborne paths). Power charges
  // with each volley; once charged the mech bursts its ultimate instead.
  tryFire(i) {
    const m = this.mechs[i]
    const foe = this.mechs[1 - i]
    if (foe.dead || this.cool[i] > 0 || this.ceasefire > 0) return // both sides hold fire while a newcomer blinks in
    if (Math.abs(foe.root.x - m.root.x) > FIRE_RANGE) return
    this.charge[i] += 1
    // The ultimate only erupts while grounded (a deliberate ground move); if the
    // mech is airborne, the charge is HELD and it fires a normal volley instead.
    const grounded = m.hopY === 0 && !m.hovering
    const special = grounded && this.charge[i] >= this.ultAt[i]
    if (special) {
      this.charge[i] = 0
      this.ultAt[i] = this.pickUlt()
      m.specialPose() // green plays its own ultimate animation; others use attack
      if (m.sprites.special) {
        // green: hold the orbs + shockwave until the wind-up animation finishes,
        // so the blast lands ON the last frame (they read as one beat).
        m.pendingShot = m.sprites.special.totalFrames / (m.sprites.special.animationSpeed * 60)
      } else {
        this.shoot(m, foe, true)
        this.playSpecialFx(m)
      }
      this.cool[i] = 3.4
    } else {
      m.attack()
      this.shoot(m, foe, false)
      this.cool[i] = 2.6 + Math.random() * 1.4 // 2.6–4.0s between volleys
    }
  }

  // A volley of orbs. Normal shots are 1–3 orbs in the shooter's own colour; the
  // ultimate is a fixed 3 big gold orbs. Only the lead orb (k === 0) deals damage;
  // the rest are visual, so a fuller volley never multiplies HP loss. Fired from
  // the air, the orbs angle downward toward the grounded foe.
  shoot(from, to, special = false) {
    const dir = Math.sign(to.root.x - from.root.x) || from.facing
    const count = special ? 3 : 1 + Math.floor(Math.random() * 3) // ultimate: 3; normal: 1–3
    const core = special ? 8 : 7 // orb body radius — ultimate just a touch bigger than normal
    const body = from.accent // normal orbs take the shooter's colour (ultimate is gold, drawn below)
    const halo = from.accent
    const speed = special ? 320 : 260 // slower orbs — easier to read, calmer pace
    const gap = special ? core * 2 + 15 : core * 2 + 25 // ultimate: close so the per-orb backgrounds merge; normal: spread
    // angle the orbs down so a shot from the air descends to the foe's body level
    // by the time it reaches them (purely visual — hit detection stays horizontal).
    const launchY = from.root.y - 52 // raised when the shooter is mid-air
    const targetY = to.baseY - 52 // aim at the foe's GROUND torso, not its hop position
    const horiz = Math.max(80, Math.abs(to.root.x - from.root.x))
    const fallVy = ((targetY - launchY) / horiz) * speed // 0 from the ground; downward from the air, never up
    for (let k = 0; k < count; k++) {
      const g = this.layer.addChild(new Graphics())
      if (special) {
        // each orb carries its OWN amber background; placed close, adjacent ones
        // overlap so the three read as one connected blast behind the bright cores
        g.circle(0, 0, core + 11).fill({ color: 0x6b5512, alpha: 0.5 }) // connecting background
        g.circle(0, 0, core + 3).fill({ color: 0xffc23a, alpha: 0.5 }) // amber glow
        g.circle(0, 0, core).fill(0xffd84d) // gold body
        g.circle(0, 0, core * 0.42).fill(0xfff2c0) // bright core
      } else {
        g.circle(0, 0, core + 4).fill({ color: halo, alpha: 0.3 }) // glow halo
        g.circle(0, 0, core).fill(body) // orb body
        g.circle(0, 0, core * 0.45).fill(0xffffff) // hot core
      }
      g.position.set(from.root.x + from.facing * 44 - k * dir * gap, launchY) // tight for the ultimate, spread for normal
      this.projectiles.push({
        g,
        vx: dir * speed, // faster orbs so long-range shots don't crawl
        vy: fallVy, // 0 from the ground; downward when fired mid-air
        target: to,
        dmg: k === 0 ? (special ? 2 : 1) : 0, // lead orb damages; trailing orbs are cosmetic
        special,
      })
    }
  }

  // An expanding, fading ring. Defaults = small hit spark; pass a bigger `r` +
  // thicker `width` for the special's aura around a shooter.
  ring(x, y, color, { r = 4, grow = 120, width = 2, fade = 1.6 } = {}) {
    const g = this.layer.addChild(new Graphics())
    g.position.set(x, y)
    this.rings.push({ g, r, grow, width, fade, color, alpha: 0.95 })
  }

  // HP pips ride just above each mech's head — pinned to it as it walks AND as it
  // leaps (uses root.y, so the bar rises with the mech instead of staying at the ground).
  drawBars() {
    this.bars.forEach((bar, i) => {
      const m = this.mechs[i]
      const x0 = Math.round(m.root.x - HP_BAR_W / 2)
      const y0 = Math.round(m.root.y - HP_BAR_RISE) // root.y tracks the dodge hop → bar follows the head up
      bar.clear()
      for (let p = 0; p < MAX_HP; p++) {
        bar.rect(x0 + p * HP_SEG_STEP, y0, HP_SEG_W, HP_SEG_H).fill(p < m.hp ? m.accent : 0x222a38)
      }
    })
  }

  // Hold a static facing-off pose with HP bars drawn — for reduced motion.
  freeze() {
    if (!this.mechs) return
    for (const m of this.mechs) m.freeze()
  }

  update(dt) {
    // expanding / fading hit rings
    for (const r of this.rings) {
      r.r += r.grow * dt
      r.alpha -= dt * r.fade
      r.g.clear().circle(0, 0, r.r).stroke({ width: r.width, color: r.color, alpha: Math.max(0, r.alpha) })
    }
    this.rings = this.rings.filter((r) => {
      if (r.alpha <= 0) {
        r.g.destroy()
        return false
      }
      return true
    })

    if (this.ceasefire > 0) this.ceasefire -= dt // brief hold-fire after a new fighter blinks in

    const W = this.worldW()
    this.mechs.forEach((m, i) => {
      const foe = this.mechs[1 - i]
      // --- fallen fighter: play its death + fade, then blink in a challenger.
      // The SURVIVOR keeps fighting throughout — the scene never freezes.
      if (m.dead) {
        m.update(dt)
        if (!this.respawning[i]) {
          // the instant it falls: K.O. burst, then schedule its replacement
          this.respawning[i] = true
          this.respawnT[i] = RESPAWN_DELAY
          this.ring(m.root.x, m.root.y - 48, 0xffffff, { r: 12, grow: 260, width: 5, fade: 1.5 })
          this.ring(m.root.x, m.root.y - 48, m.accent, { r: 8, grow: 200, width: 3, fade: 1.2 })
        } else {
          this.respawnT[i] -= dt
          if (this.respawnT[i] <= 0) this.spawnChallenger(i)
        }
        return
      }
      this.cool[i] -= dt
      m.leapCd -= dt
      if (m.pendingShot > 0) {
        // an ultimate's wind-up animation is playing — release the orbs + shockwave
        // the instant it finishes (so the blast lands on the final frame).
        m.pendingShot -= dt
        if (m.pendingShot <= 0) {
          m.pendingShot = 0
          const f = this.mechs[1 - i]
          if (!f.dead) {
            this.shoot(m, f, true)
            this.playSpecialFx(m)
          }
        }
      }
      const live = dt > 0 // skip combat on the dt=0 reduced-motion layout frame

      // blink-in flash for a freshly-spawned challenger (materialising)
      if (m.blinkT > 0) {
        m.blinkT -= dt
        m.root.alpha = Math.floor(m.blinkT * 16) % 2 === 0 ? 1 : 0.3
        if (m.blinkT <= 0) m.root.alpha = 1
      }

      // --- airborne: leap up, HANG at the apex while the foe's volley passes
      // underneath, then drop. Mid-air the mech can still fire back, and those
      // orbs angle downward toward the grounded foe (handled in shoot()).
      if (m.hopY > 0 || m.vy > 0 || m.hovering) {
        if (m.hovering) {
          m.hoverT += dt
          // any of the foe's shots still short of (overhead) this mech?
          const incoming = this.projectiles.some(
            (p) => !p.dead && p.target === m && (p.vx > 0 ? p.g.x < m.root.x + 24 : p.g.x > m.root.x - 24),
          )
          if ((m.hoverT >= HOVER_MIN && !incoming) || m.hoverT >= HOVER_MAX) m.hovering = false // volley cleared → drop
        } else {
          m.vy -= GRAVITY * dt
          m.hopY += m.vy * dt
          if (m.vy <= 0 && !m.hoveredYet && m.hopY > 0) {
            m.hovering = true // reached the apex → hang there
            m.hoveredYet = true
            m.vy = 0
            m.hoverT = 0
            this.cool[i] = Math.min(this.cool[i], 0.2) // fire a shot from up high during the hang
          }
          // rise & fall also drift sideways → a diagonal arc (clamped on-screen)
          m.root.x = Math.max(EDGE, Math.min(W - EDGE, m.root.x + m.vx * dt))
        }
        if (m.hopY <= 0) {
          m.hopY = 0 // landed → reset the leap
          m.vy = 0
          m.vx = 0
          m.hovering = false
          m.hoveredYet = false
          m.leapCd = LEAP_CD // recover on the ground before the next leap
        }
        m.root.y = m.baseY - m.hopY
        if (m.hopY > 0) m.setIntent(m.hovering || m.vy >= 0 ? 'fly_up' : 'fly_down') // (skip on the grounded landing frame)
        if (live) this.tryFire(i) // fire back mid-air; the shot angles down
        m.update(dt)
        return
      }
      m.root.y = m.baseY

      // Stand still on entry: the newcomer holds in place while it blinks in, then
      // BOTH fighters hold through the standoff window — roaming/firing resume only
      // after (firing is also gated by the ceasefire in tryFire).
      if (m.blinkT > 0 || (this.ceasefire > 0 && this.ceasefire <= STANDOFF_DUR)) {
        m.setIntent('idle')
        m.update(dt)
        return
      }

      // --- free ground movement: each mech wanders its OWN half of the terminal,
      // trekking all the way to a chosen spot before picking the next, so it roams
      // the full width and the firing distance keeps changing (never fixed). The
      // halves split at centre (± MIN_GAP/2) so the two never cross or overlap.
      const mid = W * 0.5
      const lo = i === 0 ? EDGE : mid + MIN_GAP * 0.5
      const hi = i === 0 ? mid - MIN_GAP * 0.5 : W - EDGE
      const arrived = Math.abs(this.roamTarget[i] - m.root.x) < 2
      if (arrived) this.roamT[i] -= dt
      if (arrived && this.roamT[i] <= 0) {
        // wander to a RANDOM spot anywhere in this half, chosen independently per
        // mech — so the two don't advance/retreat in lockstep and neither just
        // beelines for the centre. A more natural, unpredictable fight.
        this.roamTarget[i] = lo + Math.random() * Math.max(1, hi - lo)
        this.roamT[i] = 0.3 + Math.random() * 0.9 // pause a beat at each stop
      }
      const step = MOVE_SPEED * dt
      const tgt = this.roamTarget[i]
      let nx = Math.abs(tgt - m.root.x) <= step ? tgt : m.root.x + Math.sign(tgt - m.root.x) * step
      nx = Math.max(EDGE, Math.min(W - EDGE, nx)) // stay on-screen
      nx = i === 0 ? Math.min(nx, foe.root.x - MIN_GAP) : Math.max(nx, foe.root.x + MIN_GAP) // never cross the foe
      const moving = Math.abs(nx - m.root.x) > 0.05
      m.root.x = nx
      m.setIntent(moving ? 'walk' : 'idle') // attack one-shot plays over this

      if (live && m.blinkT <= 0) this.tryFire(i) // fire while roaming, but not mid-blink-in
      m.update(dt)
    })

    for (const p of this.projectiles) {
      p.g.x += p.vx * dt
      p.g.y += (p.vy || 0) * dt // descends when fired from the air
      const t = p.target
      if (t.dead) {
        p.dead = true // stop tracking shots aimed at a downed foe
        continue
      }
      // a lead orb arms ONE leap attempt as it nears (specials don't trigger a
      // leap), but only from the ground and once the leap-recovery has elapsed.
      if (p.dmg > 0 && !p.special && !p.checked && Math.abs(p.g.x - t.root.x) < DODGE_DIST) {
        p.checked = true
        if (t.hopY === 0 && t.vy <= 0 && t.leapCd <= 0 && t.pendingShot <= 0 && Math.random() < DODGE_CHANCE) {
          t.vy = JUMP_V // spring up — the raised body lets this volley pass underneath
          t.vx = -t.facing * LEAP_DRIFT // lean AWAY from the foe → a diagonal leap
        }
      }
      // PHYSICAL hit: the orb must overlap the body in BOTH x and y. A leaping
      // mech's body is up high, so a low shot passes cleanly underneath (a real
      // dodge); but a shot never phases through a GROUNDED body without landing —
      // it connects wherever it actually meets the body. Hit y-range tracks the
      // mech's live position, so descending air-shots land on a grounded foe too.
      const bodyTop = t.root.y - 86
      const bodyBot = t.root.y - 4
      if (Math.abs(p.g.x - t.root.x) < 24 && p.g.y > bodyTop && p.g.y < bodyBot) {
        if (p.dmg > 0) {
          t.hit(p.dmg)
          this.ring(t.root.x, p.g.y, p.special ? 0xffffff : t.accent)
        }
        p.dead = true // a connecting shot splashes on the target
      } else if (
        p.g.x < -20 ||
        p.g.x > this.worldW() + 20 ||
        p.g.y > this.worldH() + 30 ||
        p.g.y < -40
      ) {
        p.dead = true // shots that pass over/under fly on, then despawn off the edge
      }
    }
    this.projectiles = this.projectiles.filter((p) => {
      if (p.dead) {
        p.g.destroy()
        return false
      }
      return true
    })

    this.drawBars()
    // NB: K.O. handling now lives per-side in the forEach above (respawning/
    // respawnT + spawnChallenger) — there is no global round reset/pause anymore.
  }
}
