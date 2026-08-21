// Dependency-free 1D value noise plus the two shaping helpers the entry scene's
// sprites are built from. Kept out of the component so the drawing code reads as
// drawing code, and so anything else needing a seeded profile can reuse it.

import { smoothstep } from './math.js'

export function hash1(i, seed) {
	let n = Math.imul(i, 374761393) ^ Math.imul(seed, 951274213)
	n = Math.imul(n ^ (n >>> 13), 1274126177)
	return ((n ^ (n >>> 16)) >>> 0) / 4294967295
}

export function noise1(x, seed) {
	const i = Math.floor(x)
	return hash1(i, seed) + (hash1(i + 1, seed) - hash1(i, seed)) * smoothstep(x - i)
}

// Rounded, rolling profile — good for soft forms (cloud bulk, crag texture).
export function fbm1(x, seed) {
	return (
		0.6 * noise1(x, seed) + 0.3 * noise1(x * 2.7, seed + 7) + 0.1 * noise1(x * 6.1, seed + 13)
	)
}

// Ridged multifractal: folding the noise at its midpoint turns rolling hills
// into sharp crests with long flanks, which is what real mountains look like.
// Each octave is weighted by the one above it, so detail gathers on the ridges
// and the valleys stay smooth. Returns roughly 0..1.
export function ridged1(x, seed, octaves = 4) {
	let sum = 0
	let norm = 0
	let amp = 0.5
	let freq = 1
	let prev = 1
	for (let o = 0; o < octaves; o++) {
		let n = 1 - Math.abs(2 * noise1(x * freq, seed + o * 31) - 1)
		n *= n
		sum += n * amp * prev
		norm += amp
		prev = n
		freq *= 2.1
		amp *= 0.5
	}
	return sum / norm
}

// 4x4 ordered dither. Mixing two neighbouring shades on this grid buys a whole
// extra step of gradation without adding a colour — the period technique for
// getting depth out of a tiny palette.
const BAYER4 = [
	[0, 8, 2, 10],
	[12, 4, 14, 6],
	[3, 11, 1, 9],
	[15, 7, 13, 5],
]

// This pixel's slot on the dither grid, 0..1. Exposed because a scene that dithers
// more than one decision per pixel — which ramp, and how far up it — has to make both
// against the same threshold, or the two patterns beat against each other.
export function ditherThreshold(x, y) {
	return (BAYER4[y & 3][x & 3] + 0.5) / 16
}

// Pick an index into a `levels`-long ramp for brightness `lit` (0..1), dithering
// between the two nearest steps by pixel position.
export function ditherIndex(lit, levels, x, y) {
	const v = lit * (levels - 1)
	const i = Math.floor(v)
	const step = v - i > ditherThreshold(x, y) ? 1 : 0
	return Math.max(0, Math.min(levels - 1, i + step))
}

// 2D value noise. Rock texture sampled per column alone comes out as vertical
// striping; it has to vary down the face as well as across it.
function hash2(ix, iy, seed) {
	let n = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 951274213)
	n = Math.imul(n ^ (n >>> 13), 1274126177)
	return ((n ^ (n >>> 16)) >>> 0) / 4294967295
}

export function noise2(x, y, seed) {
	const ix = Math.floor(x)
	const iy = Math.floor(y)
	const u = smoothstep(x - ix)
	const v = smoothstep(y - iy)
	const a = hash2(ix, iy, seed) + (hash2(ix + 1, iy, seed) - hash2(ix, iy, seed)) * u
	const b = hash2(ix, iy + 1, seed) + (hash2(ix + 1, iy + 1, seed) - hash2(ix, iy + 1, seed)) * u
	return a + (b - a) * v
}

export function fbm2(x, y, seed) {
	return 0.65 * noise2(x, y, seed) + 0.35 * noise2(x * 2.6, y * 2.6, seed + 17)
}
