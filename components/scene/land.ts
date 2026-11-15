// Turns the bitmasks in lib/landmask.json into the dots of the globe.
import masks from "../../lib/landmask.json";

type Mask = { lon0: number; lat0: number; step: number; w: number; h: number; data: string };

const DEG = Math.PI / 180;

/** Where each dot belongs — the shader styles them differently. */
export const KIND = {
  /** Sparse world-wide land dot. */
  GLOBAL: 0,
  /** Dense dot around Europe: only visible once zoomed in. */
  DENSE: 1,
  /** Dense dot inside Italy: always lit, in the accent colour. */
  ITALY: 2,
  /** Sparse dot inside the dense box: hands over to the dense ones on zoom. */
  GLOBAL_IN_BOX: 3,
  /** Has no place on the globe; only appears in the ground state. */
  EXTRA: 4,
} as const;

function sampler(m: Mask) {
  const bin = atob(m.data);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return (lon: number, lat: number) => {
    const i = Math.floor((lon - m.lon0) / m.step);
    const j = Math.floor((m.lat0 - lat) / m.step);
    if (i < 0 || j < 0 || i >= m.w || j >= m.h) return false;
    const idx = j * m.w + i;
    return (bytes[idx >> 3] & (0x80 >> (idx & 7))) !== 0;
  };
}

/** lon/lat in degrees → point on the unit sphere (lon 0 faces +Z, north is +Y). */
export function lonLatToVec(lon: number, lat: number, out: number[] | Float32Array, o = 0) {
  const phi = lat * DEG;
  const lam = lon * DEG;
  out[o] = Math.cos(phi) * Math.sin(lam);
  out[o + 1] = Math.sin(phi);
  out[o + 2] = Math.cos(phi) * Math.cos(lam);
}

// The area that gets extra detail when the camera closes in on Italy.
const BOX = { west: -9, east: 34, south: 31, north: 56 };

export type LandPoints = { positions: number[]; kinds: number[] };

export function buildLandPoints(quality: "high" | "low"): LandPoints {
  const isLand = sampler(masks.global as Mask);
  const isLandFine = sampler(masks.region as Mask);
  const isItaly = sampler(masks.italy as Mask);

  const positions: number[] = [];
  const kinds: number[] = [];
  const v = [0, 0, 0];
  const push = (lon: number, lat: number, kind: number) => {
    lonLatToVec(lon, lat, v);
    positions.push(v[0], v[1], v[2]);
    kinds.push(kind);
  };

  // 1. The whole world on a Fibonacci lattice: even coverage, no visible rows.
  const candidates = quality === "high" ? 46000 : 24000;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let k = 0; k < candidates; k++) {
    const y = 1 - (2 * (k + 0.5)) / candidates;
    const lat = Math.asin(y) / DEG;
    let lon = ((k * golden) / DEG) % 360;
    if (lon > 180) lon -= 360;
    if (!isLand(lon, lat)) continue;
    const inBox = lon > BOX.west && lon < BOX.east && lat > BOX.south && lat < BOX.north;
    push(lon, lat, inBox ? KIND.GLOBAL_IN_BOX : KIND.GLOBAL);
  }

  // 2. Europe and the Mediterranean on a staggered grid, like a dot-matrix map.
  const step = quality === "high" ? 0.18 : 0.27;
  let row = 0;
  for (let lat = BOX.south; lat <= BOX.north; lat += step, row++) {
    const lonStep = step / Math.cos(lat * DEG);
    const offset = row % 2 ? lonStep / 2 : 0;
    for (let lon = BOX.west + offset; lon <= BOX.east; lon += lonStep) {
      if (!isLandFine(lon, lat)) continue;
      push(lon, lat, isItaly(lon, lat) ? KIND.ITALY : KIND.DENSE);
    }
  }

  return { positions, kinds };
}
