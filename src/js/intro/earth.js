// The Earth from orbit, the title screen's picture (menu.js): the globe, the Moon and the Sun as painted layers
// sliding past each other by their depth, on the flat-layer program.

import raw from '../../shaders/intro/earth.frag.glsl?raw'
import layersChunk from '../../shaders/intro/earthLayers.glsl?raw'
import { EARTH } from '../../constants/intro/earth.js'
import { PLANET } from '../../constants/planet.js'
import { artScale } from './layerCamera.js'
import { paintArt } from './artWorker.js'
import { LAYERS_CHUNK, glslNum, glslVec, sky } from './sky.js'
import { pixelTexture } from '../gl.js'

// the layout, baked: none of it moves except by the pan
const { planet, moon, star } = EARTH
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
].join('\n')

let atlas = null
let painted = ''
let sizes = [0, 0]

// the picture's program and art: setup and release with the canvas, resize repainting on a new grid
export const earth = {
	frag: raw,
	chunks: [LAYERS_CHUNK, layout, layersChunk],
	cellPx: EARTH.cellPx,
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
}

// the painted layers' uniforms (earthLayers.glsl): the planet and Moon sides in art pixels, canvas pixels per
// art pixel
export const earthLayers = grid => ({
	h: [...sizes, artScale(grid), 0],
	mask: atlas,
	sky: sky.texture,
})
