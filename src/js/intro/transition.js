// The transition between two shots: two render targets on the art grid and the pass that mixes them.

import quadVert from '../../shaders/flyby/scene.vert.glsl?raw'
import common from '../../shaders/intro/common.glsl?raw'
import frag from '../../shaders/intro/transition.frag.glsl?raw'
import {
	QUAD_VERTICES,
	bindAttribute,
	createProgram,
	pixelTexture,
	uniformLocations,
} from '../gl.js'
import { LAYERS_CHUNK } from './sky.js'

// units 1 and 2: unit 0 belongs to a shot's own mask
const UNIT_A = 1
const UNIT_B = 2

function target(gl, width, height) {
	const tex = pixelTexture(gl)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
	const fbo = gl.createFramebuffer()
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
	gl.bindFramebuffer(gl.FRAMEBUFFER, null)
	return { tex, fbo }
}

export function createTransition(gl, quad) {
	const program = createProgram(gl, quadVert, `${common}\n${LAYERS_CHUNK}\n${frag}`)
	const U = uniformLocations(gl, program, ['uRes', 'uP', 'uA', 'uB'])
	const aP = gl.getAttribLocation(program, 'aP')
	let targets = []
	let size = [0, 0]

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
		targets = [target(gl, ...size), target(gl, ...size)]
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

	return { draw, release }
}
