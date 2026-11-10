// The earth shot's layers, painted once per grid into one atlas: the globe at (0, 0), the Moon beside
// it. The stars are the intro's shared tile (js/intro/sky.js). The shader only slides them, so every
// pixel stays where it was put. The globe is the Earth of 3812 off its map (earthMap.js), the one the
// holding screen and the corridor's window show; the holding screen paints its Moon with paintMoon too.

import { EARTH } from '../../constants/intro/earth.js'
import { PALETTE } from '../../constants/palette.js'
import { PLANET } from '../../constants/planet.js'
import { MOON } from '../../constants/intro/moon.js'
import { clamp01, ramp, smoothstep } from '../math.js'
import { fbm1, fbm2, seamIndex } from '../pixelNoise.js'
import { tidySprite } from '../ridge.js'
import { paintEarthMap } from './earthMap.js'

const DEG = Math.PI / 180
const even = v => 2 * Math.ceil(v / 2)

// the sprites' sides in cells for this grid; the shader is handed the same numbers
function earthSizes(grid) {
	const short = Math.min(grid.width, grid.height)
	return {
		planet: even((EARTH.planet.radius * short) / PLANET.discRadius),
		moon: even(EARTH.moon.radius * short * 2 + 2),
	}
}

function put(d, i, name) {
	const [r, g, b] = PALETTE[name]
	d[i] = r
	d[i + 1] = g
	d[i + 2] = b
	d[i + 3] = 255
}

// The light on the globe: from where the sun stands on this grid with `lightAt` of the earth shot's pan
// still to go, and `front` of it toward the viewer.
function globeLight(grid) {
	const { planet, star, travel } = EARTH
	const along = (i, side) =>
		(star.at[i] - planet.at[i]) * side +
		travel[i] * planet.lightAt * (star.depth - planet.depth) * grid.height
	const a = Math.atan2(along(1, grid.height), along(0, grid.width))
	const side = Math.sqrt(1 - planet.front * planet.front)
	return [side * Math.cos(a), side * Math.sin(a), planet.front]
}

const paintGlobe = (res, grid) =>
	paintEarthMap(
		res,
		{ light: globeLight(grid), view: EARTH.planet.view },
		{ x0: 0, y0: 0, w: res, h: res }
	)

// The Moon's own near side (constants/intro/moon.js): highland and mare albedo, Tycho's rays, a crisp
// terminator, and earthshine keeping the night side's maria just visible.
const toVec = ([lat, lon]) => [
	Math.cos(lat * DEG) * Math.sin(lon * DEG),
	Math.sin(lat * DEG),
	Math.cos(lat * DEG) * Math.cos(lon * DEG),
]
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const angleDeg = (a, b) => Math.acos(Math.max(-1, Math.min(1, dot3(a, b)))) / DEG

// a crater's bright halo and its rays, by bearing round it
function rayLight(p, crater, k) {
	const [, , radius, reach] = crater
	const c = toVec(crater)
	const a = angleDeg(p, c)
	if (a > reach) return 0
	const east = [c[2], 0, -c[0]]
	const north = [-c[1] * c[0], c[0] * c[0] + c[2] * c[2], -c[1] * c[2]]
	const o = [p[0] - c[0], p[1] - c[1], p[2] - c[2]]
	const bearing = Math.atan2(dot3(o, north), dot3(o, east))
	const streak = fbm1((bearing + Math.PI) * 4, EARTH.moon.seed + k)
	const fade = (1 - a / reach) ** 1.5
	const halo = a < radius * 2.5 ? 1 : 0
	return Math.max(halo, streak > 0.64 ? fade : 0)
}

// The map's big craters that this sprite can show, each `exaggerate` times its size: none on a
// mare (the lava floors are young and flat), none under `minCells` across.
function craterField(F, bowls, mareAt, cellsPerDeg) {
	const field = []
	for (const [lat, lon, radius] of bowls) {
		const r = radius * F.exaggerate
		if (r * cellsPerDeg < F.minCells) continue
		const v = toVec([lat, lon])
		if (mareAt(v, 0) > 0.5) continue
		field.push({ v, r, reach: Math.cos(r * F.flank * DEG) })
	}
	return field
}

