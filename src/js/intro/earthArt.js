// The earth shot's layers, painted once per grid into one atlas: the globe at (0, 0), the Moon beside
// it. The stars are the intro's shared tile (js/intro/sky.js). The shader only slides them, so every pixel stays where it was put.

import { EARTH } from '../../constants/intro/earth.js'
import { PALETTE } from '../../constants/palette.js'
import { PLANET } from '../../constants/planet.js'
import { createPlanetShader, planetDisc, planetFrame, planetWorld } from '../planetShader.js'
import { MOON } from '../../constants/intro/moon.js'
import { clamp01, ramp, smoothstep } from '../math.js'
import { ditherThreshold, fbm1, fbm2, seamIndex } from '../pixelNoise.js'
import { tidySprite } from '../ridge.js'

const DEG = Math.PI / 180
const even = v => 2 * Math.ceil(v / 2)
const dz = d2 => Math.sqrt(1 - d2)

// the sprites' sides in cells for this grid; the shader is handed the same numbers
export function earthSizes(grid) {
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

// The renderer's own turn from view space into planet space, so paint lands on its continents.
function toPlanet(dx, dy, dz, { cosT, sinT }, { cosS, sinS }) {
	const ny = dy * cosT - dz * sinT
	const nz = dy * sinT + dz * cosT
	return [dx * cosS + nz * sinS, ny, -dx * sinS + nz * cosS]
}

// The night side's cities: the globe's own elevation says where land is, a second world's where it is built.
function paintCities(d, res, ground, frame) {
	const disc = planetDisc(res)
	const { radius, center } = disc
	const { light } = frame
	const c = EARTH.cities
	const { hash3 } = planetWorld(EARTH.planet.seed + 1)
	const built = createPlanetShader({ res, seed: EARTH.planet.seed + 2 })
	for (let y = 0; y < res; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = 0; x < res; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			if (d2 >= 1) continue
			const dz = Math.sqrt(1 - d2)
			if (dx * light[0] + dy * light[1] + dz * light[2] > c.night) continue
			const [sx, ny, sz] = toPlanet(dx, dy, dz, disc, frame)
			const n = ground(sx, ny, sz)
			if (n < PLANET.seaLevel) continue
			const b = built.elevation(sx, ny, sz)
			if (b < c.built) continue
			// clustered: thick on the coast and where the second world rises highest, thin elsewhere
			const coastal = 1 - clamp01((n - PLANET.seaLevel) / c.inland)
			const dense = clamp01((b - c.built) / c.spread)
			const odds = c.lit * (0.25 + 0.75 * coastal) * (0.3 + 0.7 * dense)
			const f = c.fine
			const h = hash3(Math.floor(sx * f), Math.floor(ny * f), Math.floor(sz * f))
			if (h > odds) continue
			put(
				d,
				(y * res + x) * 4,
				h < odds * 0.12 ? 'glow' : h < odds * 0.45 ? 'ember' : 'amber'
			)
		}
	}
}

const RAMPS = PLANET.bands.map(([name]) => PLANET.ramps[name])
const EDGES = PLANET.bands.map(([, offset]) => PLANET.seaLevel + offset)
const bandOf = n => {
	const i = EDGES.findIndex(e => n < e)
	return i < 0 ? EDGES.length - 1 : i
}
const CLOUD = RAMPS.length
const SPACE = CLOUD + 1

// The air past the limb: as deep as the sun's side of the globe is lit, inner band out, thinning to a checker.
function paintAir(d, i, x, y, dx, dy, d2, radius, light) {
	const A = EARTH.air
	const out = (Math.sqrt(d2) - 1) * radius
	const toward =
		(dx * light[0] + dy * light[1]) / (Math.hypot(light[0], light[1]) * Math.sqrt(d2))
	const deep = A.night + (A.depth - A.night) * Math.max(0, (toward + A.wrap) / (1 + A.wrap))
	if (out >= deep) return
	// three bands, each seam dithered back into the band before, so the shell grades
	const f = (out / deep) * A.ramp.length
	let band = Math.floor(f)
	if (band > 0 && f - band < A.seam && (f - band) / A.seam < ditherThreshold(x, y)) band--
	band = Math.min(band, A.ramp.length - 1)
	put(d, i, A.ramp[band])
	d[i + 3] = A.alpha
	if (band === A.ramp.length - 1 && ditherThreshold(x, y) > 0.5) d[i + 3] = 0
}

// The key light turned about the view axis to come from where the sun stands over the globe on this
// grid with `lightAt` of the earth shot's pan still to go, so the lit limb faces the sun.
function aimLight(frame, grid) {
	const { planet, star, travel } = EARTH
	const { lightAt } = planet
	const along = (i, side) =>
		(star.at[i] - planet.at[i]) * side +
		travel[i] * lightAt * (star.depth - planet.depth) * grid.height
	const a = Math.atan2(along(1, grid.height), along(0, grid.width))
	const [lx, ly, lz] = frame.light
	const m = Math.hypot(lx, ly)
	const light = [m * Math.cos(a), m * Math.sin(a), lz]
	const hz = lz + 1
	const hl = Math.hypot(light[0], light[1], hz)
	return { ...frame, light, half: [light[0] / hl, light[1] / hl, hz / hl] }
}

