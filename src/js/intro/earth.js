import raw from '../../shaders/intro/earth.frag.glsl?raw'
import layersChunk from '../../shaders/intro/earthLayers.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { PLANET } from '../../constants/planet.js'
import { artScale, earthEase, skyPan } from './layerCamera.js'
import { clamp01, ramp, smootherstep, smoothstep } from '../math.js'
import { paintArt } from './artWorker.js'
import { LAYERS_CHUNK, glslNum, glslVec, sky } from './sky.js'
import { pixelTexture } from '../gl.js'

// the layout, baked: none of it moves except by the pan (the sun shot flies on from it)
const { planet, moon, star, air } = EARTH
const layout = [
	`const vec2 PLANET_AT = ${glslVec(planet.at)};`,
	`const float PLANET_DEPTH = ${glslNum(planet.depth)};`,
	`const float DISC = ${glslNum(PLANET.discRadius)};`,
	`const vec2 MOON_AT = ${glslVec(moon.at)};`,
	`const float MOON_DEPTH = ${glslNum(moon.depth)};`,
	`const vec2 SUN_AT = ${glslVec(star.at)};`,
	`const float SUN_R = ${glslNum(star.radius)};`,
	`const float SUN_DEPTH = ${glslNum(star.depth)};`,
	`const float SUN_AGE = ${glslNum(star.age)};`,
	`const float AIR_ALPHA = ${glslNum(air.alpha / 255)};`,
].join('\n')
// what a shot drawing the globe and the Moon puts before its fragment: the layout, then their reader
export const EARTH_CHUNKS = [LAYERS_CHUNK, layout, layersChunk]

let atlas = null
let painted = ''
let sizes = [0, 0]

export const earth = {
	key: 'earth',
	frag: raw,
	chunks: EARTH_CHUNKS,
	cellPx: EARTH.cellPx,
	duration: EARTH.duration,
	card: { at: EARTH.cardAt, text: INTRO_CARDS.dying },
	setup(gl) {
		atlas = pixelTexture(gl)
		painted = ''
	},
	// painting is the expensive part, and the painters' thread's: only a new size of art grid repaints
	async resize(gl, grid) {
		const a = artScale(grid)
		const artGrid = { width: Math.ceil(grid.width / a), height: Math.ceil(grid.height / a) }
		const key = `${artGrid.width}x${artGrid.height}`
		if (key === painted) return
		painted = key
		const art = await paintArt('earth', artGrid)
		// a newer grid, or the release, got there first
		if (!art || key !== painted || !atlas) return
		gl.bindTexture(gl.TEXTURE_2D, atlas)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			art.width,
			art.height,
			0,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			art.data
		)
		sizes = [art.sizes.planet, art.sizes.moon]
	},
	release(gl) {
		gl.deleteTexture(atlas)
		atlas = null
		painted = ''
	},
	// uP = the pan in canvas pixels (x right, y down), the star's clock; uQ.y = how far the sun is still
	// held back; uH = the planet and Moon sides in art pixels, canvas pixels per art pixel
	params: (t, io, _gl, grid) => ({
		p: [...earthPan(t, io, grid), t, 0],
		q: [
			0,
			1 - smoothstep(ramp(t, EARTH.arrive.tilt - EARTH.arrive.glow, EARTH.arrive.tilt)),
			0,
			0,
		],
		...earthLayers(grid),
	}),
}

// The pan at the earth shot's second t: the tilt down onto the Earth, then the sweep; past its end it
// keeps drifting, which the sun shot carries on.
export function earthPan(t, io, grid) {
	const { arrive, panAt, duration, travel } = EARTH
	const tilt = arrive.from * (1 - smootherstep(clamp01(t / arrive.tilt)))
	const k = 1 - earthEase(Math.max(0, t - panAt) / (duration - panAt))
	return skyPan(grid, io, [travel[0] * k, travel[1] * k + tilt])
}

// where the pan stands before the tilt: the year shot's sky rests here
export const earthOpening = () => [EARTH.travel[0], EARTH.travel[1] + EARTH.arrive.from]

// the painted layers' uniforms (earthLayers.glsl), for any shot that shows them
export const earthLayers = grid => ({
	h: [...sizes, artScale(grid), 0],
	mask: atlas,
	sky: sky.texture,
})
