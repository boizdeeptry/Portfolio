export const particlesVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uMorph;   // 0 → 1 progress toward aTarget
uniform float uDriftA;  // free-drift amount of the formation we leave
uniform float uDriftB;  // ...and of the one we arrive at

attribute vec3 aTarget;
attribute float aScale;
attribute float aPhase;

varying float vTwinkle;
varying float vHeat;

void main() {
  // Staggered, eased morph — each particle departs on its own beat.
  float delay = aPhase * 0.25;
  float t = smoothstep(0.0, 1.0, clamp((uMorph - delay) / 0.75, 0.0, 1.0));
  vec3 p = mix(position, aTarget, t);

  // Idle drift, strong in cloud formations and near-still in solid shapes.
  float drift = mix(uDriftA, uDriftB, t);
  float tt = uTime * 0.18 + aPhase * 6.28318;
  p.x += sin(tt * 0.9 + p.y * 0.35) * drift;
  p.y += sin(tt * 0.7 + p.x * 0.25) * drift * 0.8;
  p.z += sin(tt * 0.5 + p.x * 0.2) * drift * 0.5;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  // "Speed heat": particles glow while travelling — brighter the farther they fly.
  float dist = distance(position, aTarget);
  vHeat = sin(t * 3.14159) * min(dist * 0.12, 1.0);
  vTwinkle = 0.55 + 0.45 * sin(uTime * 1.4 + aPhase * 12.566);

  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 + vHeat * 1.3) * (18.0 / -mv.z);
}
`

export const particlesFragment = /* glsl */ `
uniform vec3 uColor;
varying float vTwinkle;
varying float vHeat;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.5, 0.05, d) * (vTwinkle * 0.8 + vHeat * 0.55);
  vec3 col = mix(uColor, vec3(1.0), vHeat * 0.65);
  gl_FragColor = vec4(col, alpha);
}
`
