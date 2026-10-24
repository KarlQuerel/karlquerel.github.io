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

// A cell's own threshold for a walk down a ramp, kept per cell by whoever walks, so a step is a
// compare and a fade is cells going over one by one, never a share of the frame at once. The order is
// Bayer's, spread across each level (a sixteenth of the frame would otherwise go at once), with `grain`
// of blue noise folded in: in pure Bayer order the cells over stand on a lattice, a quarter of the way
// in two cells apart, which reads as a screen; in pure blue noise they sit as evenly as noise allows,
// but the two tones of a band blur into each other and the sky's layers bleed. Between the two the
// lattice loosens and the bands still hold. The blend is ranked over the tile, so the share of cells
// over always equals the share of the fade.
const BLUE_SIZE = 64
const BLUE_SIGMA = 1.5
const BLUE_SEED = 4242
const walks = new Map()
export function fallThreshold(x, y, grain = 0) {
	if (!grain) return ditherThreshold(x, y, 1)
	let tile = walks.get(grain)
	if (!tile) walks.set(grain, (tile = walkTile(grain)))
	return tile[(y & (BLUE_SIZE - 1)) * BLUE_SIZE + (x & (BLUE_SIZE - 1))]
}

function walkTile(grain) {
	const N = BLUE_SIZE * BLUE_SIZE
	const blue = blueNoise()
	const mix = new Float32Array(N)
	for (let i = 0; i < N; i++) {
		const x = i & (BLUE_SIZE - 1)
		const y = i >> Math.log2(BLUE_SIZE)
		mix[i] = (1 - grain) * ditherThreshold(x, y, 1) + grain * blue[i]
	}
	const order = Array.from(mix.keys()).sort((a, b) => mix[a] - mix[b])
	const tile = new Float32Array(N)
	order.forEach((i, rank) => (tile[i] = (rank + 0.5) / N))
	return tile
}

// One tile of blue-noise thresholds, by void-and-cluster (Ulichney). Energy is the Gaussian sum of the cells that are on, wrapped at the edges;
// the tightest cluster is the on cell with the most of it, the largest void the off cell with the
// least. A tenth of the tile is seeded at random and relaxed until the two coincide, the seed is ranked
// by removing clusters, then the voids are filled in order to the last cell. Built once, on first use.
function blueNoise() {
	const n = BLUE_SIZE
	const N = n * n
	const reach = Math.ceil(BLUE_SIGMA * 3)
	const kernel = []
	for (let dy = -reach; dy <= reach; dy++) {
		for (let dx = -reach; dx <= reach; dx++) {
			kernel.push([dx, dy, Math.exp(-(dx * dx + dy * dy) / (2 * BLUE_SIGMA * BLUE_SIGMA))])
		}
	}
	const on = new Uint8Array(N)
	const energy = new Float64Array(N)
	const toggle = (i, sign) => {
		const x = i % n
		const y = (i - x) / n
		for (const [dx, dy, w] of kernel) {
			energy[((y + dy + n) % n) * n + ((x + dx + n) % n)] += sign * w
		}
		on[i] = sign > 0 ? 1 : 0
	}
	const pick = (state, most) => {
		let best = -1
		let bestEnergy = most ? -Infinity : Infinity
		for (let i = 0; i < N; i++) {
			if (on[i] === state && (most ? energy[i] > bestEnergy : energy[i] < bestEnergy)) {
				bestEnergy = energy[i]
				best = i
			}
		}
		return best
	}
	let seeded = 0
	for (let i = 0; i < N; i++) {
		if (hash1(i, BLUE_SEED) < 0.1) {
			toggle(i, 1)
			seeded++
		}
	}
	for (;;) {
		const cluster = pick(1, true)
		toggle(cluster, -1)
		const hole = pick(0, false)
		if (hole === cluster) {
			toggle(cluster, 1)
			break
		}
		toggle(hole, 1)
	}
	const rank = new Float32Array(N)
	const seed = Uint8Array.from(on)
	const seedEnergy = Float64Array.from(energy)
	for (let k = seeded - 1; k >= 0; k--) {
		const i = pick(1, true)
		rank[i] = k
		toggle(i, -1)
	}
	on.set(seed)
	energy.set(seedEnergy)
	for (let k = seeded; k < N; k++) {
		const i = pick(0, false)
		rank[i] = k
		toggle(i, 1)
	}
	for (let i = 0; i < N; i++) rank[i] = (rank[i] + 0.5) / N
	return rank
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
