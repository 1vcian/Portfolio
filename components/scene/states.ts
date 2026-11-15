// The scroll choreography. Every <section data-scene="…"> on the page names one
// of these keyframes; the engine blends between them as the section scrolls in.

export type SceneKey = "orbit" | "approach" | "ground" | "survey" | "archive" | "uplink";

export type SceneState = {
  /** Globe centre, in world units at the focus plane. */
  gx: number;
  gy: number;
  /** Globe radius. Blended logarithmically, so the zoom feels constant. */
  gs: number;
  /** Rotation that brings a latitude to the centre of the view (radians). */
  tilt: number;
  /** Earth's axial lean, purely for looks (radians). */
  axial: number;
  /** 0 = the globe spins freely, 1 = locked with Rome facing the camera. */
  lock: number;
  /** Visibility of the dense European dots: resolution goes up as you descend. */
  detail: number;
  /** 0 = globe, 1 = the dots have become a map of fields. */
  morph: number;
  /** Overall dot opacity, lowered where text sits on top. */
  fade: number;
  /** Orbits and satellites. */
  rings: number;
  /** 1 when the globe sits beside the text: darkens the text's half of the screen. */
  side: number;
  /** How the camera looks at the fields: 90° straight down, small angles towards the horizon (radians). */
  pitch: number;
  /** Distance from the camera to the middle of the fields. */
  dist: number;
  /** Raises or lowers the fields on screen. */
  lift: number;
  /** Shown beside the little spacecraft: log10 of the altitude in metres. */
  altLog: number;
};

/** What the spacecraft on the right edge says it is doing. */
export const PHASES: { key: SceneKey; label: string }[] = [
  { key: "orbit", label: "in orbit" },
  { key: "approach", label: "over Italy" },
  { key: "ground", label: "touchdown" },
  { key: "survey", label: "exploring" },
  { key: "archive", label: "paperwork" },
  { key: "uplink", label: "phoning home" },
];

export const ROME = { lon: 12.4964, lat: 41.9028 };

const DEG = Math.PI / 180;
const km = (v: number) => Math.log10(v * 1000);

// Half the visible height at the focus plane (camera 5 units away, 35° fov).
export const HALF_H = 5 * Math.tan(17.5 * DEG);

/** Keyframes depend on the viewport shape: wide screens put the globe beside the text. */
export function buildStates(aspect: number): Record<SceneKey, SceneState> {
  const halfW = HALF_H * aspect;
  const portrait = aspect < 0.9;

  // The fields are seen like an oblique aerial photo until a section says otherwise.
  const view = { pitch: 50 * DEG, dist: 9.1, lift: 0.25 };

  const orbit: SceneState = portrait
    ? { gx: 0.12, gy: -1.12, gs: 1.02, tilt: 0.58, axial: 0.24, lock: 0, detail: 0, morph: 0, fade: 0.95, rings: 1, side: 1, ...view, altLog: km(786) }
    : { gx: halfW * 0.5, gy: -0.04, gs: Math.min(1.38, halfW * 0.52), tilt: 0.58, axial: 0.24, lock: 0, detail: 0, morph: 0, fade: 1, rings: 1, side: 1, ...view, altLog: km(786) };

  const approach: SceneState = portrait
    ? { gx: 0.05, gy: -0.5, gs: 5.2, tilt: ROME.lat * DEG, axial: 0, lock: 1, detail: 1, morph: 0, fade: 0.42, rings: 0, side: 0, ...view, altLog: km(140) }
    : { gx: halfW * 0.4, gy: 0, gs: 9, tilt: ROME.lat * DEG, axial: 0, lock: 1, detail: 1, morph: 0, fade: 0.95, rings: 0, side: 1, ...view, altLog: km(140) };

  // Experience: the dots land and become fields.
  const ground: SceneState = { ...approach, morph: 1, fade: portrait ? 0.55 : 0.85, side: 0, altLog: km(0.12) };
  // Projects: the camera swings overhead and drops closer, like reading a map.
  const survey: SceneState = { ...ground, pitch: 74 * DEG, dist: 7.4, lift: 0, fade: portrait ? 0.42 : 0.62, altLog: km(0.06) };
  // Résumé: it tips back up until the fields run off to the horizon.
  const archive: SceneState = { ...ground, pitch: 22 * DEG, dist: 7.2, lift: -0.75, fade: portrait ? 0.45 : 0.6, altLog: km(0.002) };

  // Contact: lift-off. The planet's limb fills the bottom of the screen.
  const horizon = portrait ? 2.6 : 3.4;
  const uplink: SceneState = {
    gx: 0, gy: -(horizon + (portrait ? 1.25 : 1.0)), gs: horizon, tilt: -0.1, axial: 0, lock: 0,
    detail: 0, morph: 0, fade: 0.9, rings: 0.8, side: 0, ...view, altLog: km(786),
  };

  return { orbit, approach, ground, survey, archive, uplink };
}

export function mixStates(a: SceneState, b: SceneState, t: number, out: SceneState): SceneState {
  for (const k in a) {
    const key = k as keyof SceneState;
    out[key] = key === "gs" ? Math.exp(Math.log(a.gs) + (Math.log(b.gs) - Math.log(a.gs)) * t) : a[key] + (b[key] - a[key]) * t;
  }
  return out;
}
