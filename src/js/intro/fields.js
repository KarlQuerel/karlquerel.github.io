import raw from '../../shaders/intro/fields.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { FIELDS } from '../../constants/intro/fields.js'
import { pixelTexture } from '../gl.js'
import { ramp, smoothstep } from '../math.js'
import { paintFieldsAtlas } from './fieldsArt.js'
import { arrive } from './layerCamera.js'
import { INTRO_TRANSITIONS } from '../../constants/intro/transitions.js'
import { LAYERS_CHUNK, glslNum, glslVec } from './sky.js'

const { ground: G, farm, fence, embers } = FIELDS
// the layout, baked: none of it moves except by the truck
const layout = [
	`const float HORIZON = ${glslNum(FIELDS.horizon)};`,
	`const float VANISH = ${glslNum(FIELDS.vanish)};`,
	`const float GROUND_NEAR = ${glslNum(G.near)};`,
	`const float EYE = ${glslNum(G.eye)};`,
	`const float FOCAL = ${glslNum(G.focal)};`,
	`const vec4 DEPTHS = ${glslVec([FIELDS.sky.depth, farm.depth, FIELDS.harvester.depth, FIELDS.tree.depth])};`,
	`const vec3 WINDMILL = ${glslVec([farm.windmill.x, farm.windmill.h, farm.windmill.blade])};`,
	`const vec4 FENCE = ${glslVec([fence.x, ...fence.z, fence.h])};`,
	`const int FENCE_POSTS = ${fence.count};`,
	`const int EMBERS = ${embers.count};`,
	`const vec3 EMBER_SPEED = ${glslVec([...embers.rise, embers.ash])};`,
]
const frag = raw.replace('__LAYOUT__', layout.join('\n'))

let atlas = null
let painted = ''
let margin = 0

export const fields = {
	key: 'fields',
	frag,
	chunks: [LAYERS_CHUNK],
	cellPx: FIELDS.cellPx,
	duration: FIELDS.duration,
	card: { at: FIELDS.cardAt, text: INTRO_CARDS.burning },
	setup(gl) {
		atlas = pixelTexture(gl)
		painted = ''
	},
	// painting is the expensive part: only a grid of a new size repaints
	resize(gl, grid) {
		const key = `${grid.width}x${grid.height}`
		if (key === painted) return
		painted = key
		const art = paintFieldsAtlas(grid)
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
		margin = art.margin
	},
	release(gl) {
		gl.deleteTexture(atlas)
		atlas = null
		painted = ''
	},
	// uP.x = the truck in cells at depth 1, uP.z = seconds; uH.x = the layers' margin
	params(t, io, _gl, grid) {
		const move = 0.5 - smoothstep(ramp(t, 0, FIELDS.duration))
		const carry = arrive(t, INTRO_TRANSITIONS.fields.dur, FIELDS.carry)
		return {
			p: [
				(move * FIELDS.truck + carry) * grid.height + io.look[0] * FIELDS.lookCells,
				0,
				t,
				0,
			],
			h: [margin, 0, 0, 0],
			mask: atlas,
		}
	},
}
