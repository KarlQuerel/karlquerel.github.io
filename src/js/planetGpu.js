// The planet's surface on the GPU: the CPU sweep's per-cell work as one fragment per cell, a sweep in ~1 ms.

import planetVert from '../shaders/planet/planet.vert.glsl?raw'
import planetFrag from '../shaders/planet/planet.frag.glsl?raw'
import { PALETTE } from '../constants/palette.js'
import { PLANET } from '../constants/planet.js'
import {
	FULLSCREEN_QUAD,
	QUAD_VERTICES,
	bindAttribute,
	createProgram,
	loseContext,
	staticBuffer,
	uniformLocations,
} from './gl.js'
import { planetDisc, planetFrame, planetWorld } from './planetShader.js'

// GLSL wants a float literal to carry its point
const float = v => (Number.isInteger(v) ? `${v}.0` : `${v}`)
const vec3s = cols => cols.map(c => `vec3(${c.map(float).join(', ')})`).join(', ')

// The tunables as GLSL constants, generated so PLANET stays the one source of truth.
function prelude(res) {
	const { radius, center, cosT, sinT } = planetDisc(res)
	const cl = PLANET.clouds
	const st = PLANET.storm
	const ramps = PLANET.bands.flatMap(([name]) => PLANET.ramps[name].map(c => PALETTE[c]))
	const levels = PLANET.cloudRamp.length
	const edges = PLANET.bands.slice(0, -1).map(([, offset]) => PLANET.seaLevel + offset)
	const shell = PLANET.shell.map(
		([name, alpha]) => `vec4(${[...PALETTE[name], alpha].map(float).join(', ')})`
	)
	const defines = {
		RES: res,
		RADIUS: float(radius),
		CENTER: float(center),
		COS_T: float(cosT),
		SIN_T: float(sinT),
		HALO_WIDTH: float(PLANET.haloWidth),
		SHELL_COUNT: shell.length,
		SHELL_TWILIGHT: float(PLANET.shellTwilight),
		SHELL_NIGHT: float(PLANET.shellNight),
		NOISE_SCALE: float(PLANET.noiseScale),
		BASIN_COUNT: PLANET.basins.count,
		BASIN_DEPTH: float(PLANET.basins.depth),
		BAND_COUNT: PLANET.bands.length,
		BAND_BLEND: float(PLANET.bandBlend),
		SEA_LEVEL: float(PLANET.seaLevel),
		RELIEF: float(PLANET.relief),
		LEVELS: levels,
		RIM_LEVELS: PLANET.rimLevels,
		OCEAN_GLOSS: float(PLANET.oceanGloss),
		CLOUD_SCALE: float(cl.scale),
		CLOUD_COVER: float(cl.cover),
		CLOUD_BLEND: float(cl.blend),
		CLOUD_OCTAVES: cl.octaves,
		CLOUD_OPACITY: float(cl.opacity),
		SHADOW_OFFSET: float(cl.shadowOffset),
		SHADOW_DROP: cl.shadowDrop,
		STORM_SWIRL: float(st.swirl),
		STORM_BOOST: float(st.boost),
		STORM_EYE_DROP: float(st.eyeDrop),
		STORM_ARMS: float(st.arms),
		STORM_BAND_MIN: float(st.bandMin),
		STORM_ARM_TWIST: float(st.armTwist),
		STORM_SOLIDIFY: float(st.solidify),
		STORM_TEX_GAIN: float(st.texGain),
		STORM_WHITEN_LEVELS: st.whitenLevels,
	}
	return [
		...Object.entries(defines).map(([k, v]) => `#define ${k} ${v}`),
		`const float EDGES[${edges.length}] = float[](${edges.map(float).join(', ')});`,
		`const vec3 RAMPS[${ramps.length}] = vec3[](${vec3s(ramps)});`,
		`const vec3 CLOUD_RAMP[${levels}] = vec3[](${vec3s(PLANET.cloudRamp.map(c => PALETTE[c]))});`,
		`const vec4 SHELL[${shell.length}] = vec4[](${shell.join(', ')});`,
	].join('\n')
}

const UNIFORMS = [
	'uSeed',
	'uBasins[0]',
	'uStorm',
	'uU1',
	'uU2',
	'uBandPhase',
	'uSpin',
	'uCloud',
	'uLight',
	'uHalf',
	'uLightT',
	'uThin',
]

// Null where WebGL2 or the shader is missing. A failed compile has already claimed the canvas for WebGL.
export function createPlanetGpu(canvas, { res, seed }) {
	if (typeof WebGL2RenderingContext === 'undefined') return null
	const gl = canvas.getContext('webgl2', {
		// the CPU sweep's bytes are straight alpha, and the halo's layers are only right read that way
		premultipliedAlpha: false,
		antialias: false,
		depth: false,
		stencil: false,
	})
	if (!gl) return null
	let program
	try {
		program = createProgram(gl, planetVert, planetFrag.replace('// __PLANET__', prelude(res)))
	} catch {
		loseContext(gl)
		return null
	}
	const U = uniformLocations(gl, program, UNIFORMS)
	const quad = staticBuffer(gl, FULLSCREEN_QUAD)

	gl.useProgram(program)
	bindAttribute(gl, quad, gl.getAttribLocation(program, 'aPos'), 2)
	const { basins, storm } = planetWorld(seed)
	gl.uniform1ui(U.uSeed, seed)
	gl.uniform4fv(
		U.uBasins,
		basins.flatMap(b => [b.x, b.y, b.z, b.cos])
	)
	gl.uniform4f(U.uStorm, storm.x, storm.y, storm.z, storm.cos)
	gl.uniform2f(U.uU1, storm.u1x, storm.u1z)
	gl.uniform3f(U.uU2, storm.u2x, storm.u2y, storm.u2z)
	gl.uniform1f(U.uBandPhase, storm.bandPhase)
	gl.viewport(0, 0, res, res)

	function draw(spin, lightYaw, cloudThin) {
		const f = planetFrame(spin, lightYaw)
		gl.uniform2f(U.uSpin, f.cosS, f.sinS)
		gl.uniform2f(U.uCloud, f.cosC, f.sinC)
		gl.uniform3fv(U.uLight, f.light)
		gl.uniform3fv(U.uHalf, f.half)
		gl.uniform3fv(U.uLightT, f.lightT)
		gl.uniform1f(U.uThin, cloudThin)
		gl.drawArrays(gl.TRIANGLES, 0, QUAD_VERTICES)
	}

	// the pixels just drawn, rows top-down like the CPU sweep's buffer (the A/B check reads this)
	function read() {
		const out = new Uint8Array(res * res * 4)
		gl.readPixels(0, 0, res, res, gl.RGBA, gl.UNSIGNED_BYTE, out)
		const flipped = new Uint8Array(out.length)
		const row = res * 4
		for (let y = 0; y < res; y++)
			flipped.set(out.subarray(y * row, (y + 1) * row), (res - 1 - y) * row)
		return flipped
	}

	function release() {
		gl.deleteProgram(program)
		gl.deleteBuffer(quad)
		loseContext(gl)
	}

	return { gl, draw, read, release }
}
