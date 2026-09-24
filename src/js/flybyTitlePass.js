// The title plane pass, over the scene: nothing else is ever nearer than it is.

import titleVert from '../shaders/flyby/title.vert.glsl?raw'
import titleFrag from '../shaders/flyby/title.frag.glsl?raw'
import { clamp01, smoothstep } from './math.js'
import { dot, sub } from './vec3.js'
import { TITLE_PLANE, drawTitleCanvas, planeWidth, textureSize } from './flybyTitle.js'
import {
	QUAD_VERTICES,
	UNIT_QUAD,
	bindAttribute,
	createProgram,
	staticBuffer,
	uniformLocations,
} from './gl.js'
import { FADE_CUT, FOCAL, TITLE, TITLE_FADE } from '../constants/flyby.js'

const UNIFORMS = [
	'uCamPos',
	'uRight',
	'uUp',
	'uFwd',
	'uTPos',
	'uTRight',
	'uTUp',
	'uAnchor',
	'uSnap',
	'uFocal',
	'uAspect',
	'uTW',
	'uTH',
	'uFade',
]

// A fractional move gains or loses a pixel per stroke, which is the letters chattering, not gliding.
const snap = (v, n) => (Math.round((v * n) / 2) * 2) / n - v

export function createTitlePass(gl) {
	const program = createProgram(gl, titleVert, titleFrag)
	const U = uniformLocations(gl, program, UNIFORMS)
	const aUV = gl.getAttribLocation(program, 'aUV')
	const quad = staticBuffer(gl, UNIT_QUAD)
	const texture = gl.createTexture()
	let planeW = TITLE.w
	let texSize = null

	function upload() {
		if (!texSize) return
		gl.bindTexture(gl.TEXTURE_2D, texture)
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			drawTitleCanvas(texSize)
		)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	}

	// one texel per art pixel at rest, so the texture follows the grid
	function resize(grid) {
		planeW = planeWidth(grid.width / grid.height)
		const next = textureSize(planeW, grid.height)
		if (texSize && next[0] === texSize[0]) return
		texSize = next
		upload()
	}

	function draw(cam, grid) {
		const trel = sub(TITLE_PLANE.pos, cam.eye)
		const tz = dot(trel, cam.fwd)
		const fade = smoothstep(clamp01((tz - TITLE_FADE.near) / TITLE_FADE.span))
		if (fade <= FADE_CUT) return

		const aspect = grid.width / grid.height
		gl.useProgram(program)
		bindAttribute(gl, quad, aUV, 2)
		gl.activeTexture(gl.TEXTURE0)
		gl.bindTexture(gl.TEXTURE_2D, texture)
		gl.uniform3fv(U.uCamPos, cam.eye)
		gl.uniform3fv(U.uRight, cam.right)
		gl.uniform3fv(U.uUp, cam.up)
		gl.uniform3fv(U.uFwd, cam.fwd)
		gl.uniform3fv(U.uTPos, TITLE_PLANE.pos)
		gl.uniform3fv(U.uTRight, TITLE_PLANE.right)
		gl.uniform3fv(U.uTUp, TITLE_PLANE.up)
		gl.uniform2fv(U.uAnchor, TITLE_PLANE.anchor)
		gl.uniform1f(U.uFocal, FOCAL)
		gl.uniform1f(U.uAspect, aspect)
		gl.uniform1f(U.uTW, planeW)
		gl.uniform1f(U.uTH, (planeW * texSize[1]) / texSize[0])
		gl.uniform1f(U.uFade, fade)
		gl.uniform2f(
			U.uSnap,
			snap((2 * FOCAL * dot(trel, cam.right)) / tz / aspect, grid.width),
			snap((2 * FOCAL * dot(trel, cam.up)) / tz, grid.height)
		)
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
		gl.drawArrays(gl.TRIANGLES, 0, QUAD_VERTICES)
	}

	function release() {
		gl.deleteBuffer(quad)
		gl.deleteTexture(texture)
		gl.deleteProgram(program)
	}

	return { resize, upload, draw, release }
}
