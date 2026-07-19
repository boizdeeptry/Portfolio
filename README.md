# MVT — Portfolio

Personal portfolio of **Man Van Truong** — Head of Technology. An immersive, scroll-driven WebGL experience: terminal intro with a pixel mech battle, a morphing GPU particle field that spells out the owner's identity section by section, bloom + scroll-velocity chromatic aberration, and a 0→100 preloader.

## Stack

- **Vite** + vanilla JavaScript (ES modules)
- **Three.js** — GPU particle field (custom GLSL), EffectComposer (UnrealBloom, RGBShift)
- **GSAP + ScrollTrigger** — scroll choreography, reveals, morph timing
- **Lenis** — smooth scroll, driven by GSAP's ticker
- **Pixi.js** — decorative pixel mech battle inside the terminal intro

## Run

```bash
npm install
npm run dev       # http://localhost:8150
npm run build     # production bundle → dist/
npm run preview   # serve dist/
```

## Structure

```
src/
├── core/       gsap + ScrollTrigger, Lenis smooth scroll, render lifecycle
├── data/       ALL content — profile.js (sections) & terminal.js (intro copy)
├── three/      Stage (camera journey, post FX), ParticleField (morph formations)
└── ui/         Preloader, TerminalIntro, mech-battle, cursor, reveals, renderers
```

Content lives entirely in `src/data/` — edit copy without touching markup or logic.
