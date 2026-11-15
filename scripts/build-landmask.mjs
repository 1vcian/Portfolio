// Rasterises Natural Earth land polygons into tiny bitmasks that the 3D scene
// samples to place the dots of the globe. Output: lib/landmask.json (committed,
// so this only needs to run again if you want different resolutions).
//
//   npm run landmask
//
// Three masks, all equirectangular, row 0 = northernmost, bit order MSB first:
//   global  0.5°   whole world            – the globe seen from orbit
//   region  0.125° Europe + Mediterranean – extra detail when zooming in
//   italy   0.125° Italy only             – highlighted on the globe

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const land = JSON.parse(readFileSync(require.resolve("world-atlas/land-50m.json"), "utf8"));
const countries = JSON.parse(readFileSync(require.resolve("world-atlas/countries-50m.json"), "utf8"));

/** Collect every ring of a GeoJSON geometry as an array of [lon, lat] arrays. */
function rings(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return geometry.coordinates;
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat();
  if (geometry.type === "GeometryCollection") return geometry.geometries.flatMap(rings);
  return [];
}

function ringsOf(geojson) {
  if (geojson.type === "FeatureCollection") return geojson.features.flatMap((f) => rings(f.geometry));
  if (geojson.type === "Feature") return rings(geojson.geometry);
  return rings(geojson);
}

/** Even-odd scanline fill, sampled at cell centres. */
function rasterise(allRings, { lon0, lat0, step, w, h }) {
  const bits = new Uint8Array(Math.ceil((w * h) / 8));
  for (let j = 0; j < h; j++) {
    const lat = lat0 - (j + 0.5) * step; // lat0 is the northern edge
    const xs = [];
    for (const ring of allRings) {
      for (let i = 0, n = ring.length - 1; i < n; i++) {
        const [x1, y1] = ring[i];
        const [x2, y2] = ring[i + 1];
        if ((y1 <= lat && y2 > lat) || (y2 <= lat && y1 > lat)) {
          xs.push(x1 + ((lat - y1) / (y2 - y1)) * (x2 - x1));
        }
      }
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const from = Math.max(0, Math.ceil((xs[k] - lon0) / step - 0.5));
      const to = Math.min(w - 1, Math.floor((xs[k + 1] - lon0) / step - 0.5));
      for (let i = from; i <= to; i++) {
        const idx = j * w + i;
        bits[idx >> 3] |= 0x80 >> (idx & 7);
      }
    }
  }
  return bits;
}

function mask(allRings, spec) {
  const bits = rasterise(allRings, spec);
  let on = 0;
  for (const b of bits) for (let v = b; v; v &= v - 1) on++;
  return { ...spec, data: Buffer.from(bits).toString("base64"), _on: on, _bits: bits };
}

const landRings = ringsOf(feature(land, land.objects.land));
const italy = feature(countries, countries.objects.countries).features.find((f) => f.id === "380");
if (!italy) throw new Error("Italy (id 380) not found in countries-50m");
const italyRings = ringsOf(italy);

const out = {
  global: mask(landRings, { lon0: -180, lat0: 90, step: 0.5, w: 720, h: 360 }),
  region: mask(landRings, { lon0: -12, lat0: 62, step: 0.125, w: 432, h: 256 }),
  italy: mask(italyRings, { lon0: 6.5, lat0: 47.25, step: 0.125, w: 98, h: 96 }),
};

// ASCII preview of Italy, to eyeball the result.
{
  const { w, h, _bits } = out.italy;
  for (let j = 0; j < h; j += 3) {
    let line = "";
    for (let i = 0; i < w; i += 2) {
      const idx = j * w + i;
      line += _bits[idx >> 3] & (0x80 >> (idx & 7)) ? "#" : "·";
    }
    console.log(line);
  }
}

for (const [name, m] of Object.entries(out)) {
  console.log(`${name}: ${m.w}×${m.h} @ ${m.step}°, ${m._on} land cells, ${m.data.length} base64 chars`);
  delete m._on;
  delete m._bits;
}

const file = path.join(root, "lib", "landmask.json");
writeFileSync(file, JSON.stringify(out) + "\n");
console.log(`wrote ${path.relative(root, file)}`);
