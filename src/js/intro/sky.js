// What every flat-layer shot shares: the palette as GLSL constants, and one painted star tile. Each
// star's alpha is the moment it rises (1..255), so a shot can bring the field up star by star.

import layers from '../../shaders/intro/layers.glsl?raw'
import { PALETTE } from '../../constants/palette.js'
import { SKY } from '../../constants/intro/sky.js'
import { STAR } from '../../constants/intro/star.js'
import { pixelTexture } from '../gl.js'
import { hash1 } from '../pixelNoise.js'

export const glslNum = v => v.toFixed(5)
export const glslVec = v => `vec${v.length}(${v.map(glslNum).join(', ')})`

// every palette entry as a named constant, so no shader copies a hex
const palette = Object.entries(PALETTE).map(
	([name, rgb]) => `const vec3 ${name.toUpperCase()} = ${glslVec(rgb.map(c => c / 255))};`
)
// the nearest palette colour to any colour, weighted toward green the way the eye ranks brightness
const snap = [
	'vec3 nearestPalette(vec3 c){',
	'  vec3 best = VOID; float bd = 1e9; vec3 d;',
	...Object.keys(PALETTE).map(
		name =>
			`  d = (c - ${name.toUpperCase()})*vec3(0.55, 0.77, 0.33); if (dot(d, d) < bd){ bd = dot(d, d); best = ${name.toUpperCase()}; }`
	),
	'  return best;',
	'}',
]
const skyConsts = [
	`const float SKY_TILE = ${glslNum(SKY.tile)};`,
	`const vec2 SKY_DEPTHS = ${glslVec(SKY.depths)};`,
	`const float GALAXY_DEPTH = ${glslNum(SKY.galaxyDepth)};`,
	`const float STAR_CELLS = ${glslNum(STAR.cells)};`,
	`const float STAR_BOIL = ${glslNum(STAR.boil)};`,
	`const float STAR_SPIN = ${glslNum(STAR.spin)};`,
	`const float STAR_SEAM = ${glslNum(STAR.seam)};`,
	`const float STAR_REACH = ${glslNum(STAR.reach)};`,
]
// the chunk a flat-layer shot puts before its own fragment source
export const LAYERS_CHUNK = [...palette, ...snap, ...skyConsts, layers].join('\n')

const STAR_TIERS = ['zinc', 'frost', 'rime', 'pewter', 'silver']

// Single-pixel stars on a wrapping tile; the brightest carry a dimmer cross that rises with them.
function paintStars(res) {
	const d = new Uint8ClampedArray(res * res * 4)
	const count = Math.round(res * res * SKY.density)
	const put = (x, y, name, rise) => {
		const i = (((y + res) % res) * res + ((x + res) % res)) * 4
		const [r, g, b] = PALETTE[name]
		d.set([r, g, b, rise], i)
	}
	for (let s = 0; s < count; s++) {
		const x = Math.floor(hash1(s, 11) * res)
		const y = Math.floor(hash1(s, 23) * res)
		const h = hash1(s, 37)
		// the brightest come up first
		const rise = 1 + Math.floor(Math.min(1, h + hash1(s, 41) * 0.5) * 254)
		if (h < SKY.bright) {
			// the bright ones lead, but not all on the same frame
			const lead = 1 + Math.floor(hash1(s, 53) * 60)
			put(x, y, 'star', lead)
			for (const [ox, oy] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			])
				put(x + ox, y + oy, 'frost', lead)
		} else put(x, y, STAR_TIERS[Math.floor(h * STAR_TIERS.length)], rise)
	}
	return d
}

export const sky = {
	texture: null,
	setup(gl) {
		this.texture = pixelTexture(gl)
		const res = SKY.tile
		const data = paintStars(res)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, res, res, 0, gl.RGBA, gl.UNSIGNED_BYTE, data)
	},
	release(gl) {
		gl.deleteTexture(this.texture)
		this.texture = null
	},
}