// The globe, backlit. Two passes: what each cell is made of (tidied, so coasts stay clean), then the
// light over it, dithered through every ramp step so the crescent fades instead of stacking bands.
function paintPlanet(res, grid) {
	const d = new Uint8ClampedArray(res * res * 4)
	const shader = createPlanetShader({ res, seed: EARTH.planet.seed })
	const sky = createPlanetShader({ res, seed: EARTH.planet.seed + 3 })
	const frame = aimLight(planetFrame(EARTH.planet.spin, EARTH.planet.lightYawDeg * DEG), grid)
	const { light } = frame
	const [lx, ly, lz] = light
	const disc = planetDisc(res)
	const { radius, center } = disc
	const A = EARTH.air
	const D = EARTH.detail
	const sun = toPlanet(lx, ly, lz, disc, frame)
	// fine octaves over the renderer's continents: ragged coasts, islands, cloud wisps
	const ground = (x, y, z) =>
		shader.elevation(x, y, z) +
		D.coast * (shader.fbm(x * D.scale + 7, y * D.scale, z * D.scale, D.octaves) - 0.5)
	const cover = (x, y, z) =>
		sky.elevation(z, y * 1.6, -x) +
		D.wisp * (sky.fbm(z * D.scale, y * D.scale * 1.6, -x * D.scale, D.octaves) - 0.5)
	const eps = D.slopeCells / radius

	const material = new Uint32Array(res * res).fill(SPACE)
	const elev = new Float32Array(res * res)
	const cloudK = new Float32Array(res * res)
	for (let y = 0; y < res; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = 0; x < res; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			if (d2 >= 1) continue
			const [sx, ny, sz] = toPlanet(dx, dy, dz(d2), disc, frame)
			const j = y * res + x
			const n = ground(sx, ny, sz)
			const c = (cover(sx, ny, sz) - EARTH.cloud) / D.cloudEdge
			elev[j] = n
			cloudK[j] = c
			material[j] = c > 0 ? CLOUD : bandOf(n)
		}
	}
	tidySprite({ data: material }, res, res, EARTH.tidyPasses)

	for (let y = 0; y < res; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = 0; x < res; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			const i = (y * res + x) * 4
			if (d2 >= 1) {
				paintAir(d, i, x, y, dx, dy, d2, radius, light)
				continue
			}
			const j = y * res + x
			const z = dz(d2)
			const diff = dx * lx + dy * ly + z * lz
			const n = elev[j]
			const sea = n < PLANET.seaLevel
			// a cloud's thin edge lets the ground through in Bayer order, so decks fray rather than stop
			const cloud = material[j] === CLOUD && cloudK[j] > ditherThreshold(x, y)
			const band = material[j] === CLOUD ? bandOf(n) : material[j]
			const ramp = cloud ? PLANET.cloudRamp : RAMPS[band]
			// the ramp's dark foot is a red twilight, fading past the terminator into the night
			const foot = cloud ? 'slate' : sea ? 'deep' : 'basalt'
			if (diff <= 0) {
				const dusk = (diff + A.twilight) / A.twilight > ditherThreshold(x, y)
				put(d, i, dusk ? foot : sea && !cloud ? 'void' : 'ink')
				continue
			}
			const [sx, ny, sz] = toPlanet(dx, dy, z, disc, frame)
			let v = diff * D.gain + (d2 > A.limb ? A.limbLift : 0)
			if (!cloud) {
				// hillshade: ground falling away toward the sun faces it
				const along = sun[0] * sx + sun[1] * ny + sun[2] * sz
				const tx = sun[0] - along * sx
				const ty = sun[1] - along * ny
				const tz = sun[2] - along * sz
				if (!sea)
					v -=
						(D.hillshade * (ground(sx + tx * eps, ny + ty * eps, sz + tz * eps) - n)) /
						eps
				// a deck up-sun shades the ground under it
				const o = D.shadowOffset
				if (cover(sx + sun[0] * o, ny + sun[1] * o, sz + sun[2] * o) > EARTH.cloud)
					v -= D.shadowDrop
				// sunlight glancing off open water near the bright limb
				if (sea) {
					const h = frame.half
					v +=
						D.glint *
						Math.pow(Math.max(0, dx * h[0] + dy * h[1] + z * h[2]), D.glintPower)
				}
			}
			const step = seamIndex(v, ramp.length, x, y, EARTH.seam)
			put(d, i, step > 0 ? ramp[step] : foot)
		}
	}
	paintCities(d, res, ground, frame)
	return d
}

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

function paintMoon(res) {
	const d = new Uint8ClampedArray(res * res * 4)
	const M = MOON
	const [lx, ly, lz] = EARTH.moon.light
	const ll = Math.hypot(lx, ly, lz)
	const maria = M.maria.map(m => [toVec(m), m[2]])
	const r = res / 2 - 1
	const c = res / 2
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
			let mare = 0
			for (const [v, rad] of maria)
				mare = Math.max(mare, 1 - smoothstep(ramp(angleDeg(p, v) + rag, rad - 2, rad + 2)))
			let ray = 0
			M.craters.forEach((cr, k) => (ray = Math.max(ray, rayLight(p, cr, k))))
			const grain = M.grain * (fbm2(x * 0.7, y * 0.7, 31) - 0.5) * (1 - mare)
			const albedo = Math.min(
				1,
				M.highland + (M.mare - M.highland) * mare + grain + M.ray * ray
			)
			const lit = (dx * lx + dy * ly + z * lz) / ll
			const day = smoothstep(ramp(lit, -0.02, M.terminator)) * (0.8 + 0.2 * Math.max(0, lit))
			const v = albedo * Math.max(day, M.earthshine)
			const step = seamIndex(v, M.ramp.length, x, y, M.seam)
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
	blit(data, width, paintPlanet(P, grid), P, 0, 0)
	blit(data, width, paintMoon(M), M, P, 0)
	return { data, width, height, sizes }
}
