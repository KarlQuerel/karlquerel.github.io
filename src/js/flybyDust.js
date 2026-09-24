// Dust streaks: strongest in open space, gone once the flight hits atmosphere.

import dustVert from '../shaders/flyby/dust.vert.glsl?raw'
import dustFrag from '../shaders/flyby/dust.frag.glsl?raw'
import { clamp01 } from './math.js'
import { mul } from './vec3.js'
import { bindAttribute, createProgram, staticBuffer, uniformLocations } from './gl.js'
import {
	DUST_BOX,
	DUST_ENTRY_OUT,
	DUST_FULL_SPEED,
	DUST_TAIL,
	FADE_CUT,
	FOCAL,
	MOTES,
	STREAK_BASE,
	STREAK_FULL_SPEED,
	STREAK_GAIN,
} from '../constants/flyby.js'

const UNIFORMS = [
	'uCamPos',
	'uRight',
	'uUp',
	'uFwd',
	'uFocal',
	'uAspect',
	'uBox',
	'uStreak',
	'uFade',
]

// two verts per mote, head and tail, sharing one seed
function seedMotes() {
	const seeds = new Float32Array(MOTES * 6)
	const tails = new Float32Array(MOTES * 2)
	for (let i = 0; i < MOTES; i++) {
		const s = [Math.random(), Math.random(), Math.random()]
		for (let k = 0; k < 2; k++) {
			seeds.set(s, i * 6 + k * 3)
			tails[i * 2 + k] = k * DUST_TAIL
		}
	}
	return { seeds, tails }
}

export function createDustPass(gl) {
	const program = createProgram(gl, dustVert, dustFrag)
	const U = uniformLocations(gl, program, UNIFORMS)
	const aSeed = gl.getAttribLocation(program, 'aSeed')
	const aTail = gl.getAttribLocation(program, 'aTail')
	const { seeds, tails } = seedMotes()
	const seedBuffer = staticBuffer(gl, seeds)
	const tailBuffer = staticBuffer(gl, tails)

	function draw(cam, grid) {
		const fade =
			clamp01(cam.speed / DUST_FULL_SPEED) *
			(1 - clamp01(cam.entry / DUST_ENTRY_OUT)) *
			cam.wake
		if (fade <= FADE_CUT) return

		gl.useProgram(program)
		bindAttribute(gl, seedBuffer, aSeed, 3)
		bindAttribute(gl, tailBuffer, aTail, 1)
		gl.uniform3fv(U.uCamPos, cam.eye)
		gl.uniform3fv(U.uRight, cam.right)
		gl.uniform3fv(U.uUp, cam.up)
		gl.uniform3fv(U.uFwd, cam.fwd)
		gl.uniform1f(U.uFocal, FOCAL)
		gl.uniform1f(U.uAspect, grid.width / grid.height)
		gl.uniform1f(U.uBox, DUST_BOX)
		// streak length follows real speed, so the cue is the motion, not a constant
		const streak = clamp01(cam.speed / STREAK_FULL_SPEED) * STREAK_GAIN + STREAK_BASE
		gl.uniform3fv(U.uStreak, mul(cam.travel, streak))
		gl.uniform1f(U.uFade, fade)
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
		gl.drawArrays(gl.LINES, 0, MOTES * 2)
	}

	function release() {
		gl.deleteBuffer(seedBuffer)
		gl.deleteBuffer(tailBuffer)
		gl.deleteProgram(program)
	}

	return { draw, release }
}
