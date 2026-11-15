// GLSL for the scene. Written in the GLSL1 dialect that three's ShaderMaterial
// translates for WebGL2, so `position`, `projectionMatrix`, `viewMatrix` and
// friends are already declared.

/**
 * One set of dots plays every role. On the globe a dot is a piece of land; on
 * the ground it is a cell of a field map. `uMorph` blends between the two, each
 * dot leaving a little earlier or later than its neighbours.
 */
export const dotsVertex = /* glsl */ `
attribute vec2 aGround;   // x in [-0.5, 0.5], z in [0, 1)
attribute vec4 aRand;
attribute float aKind;

uniform mat4 uGlobe;
uniform mat4 uGround;
uniform vec2 uGroundSize; // width, depth
uniform vec3 uCam;
uniform float uMorph;
uniform float uDetail;
uniform float uFade;
uniform float uTime;
uniform float uFly;
uniform float uPx;
uniform float uTwinkle;
uniform float uAspect;
uniform vec2 uMouse;      // cursor, in clip space
uniform float uMouseOn;
uniform vec3 uRipple;     // x, y in clip space; z = seconds since it started
uniform vec3 uTint;
uniform float uTintAmount;

varying vec3 vColor;
varying float vAlpha;

const vec3 LAND   = vec3(0.80, 0.86, 0.98);
const vec3 COAST  = vec3(0.60, 0.69, 0.88);
const vec3 AMBER  = vec3(1.00, 0.70, 0.00);

const vec3 WHEAT  = vec3(1.00, 0.74, 0.14);
const vec3 GREEN  = vec3(0.44, 0.90, 0.42);
const vec3 OLIVE  = vec3(0.78, 0.84, 0.28);
const vec3 SOIL   = vec3(0.86, 0.52, 0.34);
const vec3 PALE   = vec3(0.84, 0.92, 0.86);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) { return noise(p) * 0.6 + noise(p * 2.1 + 7.3) * 0.28 + noise(p * 4.3 + 1.7) * 0.12; }

void main() {
  // Only the side of the morph that is on screen is computed: in orbit the
  // ground is skipped, on the ground the globe is. That halves the work per
  // dot in every resting state, which matters on phones.
  bool needGlobe = uMorph < 0.999;
  bool needGround = uMorph > 0.001;

  // ── globe ────────────────────────────────────────────────────────────────
  vec4 gw = vec4(0.0);
  vec3 gCol = LAND;
  float gA = 0.0;
  float gSize = 2.6;
  if (needGlobe) {
    gw = uGlobe * vec4(position, 1.0);
    vec3 gn = normalize(mat3(uGlobe) * position);
    float facing = dot(gn, normalize(uCam - gw.xyz));
    float gVisible = smoothstep(-0.04, 0.28, facing);   // the far side fades out

    if (aKind < 0.5) {               // world-wide dot
      gA = 0.95;
    } else if (aKind < 1.5) {        // dense European dot
      gCol = COAST; gA = 0.9 * uDetail; gSize = 2.7;
    } else if (aKind < 2.5) {        // Italy
      gCol = AMBER; gA = mix(0.6, 1.0, uDetail); gSize = mix(1.9, 3.5, uDetail);
    } else if (aKind < 3.5) {        // world-wide dot inside the dense box
      gA = 0.95 * (1.0 - uDetail);
    }
    float twinkle = 0.72 + 0.28 * sin(uTime * (0.5 + aRand.y * 1.5) + aRand.x * 6.2832);
    gA *= gVisible * mix(1.0, twinkle, uTwinkle);
  }

  // ── ground ───────────────────────────────────────────────────────────────
  // Dots wrap around in depth; the content they show travels with them, so
  // the fields scroll past instead of popping.
  float zl = fract(aGround.y + uFly / uGroundSize.y);
  vec4 tw = gw;
  vec3 tCol = gCol;
  float tA = 0.0;
  if (needGround) {
    vec2 c = vec2(aGround.x * uGroundSize.x, zl * uGroundSize.y - uFly);
    float height = (fbm(c * 0.21) - 0.5) * 1.7;
    tw = uGround * vec4(c.x, height, (zl - 0.5) * uGroundSize.y, 1.0);

    // Field parcels: a warped brick pattern, each brick one crop.
    vec2 w = c + 0.55 * vec2(noise(c * 0.4 + 3.1), noise(c * 0.4 + 9.7));
    vec2 cell = vec2(1.3, 0.82);
    vec2 pc = w / cell;
    pc.x += hash(vec2(floor(pc.y), 3.7));
    vec2 id = floor(pc);
    vec2 f = fract(pc);
    float edge = min(min(f.x, 1.0 - f.x) * cell.x, min(f.y, 1.0 - f.y) * cell.y);
    float inside = smoothstep(0.03, 0.12, edge);
    float crop = hash(id + 0.5);
    tCol = crop < 0.30 ? WHEAT : crop < 0.52 ? GREEN : crop < 0.70 ? OLIVE : crop < 0.84 ? SOIL : PALE;
    // The project on screen lends the fields its colour, some more than others.
    tCol = mix(tCol, uTint, uTintAmount * (0.3 + 0.6 * hash(id + 3.0)));
    tA = mix(0.07, 1.0, inside) * (0.62 + 0.38 * hash(id + 11.0));
    // A sensor pass sweeps over the fields every few seconds.
    float scan = smoothstep(0.05, 0.0, abs(zl - fract(uTime * 0.055))) * uTwinkle;
    tCol = mix(tCol, vec3(1.0), scan * 0.7);
    tA = min(1.0, tA + scan * 0.6);
    // Fade out at the edges; the far one fades slowly so the horizon view dissolves into the sky.
    tA *= smoothstep(0.0, 0.2, zl) * smoothstep(1.0, 0.93, zl) * smoothstep(0.5, 0.45, abs(aGround.x));
  } else {
    tw = gw;
  }
  if (!needGlobe) gw = tw;

  // ── morph ────────────────────────────────────────────────────────────────
  // The ground assembles as a wave, from the near edge to the far one, with
  // a little randomness so the front is not a hard line.
  const float spread = 0.7;
  float order = (1.0 - zl) * 0.75 + aRand.x * 0.25;
  float t = clamp(uMorph * (1.0 + spread) - order * spread, 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  float flight = sin(t * 3.14159);
  vec3 p = mix(gw.xyz, tw.xyz, t);
  p += vec3((aRand.y - 0.5) * 1.4, 0.5 + aRand.z * 0.7, (aRand.w - 0.5) * 1.2) * flight;

  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float tSize = min(3.1 * (9.5 / max(-mv.z, 1.0)), 8.0);
  float size = mix(gSize, tSize, t);
  vColor = mix(gCol, tCol, t);
  vAlpha = mix(gA, tA, t) * uFade * (1.0 - 0.55 * flight);

  // ── the mouse ────────────────────────────────────────────────────────────
  // The dots nearest the cursor glow a touch brighter. They do not move.
  vec2 screen = gl_Position.xy / gl_Position.w;
  float glow = smoothstep(0.2, 0.0, length((screen - uMouse) * vec2(uAspect, 1.0))) * uMouseOn;
  // A ring spreading out from a click, or from a project coming into focus.
  float reach = length((screen - uRipple.xy) * vec2(uAspect, 1.0));
  float ring = smoothstep(0.11, 0.0, abs(reach - uRipple.z * 1.5)) * exp(-uRipple.z * 1.4);

  gl_PointSize = uPx * size * (1.0 + glow * 0.1 + ring * 1.5);
  vColor = mix(vColor, vec3(1.0), ring * 0.45);
  vAlpha = min(1.0, vAlpha * (1.0 + glow * 0.3 + ring * 1.6));
}
`;

