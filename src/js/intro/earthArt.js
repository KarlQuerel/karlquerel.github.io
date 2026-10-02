// The earth shot's layers, painted once per grid into one atlas: the globe at (0, 0), the Moon beside
// it. The stars are the intro's shared tile (js/intro/sky.js). The shader only slides them, so every pixel stays where it was put.

import { EARTH } from '../../constants/intro/earth.js'
import { PALETTE } from '../../constants/palette.js'
import { PLANET } from '../../constants/planet.js'
import { createPlanetShader, planetDisc, planetFrame, planetWorld } from '../planetShader.js'
import { ditherIndex } from '../pixelNoise.js'
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

function paintPlanet(res) {
	const d = new Uint8ClampedArray(res * res * 4)
	const shader = createPlanetShader({ res, seed: EARTH.planet.seed })
	const yaw = EARTH.planet.lightYawDeg * DEG
	shader.draw(d, EARTH.planet.spin, yaw, 0)
	paintCities(d, res, shader, planetFrame(EARTH.planet.spin, yaw))
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
