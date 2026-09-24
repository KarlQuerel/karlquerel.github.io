// The raymarched scene pass: bodies, corridor rocks and the belt, all keyed on scroll.

import sceneVert from '../shaders/flyby/scene.vert.glsl?raw'
import sceneFrag from '../shaders/flyby/scene.frag.glsl?raw'
import { buildBelt } from './flybyBelt.js'
import { bodyAt } from './flybyPath.js'
import {
	FULLSCREEN_QUAD,
	QUAD_VERTICES,
	bindAttribute,
	createProgram,
	staticBuffer,
	uniformLocations,
} from './gl.js'
import {
	BELT_MAX,
	BELT_SPIN,
	BELT_UNIFORM_BUDGET,
	BODIES,
	FOCAL,
	RING_NORMAL,
	ROCKS,
	SUN,
} from '../constants/flyby.js'

const UNIFORMS = [
	'uRes',
	'uCamPos',
	'uRight',
	'uUp',
	'uFwd',
	'uFocal',
	'uEntry',
	'uProg',
	'uLook',
	'uSun',
	'uRingN',
	'uB[0]',
	'uBP[0]',
	'uRock[0]',
	'uRockSpin[0]',
	'uBelt[0]',
	'uBeltSpin',
]

const TURN = Math.PI * 2

// How many belt rocks this GPU can afford; see BELT_UNIFORM_BUDGET.
export const beltCountFor = gl =>
	Math.max(
		0,
		Math.min(BELT_MAX, gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) - BELT_UNIFORM_BUDGET)
	)

export function createScenePass(gl, beltCount) {
	// a zero-length GLSL array does not compile; an empty slot is skipped by its zero radius
	const program = createProgram(
		gl,
		sceneVert,
		sceneFrag.replace('__BELT_COUNT__', String(Math.max(1, beltCount)))
	)
	const quad = staticBuffer(gl, FULLSCREEN_QUAD)
	const U = uniformLocations(gl, program, UNIFORMS)
	const aP = gl.getAttribLocation(program, 'aP')

	const bodies = new Float32Array(BODIES.length * 4)
	const bodyParams = new Float32Array(BODIES.length * 4)
	const rocks = new Float32Array(ROCKS.length * 4)
	const rockSpin = new Float32Array(ROCKS.length * 4)
	BODIES.forEach((b, i) => {
		bodies.set([...bodyAt(b, 0), b.r], i * 4)
		bodyParams.set([b.pid, 0, b.ring[0], b.ring[1]], i * 4)
	})
	if (beltCount) {
		gl.useProgram(program)
		gl.uniform4fv(U.uBelt, buildBelt(beltCount))
	}

	function draw(cam, p, lookX, lookY, grid) {
		// spins accumulate with scroll, never on a clock, and so does the shepherd's arc
		BODIES.forEach((b, i) => {
			bodyParams[i * 4 + 1] = b.spin * p * TURN
			if (b.orbit) bodies.set(bodyAt(b, p), i * 4)
		})
		// No range gate: culling by distance made them wink in and out. Two bounding spheres cost little.
		ROCKS.forEach((r, i) => {
			rocks.set(r.c, i * 4)
			rocks[i * 4 + 3] = r.r
			const a = r.spin * p * TURN
			const t = r.tumble * p * TURN
			rockSpin.set([Math.cos(a), Math.sin(a), Math.cos(t), Math.sin(t)], i * 4)
		})

		gl.useProgram(program)
		bindAttribute(gl, quad, aP, 2)
		gl.uniform2f(U.uRes, grid.width, grid.height)
		gl.uniform3fv(U.uCamPos, cam.eye)
		gl.uniform3fv(U.uRight, cam.right)
		gl.uniform3fv(U.uUp, cam.up)
		gl.uniform3fv(U.uFwd, cam.fwd)
		gl.uniform1f(U.uFocal, FOCAL)
		gl.uniform1f(U.uEntry, cam.entry)
		gl.uniform1f(U.uProg, p)
		gl.uniform2f(U.uLook, lookX, lookY)
		gl.uniform3fv(U.uSun, SUN)
		gl.uniform3fv(U.uRingN, RING_NORMAL)
		gl.uniform4fv(U.uB, bodies)
		gl.uniform4fv(U.uBP, bodyParams)
		gl.uniform4fv(U.uRock, rocks)
		gl.uniform4fv(U.uRockSpin, rockSpin)
		if (beltCount) gl.uniform1f(U.uBeltSpin, p * TURN * BELT_SPIN)
		gl.disable(gl.BLEND)
		gl.drawArrays(gl.TRIANGLES, 0, QUAD_VERTICES)
	}

	function release() {
		gl.deleteBuffer(quad)
		gl.deleteProgram(program)
	}

	return { draw, release }
}
