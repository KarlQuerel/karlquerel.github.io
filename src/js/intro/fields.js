import raw from '../../shaders/intro/fields.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { FIELDS } from '../../constants/intro/fields.js'
import { pixelTexture } from '../gl.js'
import { ramp, smoothstep } from '../math.js'
import { paintFieldsAtlas } from './fieldsArt.js'
import { arrive } from './layerCamera.js'
import { INTRO_TRANSITIONS } from '../../constants/intro/transitions.js'
import { LAYERS_CHUNK, glslNum, glslVec } from './sky.js'

const { ground: G, farm, fence, embers, sky, smoke } = FIELDS
// the layout, baked: none of it moves except by the truck and the rise
const layout = [
	`const float HORIZON = ${glslNum(FIELDS.horizon)};`,
	`const float VANISH = ${glslNum(FIELDS.vanish)};`,
	`const float GROUND_NEAR = ${glslNum(G.near)};`,
	`const float EYE = ${glslNum(G.eye)};`,
	`const float FOCAL = ${glslNum(G.focal)};`,
	`const vec2 CHANNEL = ${glslVec([G.chanX, G.chanW])};`,
	`const vec4 DEPTHS = ${glslVec([sky.depth, farm.depth, FIELDS.harvester.depth, FIELDS.tree.depth])};`,
	`const vec2 DUSK = ${glslVec([sky.top, sky.low])};`,
	`const vec2 SUN_AT = ${glslVec(sky.sun.at)};`,
	`const float NEAR_RISE = ${glslNum(FIELDS.nearRise)};`,
	`const vec3 WINDMILL = ${glslVec([farm.windmill.x, farm.windmill.h, farm.windmill.blade])};`,
	`const vec4 FENCE = ${glslVec([fence.x, ...fence.z, fence.h])};`,
	`const int FENCE_POSTS = ${fence.count};`,
	`const int EMBERS = ${embers.count};`,
	`const vec3 EMBER_SPEED = ${glslVec([...embers.rise, embers.ash])};`,
	`const float SMOKE_CLIMB = ${glslNum(smoke.climb)};`,
	`const float CHAR = ${glslNum(FIELDS.char)};`,
]
// the lists, unrolled into calls: GLSL ES 1.00 has no constant arrays
const calls = (name, rows) =>
	rows.map((v, i) => `  col = ${name}(col, cell, ${glslVec(v)}, ${i}.0);`)
const frag = raw
	.replace('__LAYOUT__', layout.join('\n'))
	.replace(
		'__SMOKE__',
		calls(
			'plume',
			smoke.columns.map(c => [c.x, c.lean, c.foot, c.grow])
		).join('\n')
	)
	.replace(
		'__FIRES__',
		// far to near, so a nearer front stands in front
		calls(
			'front',
			FIELDS.fires.map(f => [f.z, f.from, f.to, f.h]).sort((a, b) => b[0] - a[0])
		).join('\n')
	)

let atlas = null
let painted = ''
let margin = 0

// the truck in cells at depth 1, eased across the shot
const truck = (t, grid) =>
	(0.5 - smoothstep(ramp(t, 0, FIELDS.duration))) * FIELDS.truck * grid.height

// the giant's radius in cells, capped so a portrait frame holds it
const sunRadius = grid =>
	Math.min(sky.sun.radius, (grid.width / grid.height) * sky.sun.fitWidth) * grid.height

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
	// uP = the truck in cells at depth 1, how far the land still sits below its place (cells), seconds,
	// the sun's clock; uQ = the sun's radius and its slide in cells; uH.x = the layers' margin
	params(t, io, _gl, grid) {
		const carry = arrive(t, INTRO_TRANSITIONS.fields.dur, FIELDS.carry) * grid.height
		const x = truck(t, grid) + carry + io.look[0] * FIELDS.lookCells
		const u = ramp(t, ...FIELDS.rise)
		const lift = FIELDS.drop * grid.height * (1 - u * u * u * (u * (u * 6 - 15) + 10))
		// the sun slides by the sky's depth, from where it stood at the open
		const slide = (x - truck(0, grid) - FIELDS.carry * grid.height) * sky.depth
		return {
			p: [x, lift, t, t],
			q: [sunRadius(grid), slide, 0, 0],
			h: [margin, 0, 0, 0],
			mask: atlas,
		}
	},
}
