// Turns the bitmasks in lib/landmask.json into the dots of the globe.
import masks from "../../lib/landmask.json";

type Mask = { lon0: number; lat0: number; step: number; w: number; h: number; data: string };

const DEG = Math.PI / 180;

/** Where each dot belongs — the shader styles them differently. */
export const KIND = {
  /** Sparse world-wide land dot. */
  GLOBAL: 0,
  /** Dense dot around Italy: only visible once zoomed in. */
  DENSE: 1,
  /** Dense dot inside Italy: always lit, in the accent colour. */
  ITALY: 2,
  /** Sparse dot where the dense ones take over: hands over to them on zoom. */
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

// The extra detail that appears when the camera closes in on Italy has no
// border. It is complete within CORE degrees of the focus, and from there the
// dots thin out little by little until, EDGE degrees away, only the sparse
// world-wide ones are left.
const FOCUS = { lon: 12.5, lat: 43, core: 9, edge: 30 };

/** Great-circle distance between two places, in degrees. */
function apart(lon1: number, lat1: number, lon2: number, lat2: number) {
  const a = lat1 * DEG;
  const b = lat2 * DEG;
  const cos = Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos((lon2 - lon1) * DEG);
  return Math.acos(Math.min(1, Math.max(-1, cos))) / DEG;
}

/** How close a place is to the focus: 1 inside the core, easing down to 0 at the edge. */
function nearness(lon: number, lat: number) {
  const t = Math.min(1, Math.max(0, (FOCUS.edge - apart(lon, lat, FOCUS.lon, FOCUS.lat)) / (FOCUS.edge - FOCUS.core)));
  return t * t * (3 - 2 * t);
}

/** Does this mask reach the place? Outside it the sampler would just say "sea". */
const covers = (m: Mask, lon: number, lat: number) => lon >= m.lon0 && lon < m.lon0 + m.w * m.step && lat <= m.lat0 && lat > m.lat0 - m.h * m.step;

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
    // Near the focus the dense dots take over on zoom; further out the sparse ones stay.
    push(lon, lat, nearness(lon, lat) > 0.6 ? KIND.GLOBAL_IN_BOX : KIND.GLOBAL);
  }

  // 2. Around Italy, a staggered grid like a dot-matrix map. The grid is
  // complete near the focus and keeps a smaller and smaller share of its dots
  // on the way out. The share follows the density, not the distance: it goes
  // from "as many as the sparse dots" to "all of them" in even steps for the
  // eye, which is why it is an exponential.
  const step = quality === "high" ? 0.18 : 0.27;
  const sparseStep = Math.sqrt((4 * Math.PI) / candidates) / DEG; // spacing of the world-wide dots, in degrees
  const ratio = (sparseStep / step) ** 2; // how many times denser the grid is
  const region = masks.region as Mask;
  let row = 0;
  for (let lat = FOCUS.lat - FOCUS.edge; lat <= FOCUS.lat + FOCUS.edge; lat += step, row++) {
    const lonStep = step / Math.cos(lat * DEG);
    const reach = FOCUS.edge / Math.cos(lat * DEG);
    const offset = row % 2 ? lonStep / 2 : 0;
    let column = 0;
    for (let lon = FOCUS.lon - reach + offset; lon <= FOCUS.lon + reach; lon += lonStep, column++) {
      const near = nearness(lon, lat);
      if (near <= 0) continue;
      const share = (ratio ** near - 1) / (ratio - 1);
      // Which dots stay is decided by a low-discrepancy pattern, so the ones left are evenly spread, not clumped.
      const rank = (column * 0.7548776662 + row * 0.569840291) % 1;
      if (rank >= share) continue;
      const land = covers(region, lon, lat) ? isLandFine(lon, lat) : isLand(lon, lat);
      if (!land) continue;
      push(lon, lat, isItaly(lon, lat) ? KIND.ITALY : KIND.DENSE);
    }
  }

  return { positions, kinds };
}
