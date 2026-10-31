// The Earth of 3812, painted flat from its map the pixel-art way: Natural Earth's coast
// (constants/intro/landMask.js) with the seas drained to their deep basins, the old seabed a dry
// salt pan, the land scorched and over-lit, smoke for weather, fires on the night side and hot brown
// air at the limb. Every cell lands on a palette tone; seams are one-cell dithers. The style is
// EARTH_MAP (constants/intro/earthMap.js).

import { EARTH_MAP } from '../../constants/intro/earthMap.js'
import { LAND_MASK } from '../../constants/intro/landMask.js'
import { PALETTE } from '../../constants/palette.js'
import { clamp, clamp01, ramp } from '../math.js'
import { ditherThreshold, seamIndex } from '../pixelNoise.js'
import { createPlanetShader, planetDisc, planetWorld } from '../planetShader.js'
import { tidySprite } from '../ridge.js'

const DEG = Math.PI / 180
// what a cell is made of, each with the ramp of its name in EARTH_MAP.ramps
const SEA = 0
const SHORE = 1
const SALT = 2
const GROUND = 3
const HIGHLAND = 4
const DUNE = 5
const SMOKE = 6
const SPACE = 7
const RAMP_NAMES = ['sea', 'shore', 'salt', 'ground', 'highland', 'dune', 'smoke']
// what burns: the side a front has crossed, and the front itself
const BURNED = 1
const FRONT = 2

// a unit vector for a place: x out of the Greenwich meridian, y north, z out of 90°E
const toVec = (lat, lon) => [
	Math.cos(lat * DEG) * Math.cos(lon * DEG),
	Math.sin(lat * DEG),
	Math.cos(lat * DEG) * Math.sin(lon * DEG),
]
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a, b) => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0],
]

// The map decoded once: `share` is the land softened over its neighbours (a binomial 3x3, 0..255),
// so a coast read between cells rounds off instead of stepping along the grid; `dist` is each sea
// cell's way to the nearest land in half-degrees, an east-west step counting cos(lat) of one, by a
// chamfer sweep down and back up the map, twice so the wrap at the antimeridian settles.
let map = null
function landMap() {
	if (map) return map
	const { cols, rows, alphabet, runs } = LAND_MASK
	const hard = new Uint8Array(cols * rows)
	let at = 0
	let land = 0
	let acc = 0
	let shift = 0
	for (const ch of runs) {
		const v = alphabet.indexOf(ch)
		if (v >= 32) {
			acc |= (v - 32) << shift
			shift += 5
			continue
		}
		const run = acc | (v << shift)
		if (land) hard.fill(1, at, at + run)
		at += run
		land ^= 1
		acc = 0
		shift = 0
	}
	const share = new Uint8Array(cols * rows)
	const WEIGHTS = [1, 2, 1]
	for (let y = 0; y < rows; y++)
		for (let x = 0; x < cols; x++) {
			let sum = 0
			for (let j = -1; j <= 1; j++) {
				const Y = clamp(y + j, 0, rows - 1) * cols
				for (let i = -1; i <= 1; i++)
					sum += WEIGHTS[j + 1] * WEIGHTS[i + 1] * hard[Y + ((x + i + cols) % cols)]
			}
			share[y * cols + x] = (sum * 255) / 16
		}
	const dist = new Float32Array(cols * rows)
	for (let i = 0; i < dist.length; i++) dist[i] = hard[i] ? 0 : Infinity
	const sweep = (y0, y1, dy) => {
		for (let y = y0; y !== y1; y += dy) {
			const across = Math.cos((90 - (y + 0.5) * (180 / rows)) * DEG)
			const diagonal = Math.hypot(across, 1)
			const row = y * cols
			const prev = (y - dy) * cols
			const above = y - dy >= 0 && y - dy < rows
			for (let k = 0; k < cols; k++) {
				const x = dy > 0 ? k : cols - 1 - k
				let d = dist[row + x]
				const beside = dist[row + ((x - dy + cols) % cols)] + across
				if (beside < d) d = beside
				if (above) {
					const up = dist[prev + x] + 1
					if (up < d) d = up
					const corner =
						Math.min(
							dist[prev + ((x + 1) % cols)],
							dist[prev + ((x - 1 + cols) % cols)]
						) + diagonal
					if (corner < d) d = corner
				}
				dist[row + x] = d
			}
		}
	}
	for (let pass = 0; pass < 2; pass++) {
		sweep(0, rows, 1)
		sweep(rows - 1, -1, -1)
	}
	map = { share, dist }
	return map
}

