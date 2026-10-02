// The earth shot's layers, painted once per grid into one atlas: the globe at (0, 0), the Moon beside
// it. The stars are the intro's shared tile (js/intro/sky.js). The shader only slides them, so every pixel stays where it was put.

import { EARTH } from '../../constants/intro/earth.js'
import { PALETTE } from '../../constants/palette.js'
import { PLANET } from '../../constants/planet.js'
import { createPlanetShader, planetDisc, planetFrame, planetWorld } from '../planetShader.js'
import { ditherIndex, ditherThreshold } from '../pixelNoise.js'
import { tidySprite } from '../ridge.js'

const DEG = Math.PI / 180
const even = v => 2 * Math.ceil(v / 2)

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

// The night side's cities: the globe's own elevation says where land is, a second world's where it is built.
function paintCities(d, res, shader, frame) {
	const { radius, center, cosT, sinT } = planetDisc(res)
	const { cosS, sinS, light } = frame
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
			// the renderer's own turn into planet space, so the lights sit on its continents
			const ny = dy * cosT - dz * sinT
			const nz = dy * sinT + dz * cosT
			const sx = dx * cosS + nz * sinS
			const sz = -dx * sinS + nz * cosS
			if (shader.elevation(sx, ny, sz) < PLANET.seaLevel) continue
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

// A step on a ramp of `n`, rounded, dithered only across a narrow seam: hard bands, never a checker field.
function seamStep(v, n, x, y) {
	const g = Math.max(0, Math.min(1, v)) * (n - 1)
	const i = Math.floor(g)
	const f = (g - i - 0.5) / EARTH.seam + 0.5
	return Math.min(n - 1, i + (f > ditherThreshold(x, y) ? 1 : 0))
}

const RAMPS = PLANET.bands.map(([name]) => PLANET.ramps[name])
const EDGES = PLANET.bands.map(([, offset]) => PLANET.seaLevel + offset)
const bandOf = n => {
	const i = EDGES.findIndex(e => n < e)
	return i < 0 ? EDGES.length - 1 : i
}

// The globe, backlit: hard lit bands across the crescent, a red twilight past the terminator, solid
// cloud shapes, and an atmosphere a few cells deep, thickest toward the sun.
function paintPlanet(res) {
	const d = new Uint8ClampedArray(res * res * 4)
	const shader = createPlanetShader({ res, seed: EARTH.planet.seed })
	const sky = createPlanetShader({ res, seed: EARTH.planet.seed + 3 })
	const yaw = EARTH.planet.lightYawDeg * DEG
	const frame = planetFrame(EARTH.planet.spin, yaw)
	const { cosS, sinS, light } = frame
	const [lx, ly, lz] = light
	const { radius, center, cosT, sinT } = planetDisc(res)
	const A = EARTH.air
	const lxy = Math.hypot(lx, ly) || 1
	for (let y = 0; y < res; y++) {
		const dy = (y + 0.5 - center) / radius
		for (let x = 0; x < res; x++) {
			const dx = (x + 0.5 - center) / radius
			const d2 = dx * dx + dy * dy
			const i = (y * res + x) * 4
			if (d2 >= 1) {
				// the air: cells past the limb, as deep as the sun's side of the globe is lit
				const out = (Math.sqrt(d2) - 1) * radius
				const toward = (dx * lx + dy * ly) / (lxy * Math.sqrt(d2))
				const deep =
					A.night + (A.depth - A.night) * Math.max(0, (toward + A.wrap) / (1 + A.wrap))
				if (out < deep) {
					const k = out / deep
					put(d, i, k < 0.34 ? A.ramp[0] : k < 0.67 ? A.ramp[1] : A.ramp[2])
					// the outermost band is a checker, so the air thins rather than stops
					if (k >= 0.67 && ditherThreshold(x, y) > 0.5) d[i + 3] = 0
				}
				continue
			}
			const dz = Math.sqrt(1 - d2)
			const diff = dx * lx + dy * ly + dz * lz
			// the renderer's own turn into planet space
			const ny = dy * cosT - dz * sinT
			const nz = dy * sinT + dz * cosT
			const sx = dx * cosS + nz * sinS
			const sz = -dx * sinS + nz * cosS
			const n = shader.elevation(sx, ny, sz)
			const band = bandOf(n)
			const cloud = sky.elevation(sz, ny * 1.6, -sx) > EARTH.cloud
			const ramp = cloud ? PLANET.cloudRamp : RAMPS[band]
			// relief tips the catch, so the bands follow the ground; the limb catches a step more
			const relief = cloud ? 0 : (n - PLANET.seaLevel) * PLANET.relief
			const rim = d2 > A.limb ? A.limbLift : 0
			const step =
				diff > 0 ? seamStep(diff * 1.15 + relief * 0.3 + rim, ramp.length, x, y) : 0
			let name = ramp[step]
			// the ramp's dark foot: red twilight just past the terminator, black beyond it
			if (step === 0)
				name =
					diff > -A.twilight
						? cloud
							? 'slate'
							: n < PLANET.seaLevel
								? 'deep'
								: 'basalt'
						: n < PLANET.seaLevel && !cloud
							? 'void'
							: 'ink'
			put(d, i, name)
		}
	}
	paintCities(d, res, shader, frame)
	tidySprite({ data: d }, res, res, EARTH.tidyPasses)
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
