// Dependency-free 1D value noise plus the shaping helpers the entry scene's sprites are built from.

import { smoothstep } from './math.js'

export function hash1(i, seed) {
	let n = Math.imul(i, 374761393) ^ Math.imul(seed, 951274213)
	n = Math.imul(n ^ (n >>> 13), 1274126177)
	return ((n ^ (n >>> 16)) >>> 0) / 4294967295
}

function noise1(x, seed) {
	const i = Math.floor(x)
	return hash1(i, seed) + (hash1(i + 1, seed) - hash1(i, seed)) * smoothstep(x - i)
}

// Rounded, rolling profile — good for soft forms (cloud bulk, crag texture).
export function fbm1(x, seed) {
	return (
		0.6 * noise1(x, seed) + 0.3 * noise1(x * 2.7, seed + 7) + 0.1 * noise1(x * 6.1, seed + 13)
	)
}

// Ridged multifractal: folding the noise at its midpoint turns rolling hills into crests with long flanks.
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

// 4x4 ordered dither: mixing two neighbouring shades buys a step of gradation without a new colour.
const BAYER4 = [
	[0, 8, 2, 10],
	[12, 4, 14, 6],
	[3, 11, 1, 9],
	[15, 7, 13, 5],
]

// This pixel's dither slot, 0..1. Exposed so two decisions per pixel share one threshold and cannot beat.
export function ditherThreshold(x, y, jitter = 0) {
	const at = jitter ? 0.5 + (hash2(x, y, 9161) - 0.5) * jitter : 0.5
	return (BAYER4[y & 3][x & 3] + at) / 16
}

// Pick an index into a `levels`-long ramp for brightness `lit`, dithering between the nearest steps.
export function ditherIndex(lit, levels, x, y, contrast = 0) {
	const v = lit * (levels - 1)
	const i = Math.floor(v)
	let f = v - i
	if (contrast) f += (smoothstep(f) - f) * contrast
	const step = f > ditherThreshold(x, y) ? 1 : 0
	return Math.max(0, Math.min(levels - 1, i + step))
}

// Quantise `lit` onto a ramp with the dither confined to a seam of half-width `seam` at each boundary.
export function seamIndex(lit, levels, x, y, seam, jitter = 0) {
	const v = lit * (levels - 1)
	const i = Math.floor(v)
	const f = v - i
	let step = f >= 0.5 ? 1 : 0
	if (seam > 0 && Math.abs(f - 0.5) <= seam) {
		step = (f - (0.5 - seam)) / (2 * seam) > ditherThreshold(x, y, jitter) ? 1 : 0
	}
	return Math.max(0, Math.min(levels - 1, i + step))
}

// 2D value noise. Rock texture sampled per column alone stripes; it has to vary down the face too.
export function hash2(ix, iy, seed) {
	let n = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 951274213)
	n = Math.imul(n ^ (n >>> 13), 1274126177)
	return ((n ^ (n >>> 16)) >>> 0) / 4294967295
}

function noise2(x, y, seed) {
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

// Turbulence: `octaves` of noise, each half the size and weight of the last, normalised to 0..1.
export function turbulence(x, y, seed, octaves) {
	let sum = 0
	let norm = 0
	let amp = 1
	let freq = 1
	for (let o = 0; o < octaves; o++) {
		sum += amp * noise2(x * freq, y * freq, seed + o * 31)
		norm += amp
		freq *= 2
		amp *= 0.5
	}
	return sum / norm
}

// The 2D ridged multifractal: crests with long flanks, detail gathering where filaments cross. ~0..1.
export function ridged2(x, y, seed, octaves) {
	let sum = 0
	let norm = 0
	let amp = 0.5
	let freq = 1
	let prev = 1
	for (let o = 0; o < octaves; o++) {
		let n = 1 - Math.abs(2 * noise2(x * freq, y * freq, seed + o * 31) - 1)
		n *= n
		sum += n * amp * prev
		norm += amp
		prev = n
		freq *= 2.1
		amp *= 0.5
	}
	return sum / norm
}