// a field of the map read bilinearly at a place
function sample(field, lat, lon) {
	const { cols, rows } = LAND_MASK
	const u = ((lon + 180) / 360) * cols - 0.5
	const v = ((90 - lat) / 180) * rows - 0.5
	const x0 = Math.floor(u)
	const y0 = Math.floor(v)
	const fx = u - x0
	const fy = v - y0
	const X0 = ((x0 % cols) + cols) % cols
	const X1 = (X0 + 1) % cols
	const Y0 = clamp(y0, 0, rows - 1) * cols
	const Y1 = clamp(y0 + 1, 0, rows - 1) * cols
	const top = field[Y0 + X0] + (field[Y0 + X1] - field[Y0 + X0]) * fx
	const bottom = field[Y1 + X0] + (field[Y1 + X1] - field[Y1 + X0]) * fx
	return top + (bottom - top) * fy
}
const landAt = (lat, lon) => sample(landMap().share, lat, lon) / 255
// degrees of open sea between a place and the nearest old coast
const seaAt = (lat, lon) => sample(landMap().dist, lat, lon) * 0.5

// how far inside a region [lat, lon, latReach, lonReach] a place is: 1 at the centre, 0 at the edge
function inside([lat0, lon0, rLat, rLon], lat, lon) {
	const dlat = (lat - lat0) / rLat
	const dlon = (((lon - lon0 + 540) % 360) - 180) / rLon
	return 1 - dlat * dlat - dlon * dlon
}
const regions = (list, lat, lon) => list.reduce((best, r) => Math.max(best, inside(r, lat, lon)), 0)

// The view: `lat`, `lon` is the place the limb crests on (the top of the disc), `heading` the compass
// bearing down the frame from it. View space is x right, y down, z toward the viewer.
function viewBasis({ lat, lon, heading }) {
	const P = toVec(lat, lon)
	const cl = Math.cos(lat * DEG)
	const sl = Math.sin(lat * DEG)
	const co = Math.cos(lon * DEG)
	const so = Math.sin(lon * DEG)
	const east = [-so, 0, co]
	const north = [-sl * co, cl, -sl * so]
	const ch = Math.cos(heading * DEG)
	const sh = Math.sin(heading * DEG)
	const V = [0, 1, 2].map(i => ch * north[i] + sh * east[i])
	return { P, V, R: cross(V, P) }
}
const toPlanet = (dx, dy, dz, { P, V, R }) => [
	dx * R[0] - dy * P[0] + dz * V[0],
	dx * R[1] - dy * P[1] + dz * V[1],
	dx * R[2] - dy * P[2] + dz * V[2],
]

// a point turned about an axis `c` by `a`, Rodrigues' way
function turn([x, y, z], c, a) {
	const ca = Math.cos(a)
	const sa = Math.sin(a)
	const k = dot3(c, [x, y, z]) * (1 - ca)
	return [
		x * ca + (c[1] * z - c[2] * y) * sa + c[0] * k,
		y * ca + (c[2] * x - c[0] * z) * sa + c[1] * k,
		z * ca + (c[0] * y - c[1] * x) * sa + c[2] * k,
	]
}

function put(d, i, name) {
	const [r, g, b] = PALETTE[name]
	d[i] = r
	d[i + 1] = g
	d[i + 2] = b
	d[i + 3] = 255
}

// How much more smoke a place carries: the latitude belts, and the fires under it.
function liftAt(M, lat, lon) {
	const al = Math.abs(lat)
	let lift = M.fires.lift * regions(M.fires.regions, lat, lon)
	for (const [at, half, by] of M.smoke.belts) {
		const k = (al - at) / half
		lift += by * Math.exp(-k * k)
	}
	return lift
}

// The smoke at a planet-space point: the noise field twisted into each storm, bent by its warp, plus
// the place's `lift`; positive is smoke.
function smokeAt(M, fbm, p, lift) {
	const S = M.smoke
	let q = p
	for (const s of S.storms) {
		const c = toVec(s[0], s[1])
		const cosR = Math.cos(s[2] * DEG)
		const along = dot3(c, q)
		if (along <= cosR) continue
		const t = (along - cosR) / (1 - cosR)
		q = turn(q, c, s[3] * t * t)
	}
	// the field is read coarser east to west than north to south: trails stretch along the wind
	const s = S.scale
	const z = S.zonal
	const w = S.warpScale
	const bend = (x, y, z, o) => (fbm(x * w + o, y * w, z * w, 2) - 0.47) * S.warp
	const n = fbm(
		q[0] * s * z + bend(q[0], q[1], q[2], 31),
		q[1] * s + bend(q[0], q[1], q[2], 57),
		q[2] * s * z + bend(q[0], q[1], q[2], 83),
		S.octaves
	)
	return n + lift - S.cover
}

// What a land cell is, by where it is.
function groundAt(M, fbm, lat, lon, p) {
	const G = M.ground
	const noise = fbm(p[0] * G.scale + 3, p[1] * G.scale, p[2] * G.scale, 3) - 0.47
	if (regions(G.ranges, lat, lon) + noise * 1.6 > 0.55 || noise < -G.burnt) return HIGHLAND
	if (regions(G.deserts, lat, lon) + noise * 0.5 > G.desert || noise > G.bleached) return DUNE
	return GROUND
}