// The craters' relief at `p` under `sun` (unit vectors): a bowl's wall on the sun's side falls away
// from the light and its far wall faces it, the outer flank the other way round. Measured along the
// sun's run over the ground, so it fades to nothing under a high sun and bites at the terminator.
function craterRelief(p, sun, field, F) {
	const along = dot3(sun, p)
	const sT = [sun[0] - along * p[0], sun[1] - along * p[1], sun[2] - along * p[2]]
	let relief = 0
	for (const c of field) {
		const d = dot3(p, c.v)
		if (d < c.reach) continue
		const t = angleDeg(p, c.v) / c.r
		// the way to the centre along the ground
		const o = [c.v[0] - d * p[0], c.v[1] - d * p[1], c.v[2] - d * p[2]]
		const facing = -dot3(o, sT) / (Math.hypot(o[0], o[1], o[2]) || 1)
		relief +=
			t < 1
				? -F.bowl * facing * smoothstep(ramp(t, F.floor, 1))
				: F.rim * facing * (1 - ramp(t, 1, F.flank))
	}
	return relief
}

// The Moon's near side from its map `M` (constants/intro/moon.js by default) under `light` (x right,
// y down, z toward the viewer): highland and mare albedo, Tycho's rays, a crisp terminator, earthshine
// keeping the night side's maria just visible, and a crater field's relief when the map has one.
export function paintMoon(res, M = MOON, light = EARTH.moon.light) {
	const d = new Uint8ClampedArray(res * res * 4)
	const [lx, ly, lz] = light
	const ll = Math.hypot(lx, ly, lz)
	// the sun in the map's frame, north up
	const sun = [lx / ll, -ly / ll, lz / ll]
	const maria = M.maria.map(m => [toVec(m), m[2]])
	const mareAt = (p, rag) => {
		let mare = 0
		for (const [v, rad] of maria)
			mare = Math.max(mare, 1 - smoothstep(ramp(angleDeg(p, v) + rag, rad - 2, rad + 2)))
		return mare
	}
	const r = res / 2 - 1
	const c = res / 2
	const field = M.field ? craterField(M.field, M.bowls, mareAt, r * DEG) : []
	for (let y = 0; y < res; y++) {
		const dy = (y + 0.5 - c) / r
		for (let x = 0; x < res; x++) {
			const dx = (x + 0.5 - c) / r
			const d2 = dx * dx + dy * dy
			if (d2 >= 1) continue
			const z = Math.sqrt(1 - d2)
			// screen y runs down, latitude up
			const p = [dx, -dy, z]
			const lat = Math.asin(p[1]) / DEG
			const lon = Math.atan2(p[0], p[2]) / DEG
			const rag = M.ragged * 2 * (fbm2(lon * M.raggedScale, lat * M.raggedScale, 7) - 0.5)
			const mare = mareAt(p, rag)
			let ray = 0
			M.craters.forEach((cr, k) => (ray = Math.max(ray, rayLight(p, cr, k))))
			const grain = M.grain * (fbm2(x * 0.7, y * 0.7, 31) - 0.5) * (1 - mare)
			const albedo = Math.min(
				1,
				M.highland + (M.mare - M.highland) * mare + grain + M.ray * ray
			)
			const relief = field.length ? craterRelief(p, sun, field, M.field) : 0
			const lit = (dx * lx + dy * ly + z * lz) / ll
			const day = smoothstep(ramp(lit, -0.02, M.terminator)) * (0.8 + 0.2 * Math.max(0, lit))
			const v = (albedo + relief) * Math.max(day, M.earthshine)
			const step = seamIndex(clamp01(v), M.ramp.length, x, y, M.seam)
			put(d, (y * res + x) * 4, M.ramp[step])
		}
	}
	tidySprite({ data: d }, res, res, EARTH.tidyPasses)
	return d
}

function blit(atlas, width, src, res, ox, oy) {
	for (let y = 0; y < res; y++)
		atlas.set(src.subarray(y * res * 4, (y + 1) * res * 4), ((oy + y) * width + ox) * 4)
}

export function paintEarthAtlas(grid) {
	const sizes = earthSizes(grid)
	const { planet: P, moon: M } = sizes
	const width = P + M
	const height = Math.max(P, M)
	const data = new Uint8ClampedArray(width * height * 4)
	blit(data, width, paintGlobe(P, grid), P, 0, 0)
	blit(data, width, paintMoon(M), M, P, 0)
	return { data, width, height, sizes }
}
