// The earth shot's layers, painted once per grid into one atlas: the globe at (0, 0), the Moon beside
// it. The stars are the intro's shared tile (js/intro/sky.js). The shader only slides them, so every pixel stays where it was put.

import { EARTH } from '../../constants/intro/earth.js'
import { PALETTE } from '../../constants/palette.js'
import { PLANET } from '../../constants/planet.js'
import { createPlanetShader, planetDisc, planetFrame, planetWorld } from '../planetShader.js'
import { ditherIndex, ditherThreshold, seamIndex } from '../pixelNoise.js'
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
			if (ground(sx, ny, sz) < PLANET.seaLevel) continue
			if (built.elevation(sx, ny, sz) < c.built) continue
			const f = c.fine
			const h = hash3(Math.floor(sx * f), Math.floor(ny * f), Math.floor(sz * f))
			if (h > c.lit) continue
			put(
				d,
				(y * res + x) * 4,
				h < c.lit * 0.15 ? 'glow' : h < c.lit * 0.5 ? 'ember' : 'amber'
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
	const k = out / deep
	put(d, i, k < 0.34 ? A.ramp[0] : k < 0.67 ? A.ramp[1] : A.ramp[2])
	if (k >= 0.67 && ditherThreshold(x, y) > 0.5) d[i + 3] = 0
}

// The globe, backlit. Two passes: what each cell is made of (tidied, so coasts stay clean), then the
// light over it, dithered through every ramp step so the crescent fades instead of stacking bands.
function paintPlanet(res) {
	const d = new Uint8ClampedArray(res * res * 4)
	const shader = createPlanetShader({ res, seed: EARTH.planet.seed })
	const sky = createPlanetShader({ res, seed: EARTH.planet.seed + 3 })
	const frame = planetFrame(EARTH.planet.spin, EARTH.planet.lightYawDeg * DEG)
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

// The Moon: the same light, its maria the renderer's basins, earthshine keeping the night side off black.
const MOON_RAMP = ['slate', 'ash', 'stone', 'bone', 'chalk', 'cream']
function paintMoon(res, light) {
	const d = new Uint8ClampedArray(res * res * 4)
	const ground = createPlanetShader({ res, seed: EARTH.moon.seed })
	const r = res / 2 - 1
	const c = res / 2
	for (let y = 0; y < res; y++) {
		const dy = (y + 0.5 - c) / r
		for (let x = 0; x < res; x++) {
			const dx = (x + 0.5 - c) / r
			const d2 = dx * dx + dy * dy
			if (d2 >= 1) continue
			const dz = Math.sqrt(1 - d2)
			const lit = Math.max(0, dx * light[0] + dy * light[1] + dz * light[2])
			const n = ground.elevation(dx, dy, dz)
			const mare = n < PLANET.seaLevel ? 1 : 0
			const step = ditherIndex(
				lit * (1 + (n - PLANET.seaLevel) * 0.8),
				MOON_RAMP.length,
				x,
				y
			)
			put(d, (y * res + x) * 4, MOON_RAMP[Math.max(mare ? 0 : 1, step - mare)])
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
	const yaw = EARTH.planet.lightYawDeg * DEG
	blit(data, width, paintPlanet(P), P, 0, 0)
	blit(data, width, paintMoon(M, planetFrame(0, yaw).light), M, P, 0)
	return { data, width, height, sizes }
}
