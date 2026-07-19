// Sprite-sheet manifest for the mech variants (user-provided art in public/mech/).
// Each state is a horizontal strip of square frames; the frame size is derived
// from the sheet height at load time (see MechBattle.loadStrip), so a variant
// whose frames are a different size just works. `accent` colours that mech's HP
// pips, projectiles' impact ring, and its special-burst aura.
//
// The ultimate adds a director-side shockwave (Special.png) + big orbs. A variant
// MAY also supply its own `special` body sheet (e.g. Green's Special_green.png) to
// animate the mech during its ultimate; variants without it keep the attack pose.
const sheets = (suffix, overrides = {}) => ({
  idle: `/mech/Idle${suffix}.png`,
  walk: `/mech/Walk${suffix}.png`,
  attack: `/mech/Attack${suffix}.png`,
  hurt: `/mech/Hurt${suffix}.png`,
  death: `/mech/Death${suffix}.png`,
  fly_up: `/mech/Fly_up${suffix}.png`, // rising frames of a dodge leap
  fly_down: `/mech/Fly_down${suffix}.png`, // falling frames of a dodge leap
  ...overrides,
})

// accent MUST match the sprite-body colour of each sheet set, or the mech fires
// orbs / shows an HP bar in the "wrong" colour.
// The blue/green idle sheets are named opposite to the rest of their animation
// sets, so map them explicitly instead of changing any fight logic.
export const VARIANTS = [
  { accent: 0x6fb7ff, sheets: sheets('', { idle: '/mech/Idle2.png' }) }, // blue body
  { accent: 0x8fe39a, sheets: sheets('2', { idle: '/mech/Idle.png', special: '/mech/Special_green.png' }) }, // green body (+ its own ultimate animation)
  { accent: 0xff7da0, sheets: sheets('3') }, // Idle3.png → PINK accent (magenta body)
]
