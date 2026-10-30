// The transition between two shots: two render targets on the art grid and the pass that mixes them.

import quadVert from '../../shaders/intro/quad.vert.glsl?raw'
import common from '../../shaders/intro/common.glsl?raw'
import frag from '../../shaders/intro/transition.frag.glsl?raw'
import {
	QUAD_VERTICES,
	bindAttribute,
	compileProgram,
	renderTarget,
	uniformLocations,
} from '../gl.js'
import { LAYERS_CHUNK } from './sky.js'

// units 1 and 2: unit 0 belongs to a shot's own mask
const UNIT_A = 1
const UNIT_B = 2

export function createTransition(gl, quad) {
	const src = `${common}\n${LAYERS_CHUNK}\n${frag}`
	let link = null
	let program = null
	let U = null
	let aP = -1
	let targets = []
	let size = [0, 0]

	// the program links in the background from start(): ready() polls it, finish() takes it up before a draw
	function finish() {
		program = link.finish()
		U = uniformLocations(gl, program, ['uRes', 'uP', 'uA', 'uB'])
		aP = gl.getAttribLocation(program, 'aP')
	}

	function drop() {
		for (const t of targets) {
			gl.deleteFramebuffer(t.fbo)
			gl.deleteTexture(t.tex)
		}
		targets = []
	}

	// sized lazily, so a resize mid-transition costs one reallocation and nothing when idle
	function ensure(grid) {
		if (size[0] === grid.width && size[1] === grid.height && targets.length) return
		drop()
		size = [grid.width, grid.height]
		targets = [renderTarget(gl, ...size), renderTarget(gl, ...size)]
	}

	// draws `drawA` and `drawB` into the two targets, then mixes them onto the canvas
	function draw(grid, progress, kind, drawA, drawB) {
		ensure(grid)
		for (const [t, fn] of [
			[targets[0], drawA],
			[targets[1], drawB],
		]) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo)
			fn()
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.useProgram(program)
		bindAttribute(gl, quad, aP, 2)
		gl.uniform2f(U.uRes, grid.width, grid.height)
		gl.uniform4f(U.uP, progress, kind, 0, 0)
		targets.forEach((t, i) => {
			gl.activeTexture(gl.TEXTURE0 + (i ? UNIT_B : UNIT_A))
			gl.bindTexture(gl.TEXTURE_2D, t.tex)
		})
		gl.uniform1i(U.uA, UNIT_A)
		gl.uniform1i(U.uB, UNIT_B)
		gl.activeTexture(gl.TEXTURE0)
		gl.disable(gl.BLEND)
		gl.drawArrays(gl.TRIANGLES, 0, QUAD_VERTICES)
	}

	function release() {
		drop()
		gl.deleteProgram(program)
	}

	return {
		start: () => (link = compileProgram(gl, quadVert, src)),
		ready: () => link.ready(),
		finish,
		draw,
		release,
	}
}
