// One intro shot: its fragment program over the art grid, drawn with the shared uniform contract
// declared at the top of shaders/intro/common.glsl.

import quadVert from '../../shaders/flyby/scene.vert.glsl?raw'
import common from '../../shaders/intro/common.glsl?raw'
import { QUAD_VERTICES, bindAttribute, createProgram, uniformLocations } from '../gl.js'

const UNIFORMS = ['uRes', 'uTime', 'uLook', 'uPtr', 'uP', 'uQ', 'uH', 'uMask', 'uSky']
// past the transition's two units, so a shot's sky never collides with them
const SKY_UNIT = 4
const ZERO4 = [0, 0, 0, 0]

export function createIntroPass(gl, quad, frag, chunks = []) {
	const program = createProgram(gl, quadVert, [common, ...chunks, frag].join('\n'))
	const U = uniformLocations(gl, program, UNIFORMS)
	const aP = gl.getAttribLocation(program, 'aP')

	function draw(
		grid,
		{ time, look, ptr, p = ZERO4, q = ZERO4, h = ZERO4, mask = null, sky = null }
	) {
		gl.useProgram(program)
		bindAttribute(gl, quad, aP, 2)
		gl.uniform2f(U.uRes, grid.width, grid.height)
		gl.uniform1f(U.uTime, time)
		gl.uniform2f(U.uLook, look[0], look[1])
		gl.uniform2f(U.uPtr, ptr[0], ptr[1])
		gl.uniform4fv(U.uP, p)
		gl.uniform4fv(U.uQ, q)
		gl.uniform4fv(U.uH, h)
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
	}

	return { draw, release: () => gl.deleteProgram(program) }
}