export const dotsFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.18, d);
  if (a * vAlpha < 0.004) discard;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

/** Shared by the planet's body and its atmosphere. */
export const sphereVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vView = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

/** A near-black sphere with a lit limb: gives the dots something to sit on. */
export const bodyFragment = /* glsl */ `
uniform vec3 uBody;
uniform vec3 uRim;
uniform float uOpacity;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  float fresnel = 1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0);
  vec3 col = uBody + uRim * pow(fresnel, 3.0) * 0.5;
  gl_FragColor = vec4(col, uOpacity);
}
`;

/** Drawn on the inside of a slightly larger sphere: a halo hugging the limb. */
export const atmosphereFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  float k = clamp(-dot(normalize(vNormal), normalize(vView)) / 0.5, 0.0, 1.0);
  gl_FragColor = vec4(uColor, pow(k, 3.2) * uOpacity);
}
`;

export const starsVertex = /* glsl */ `
attribute vec3 aRand;
uniform float uTime;
uniform float uPx;
uniform float uTwinkle;
uniform float uOpacity;
varying float vAlpha;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  float twinkle = 0.6 + 0.4 * sin(uTime * (0.3 + aRand.y) + aRand.z * 6.2832);
  vAlpha = (0.4 + 0.6 * aRand.x) * mix(1.0, twinkle, uTwinkle) * uOpacity;
  gl_PointSize = uPx * (1.1 + aRand.x * 1.6);
}
`;

export const starsFragment = /* glsl */ `
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  gl_FragColor = vec4(0.82, 0.88, 1.0, smoothstep(0.5, 0.1, d) * vAlpha);
}
`;
