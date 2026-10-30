// The edge pass (shaders/intro/edges.frag.glsl): an edged shot draws its cells into a target on the art
// grid between begin() and end(), and end() draws them onto the frame that was bound, outlined and glinted.

import quadVert from '../../shaders/intro/quad.vert.glsl?raw'
import common from '../../shaders/intro/common.glsl?raw'
import cells from '../../shaders/intro/edgeCells.glsl?raw'
import frag from '../../shaders/intro/edges.frag.glsl?raw'
import {
	QUAD_VERTICES,
	bindAttribute,
	compileProgram,
	renderTarget,
	uniformLocations,
} from '../gl.js'

// clear of the mask's unit 0, the transition's 1 and 2 and the sky's 4
const CELLS_UNIT = 3

// palette: the shot's paletteSnap chunk, so an index reads back as the colour it was snapped to
export function createEdgePass(gl, quad, palette) {
	const src = [common, palette, cells, frag].join('\n')
	let link = null
	let program = null
	let U = null
	let aP = -1
	let target = null
	let frame = null

	function finish() {
		program = link.finish()
		U = uniformLocations(gl, program, ['uRes', 'uG'])
		aP = gl.getAttribLocation(program, 'aP')
	}

	function drop() {
		if (!target) return
		gl.deleteFramebuffer(target.fbo)
		gl.deleteTexture(target.tex)
		target = null
	}

	// sized to the grid on demand; the frame bound now is the one end() draws back onto
	function begin(grid) {
		frame = gl.getParameter(gl.FRAMEBUFFER_BINDING)
		if (target?.width !== grid.width || target?.height !== grid.height) {
			drop()
			target = {
				...renderTarget(gl, grid.width, grid.height),
				width: grid.width,
				height: grid.height,
			}
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
	}

	function end(grid) {
		gl.bindFramebuffer(gl.FRAMEBUFFER, frame)
		gl.useProgram(program)
		bindAttribute(gl, quad, aP, 2)
		gl.uniform2f(U.uRes, grid.width, grid.height)
		gl.activeTexture(gl.TEXTURE0 + CELLS_UNIT)
		gl.bindTexture(gl.TEXTURE_2D, target.tex)
		gl.uniform1i(U.uG, CELLS_UNIT)
		gl.activeTexture(gl.TEXTURE0)
		gl.disable(gl.BLEND)
		gl.drawArrays(gl.TRIANGLES, 0, QUAD_VERTICES)
	}

	return {
		start: () => (link = compileProgram(gl, quadVert, src)),
		ready: () => link.ready(),
		finish,
		begin,
		end,
		release() {
			drop()
			gl.deleteProgram(program)
		},
	}
}