// What is left of the cities on the night side: built where a second world's land would be,
// thickest on the coast and in the temperate belt, a share of a fine lattice lit.
function paintCities(d, cells, M, win, { lx, ly, lz }, radius, center, basis, hash3) {
	const { cities: c } = M.night
	const { x0, y0, w, h } = win
	const built = createPlanetShader({ res: 2, seed: M.seed + 2 })
	for (let y = y0; y < y0 + h; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = x0; x < x0 + w; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			if (d2 >= 1) continue
			const j = (y - y0) * w + (x - x0)
			const what = cells[j]
			if (what < GROUND || what > DUNE) continue
			const dz = Math.sqrt(1 - d2)
			if (dx * lx + dy * ly + dz * lz > c.until) continue
			const p = toPlanet(dx, dy, dz, basis)
			const b = built.elevation(p[0], p[1], p[2])
			if (b < c.built) continue
			const lat = Math.asin(clamp(p[1], -1, 1)) / DEG
			const lon = Math.atan2(p[2], p[0]) / DEG
			const coastal = 1 - clamp01((landAt(lat, lon) - 0.5) / 0.5)
			const dense = clamp01((b - c.built) / c.spread)
			const belt =
				0.3 +
				0.7 *
					ramp(Math.abs(lat), c.lats[0] - 12, c.lats[0]) *
					ramp(Math.abs(lat), c.lats[1] + 10, c.lats[1])
			const odds = c.lit * (0.25 + 0.75 * coastal) * (0.3 + 0.7 * dense) * belt
			const f = c.fine
			const hit = hash3(Math.floor(p[0] * f), Math.floor(p[1] * f), Math.floor(p[2] * f))
			if (hit > odds) continue
			put(d, j * 4, hit < odds * 0.12 ? 'glow' : hit < odds * 0.45 ? 'ember' : 'amber')
		}
	}
}

// The air past the limb: as deep as the limb faces the sun, inner band out, the last thinning to a checker.
function paintAir(d, i, x, y, dx, dy, d2, radius, { lx, ly }, A) {
	const out = (Math.sqrt(d2) - 1) * radius
	const toward = (dx * lx + dy * ly) / (Math.hypot(lx, ly) * Math.sqrt(d2))
	const lit = clamp01((toward + A.wrap) / (1 + A.wrap))
	const deep = A.night + (A.depth - A.night) * lit
	if (out >= deep) return
	const full = A.bands.reduce((sum, [, cells]) => sum + cells, 0)
	// the band this cell falls in at this depth, and how far into it
	let f = (out / deep) * full
	let band = 0
	let into = 0
	for (; band < A.bands.length; band++) {
		const cells = A.bands[band][1]
		if (f < cells) {
			into = f / cells
			break
		}
		f -= cells
	}
	if (band === 0 && toward < A.lineFrom) band = 1
	if (band > 0 && into < A.seam && into / A.seam < ditherThreshold(x, y)) band--
	// the last band thins out over its whole width
	if (band === A.bands.length - 1 && into > ditherThreshold(x, y)) return
	put(d, i, A.bands[Math.min(band, A.bands.length - 1)][0])
}

