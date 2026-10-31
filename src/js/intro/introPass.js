// One intro shot: its fragment program over the art grid, drawn with the shared uniform contract
// declared at the top of shaders/intro/common.glsl. The program links in the background from start():
// ready() polls it and finish() takes it up, before the first draw. A shot with `edges` (its palette
// chunk) writes cells instead of colours, and the edge pass draws them onto the frame.

import quadVert from '../../shaders/intro/quad.vert.glsl?raw'
import blackFrag from '../../shaders/intro/black.frag.glsl?raw'
import common from '../../shaders/intro/common.glsl?raw'
import { createEdgePass } from './edgePass.js'
import {
	QUAD_VERTICES,
	bindAttribute,
	compileProgram,
	createProgram,
	uniformLocations,
} from '../gl.js'

const UNIFORMS = [
	'uRes',
	'uTime',
	'uLook',
	'uPtr',
	'uP',
	'uQ',
	'uR',
	'uS',
	'uH',
	'uGame',
	'uSuit',
	'uB[0]',
	'uMask',
	'uSky',
]
// past the transition's two units, so a shot's sky never collides with them
const SKY_UNIT = 4
const ZERO4 = [0, 0, 0, 0]

export function createIntroPass(gl, quad, { key, frag, chunks = [], edges = null }) {
	const src = [common, ...chunks, frag].join('\n')
	let link = null
	let program = null
	let U = null
	let aP = -1
	let edgePass = edges && createEdgePass(gl, quad, edges)

	// A shot whose shader or edge pass fails on this GPU plays black rather than taking the intro down
	// with it.
	function finish() {
		try {
			program = link.finish()
			edgePass?.finish()
		} catch (err) {
			console.error(`intro shot ${key}:`, err)
			program = createProgram(gl, quadVert, `${common}\n${blackFrag}`)
			edgePass?.release()
			edgePass = null
		}
		U = uniformLocations(gl, program, UNIFORMS)
		aP = gl.getAttribLocation(program, 'aP')
	}

	function draw(
		grid,
		{
			time,
			look,
			ptr,
			p = ZERO4,
			q = ZERO4,
			r = ZERO4,
			s = ZERO4,
			h = ZERO4,
			g = ZERO4,
			suit = ZERO4,
			b = null,
			mask = null,
			sky = null,
		}
	) {
		edgePass?.begin(grid)
		gl.useProgram(program)
		bindAttribute(gl, quad, aP, 2)
		gl.uniform2f(U.uRes, grid.width, grid.height)
		gl.uniform1f(U.uTime, time)
		gl.uniform2f(U.uLook, look[0], look[1])
		gl.uniform2f(U.uPtr, ptr[0], ptr[1])
		gl.uniform4fv(U.uP, p)
		gl.uniform4fv(U.uQ, q)
		gl.uniform4fv(U.uR, r)
		gl.uniform4fv(U.uS, s)
		gl.uniform4fv(U.uH, h)
		gl.uniform4fv(U.uGame, g)
		gl.uniform4fv(U.uSuit, suit)
		// a shot's own bodies, a vec4 array it declares itself
		if (b) gl.uniform4fv(U.uB, b)
		if (mask) {
			gl.activeTexture(gl.TEXTURE0)
			gl.bindTexture(gl.TEXTURE_2D, mask)
			gl.uniform1i(U.uMask, 0)
		}
		if (sky) {
			gl.activeTexture(gl.TEXTURE0 + SKY_UNIT)
			gl.bindTexture(gl.TEXTURE_2D, sky)
			gl.uniform1i(U.uSky, SKY_UNIT)
			gl.activeTexture(gl.TEXTURE0)
		}
		gl.disable(gl.BLEND)
		gl.drawArrays(gl.TRIANGLES, 0, QUAD_VERTICES)
		edgePass?.end(grid)
	}

	return {
		start() {
			link = compileProgram(gl, quadVert, src)
			edgePass?.start()
		},
		ready: () => link.ready() && (edgePass?.ready() ?? true),
		finish,
		draw,
		release() {
			gl.deleteProgram(program)
			edgePass?.release()
		},
	}
}
