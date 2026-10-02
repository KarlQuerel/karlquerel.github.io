import raw from '../../shaders/intro/earth.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { PLANET } from '../../constants/planet.js'
import { earthEase, skyPan } from './layerCamera.js'
import { paintEarthAtlas } from './earthArt.js'
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
]
const frag = raw.replace('__LAYOUT__', layout.join('\n'))

let atlas = null
let painted = ''
let sizes = [0, 0]

export const earth = {
	key: 'earth',
	frag,
	chunks: [LAYERS_CHUNK],
	cellPx: EARTH.cellPx,
	duration: EARTH.duration,
	card: { at: EARTH.cardAt, text: INTRO_CARDS.dying },
	setup(gl) {
		atlas = pixelTexture(gl)
		painted = ''
	},
	// painting is the expensive part: only a grid of a new size repaints
	resize(gl, grid) {
		const key = `${grid.width}x${grid.height}`
		if (key === painted) return
		painted = key
		const art = paintEarthAtlas(grid)
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
	// uP = the pan in cells (x right, y down); uH = the planet and Moon sides
	params: (t, io, _gl, grid) => {
		const k = 1 - earthEase(t / EARTH.duration)
		const [tx, ty] = EARTH.travel
		return {
			p: [...skyPan(grid, io, [tx * k, ty * k]), 0, 0],
			h: [...sizes, 0, 0],
			mask: atlas,
			sky: sky.texture,
		}
	},
}