// The globe under the view `view` and the light `light` (x right, y down, z toward the viewer, any
// length), cut to the window `win` of its `res`-cell sprite. Two passes: what each cell is made of
// (tidied, so coasts stay clean), then the light over it.
export function paintEarthMap(res, { light, view }, win, M = EARTH_MAP) {
	const { x0, y0, w, h } = win
	const d = new Uint8ClampedArray(w * h * 4)
	const { radius, center } = planetDisc(res)
	const basis = viewBasis(view)
	const len = Math.hypot(...light)
	const L = { lx: light[0] / len, ly: light[1] / len, lz: light[2] / len }
	const sun = toPlanet(L.lx, L.ly, L.lz, basis)
	const { fbm } = createPlanetShader({ res: 2, seed: M.seed })
	const { hash3 } = planetWorld(M.seed + 1)
	const C = M.coast
	const D = M.drying
	const F = M.fires

	const cells = new Uint32Array(w * h).fill(SPACE)
	// the ground under a trail, for its frayed edge; what burns
	const under = new Uint8Array(w * h)
	const burn = new Uint8Array(w * h)
	const smokeK = new Float32Array(w * h)
	const lifts = new Float32Array(w * h)
	for (let y = y0; y < y0 + h; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = x0; x < x0 + w; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			if (d2 >= 1) continue
			const p = toPlanet(dx, dy, Math.sqrt(1 - d2), basis)
			const lat = Math.asin(clamp(p[1], -1, 1)) / DEG
			const lon = Math.atan2(p[2], p[0]) / DEG
			const j = (y - y0) * w + (x - x0)
			lifts[j] = liftAt(M, lat, lon)
			smokeK[j] = smokeAt(M, fbm, p, lifts[j]) / M.smoke.edge
			const land =
				landAt(lat, lon) +
				C.push * (fbm(p[0] * C.scale + 7, p[1] * C.scale, p[2] * C.scale, C.octaves) - 0.47)
			let what
			if (land > 0.5) {
				what = groundAt(M, fbm, lat, lon, p)
				const burning = regions(F.regions, lat, lon)
				if (burning > 0) {
					const f = fbm(p[0] * F.scale + 11, p[1] * F.scale, p[2] * F.scale, 2) - 0.5
					burn[j] = Math.abs(f) < F.width * (0.5 + burning) ? FRONT : f < 0 ? BURNED : 0
				}
			} else {
				const s = D.frayScale
				const sea =
					seaAt(lat, lon) + D.fray * (fbm(p[0] * s + 13, p[1] * s, p[2] * s, 2) - 0.47)
				what = sea > D.drain ? SEA : sea > D.drain - D.rim ? SHORE : SALT
			}
			under[j] = what
			cells[j] = smokeK[j] > 0 ? SMOKE : what
		}
	}
	tidySprite({ data: cells }, w, h, M.tidyPasses)

	const ramps = RAMP_NAMES.map(name => M.ramps[name])
	const levels = ramps[0].length
	const { gain, seam } = M.light
	const N = M.night
	const Lb = M.limb
	const O = M.smoke.shadowOffset
	const fine = N.cities.fine
	for (let y = y0; y < y0 + h; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = x0; x < x0 + w; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			const j = (y - y0) * w + (x - x0)
			const i = j * 4
			if (d2 >= 1) {
				paintAir(d, i, x, y, dx, dy, d2, radius, L, M.air)
				continue
			}
			const dz = Math.sqrt(1 - d2)
			const diff = dx * L.lx + dy * L.ly + dz * L.lz
			const what = cells[j]
			// a trail's thin edge lets the ground through in Bayer order, so it frays rather than stops
			const smoke = what === SMOKE && smokeK[j] > ditherThreshold(x, y)
			const ground = what === SMOKE ? under[j] : what
			const p = toPlanet(dx, dy, dz, basis)
			let step = -1
			if (diff <= 0) {
				const roll = hash3(
					Math.floor(p[0] * fine),
					Math.floor(p[1] * fine),
					Math.floor(p[2] * fine)
				)
				if (!smoke && burn[j] === FRONT && roll < F.lit)
					put(d, i, N.fire[roll < F.lit * 0.3 ? 0 : roll < F.lit * 0.7 ? 1 : 2])
				else put(d, i, smoke ? N.smoke : ground <= SHORE ? N.sea : N.land)
			} else {
				step = seamIndex(clamp01(diff * gain), levels, x, y, seam)
				if (smoke) {
					// a trail's thin edge, its side away from the sun and its hollows sit a step down
					const T = M.smoke.texture
					const hollow =
						fbm(p[0] * T.scale + 5, p[1] * T.scale, p[2] * T.scale, 2) < T.below
					const rim = smokeAt(
						M,
						fbm,
						[p[0] - sun[0] * O, p[1] - sun[1] * O, p[2] - sun[2] * O],
						lifts[j]
					)
					if (smokeK[j] < 1 || rim <= 0 || hollow) step = Math.max(0, step - 1)
					put(d, i, ramps[SMOKE][step])
				} else {
					if (what !== SMOKE) {
						// a solid trail up-sun shades the ground, never below the first lit step
						const shade = smokeAt(
							M,
							fbm,
							[p[0] + sun[0] * O, p[1] + sun[1] * O, p[2] + sun[2] * O],
							lifts[j]
						)
						if (shade > M.smoke.edge) step = Math.max(1, step - M.smoke.shadowDrop)
					}
					if (burn[j] === BURNED) step = Math.max(0, step - 1)
					if (burn[j] === FRONT) put(d, i, M.scar[step > 2 ? 1 : 0])
					else put(d, i, ramps[ground][step])
				}
			}
			// the air over the ground, seen edge-on toward the limb
			if (d2 > Lb.from) {
				const k = ((d2 - Lb.from) / (1 - Lb.from)) * Lb.gain
				const over = seamIndex(clamp01(k), 3, x, y, seam)
				if (over > 0) {
					const tones = Lb.tones[step >= 3 ? 'lit' : step >= 1 ? 'dusk' : 'night']
					if (tones[over - 1]) put(d, i, tones[over - 1])
				}
			}
		}
	}
	paintCities(d, cells, M, win, L, radius, center, basis, hash3)
	return d
}
