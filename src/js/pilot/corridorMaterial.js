// The corridor pilot's materials: the intro corridor's surfaces and light carried onto meshes. The hull and
// what stands in the bays draw with corridorSurface.glsl by kind; a model's own material (the crew, the
// helmets) is patched to take the same light (corridorLight.glsl), so everything is lit by the corridor's
// lines, its door and its bays as the shader lit them. One set of uniforms drives them all.

import { DataTexture, NearestFilter, RGBAFormat, ShaderMaterial, Vector2, Vector3 } from 'three'
import common from '../../shaders/intro/common.glsl?raw'
import light from '../../shaders/pilot/corridorLight.glsl?raw'
import surface from '../../shaders/pilot/corridorSurface.glsl?raw'
import { paletteConsts } from '../intro/paletteSnap.js'
import { planetDisc } from '../planetShader.js'
import EarthWorker from './earth.worker.js?worker'
import { PALETTE } from '../../constants/palette.js'
import {
	PILOT,
	PILOT_EXACT_ALPHA,
	PILOT_MATS,
	PILOT_SET,
	PILOT_WINDOW,
} from '../../constants/game/pilot.js'

const { panel, doorway, lockers, bays, ribs } = PILOT_SET

// a GLSL float, and three's frame to the shader's (x mirrored, y from the eye)
const num = v => (Number.isInteger(v) ? `${v}.0` : `${v}`)
const vec3 = ([x, y, z]) => `vec3(${num(x)}, ${num(y)}, ${num(z)})`
const frame = ([x, y, z]) => [-x, y - PILOT_SET.eye, z]

// a point in the repair panel's frame (out from its wall, up, along) in three's
export const panelPoint = ([x, y, z]) => {
	const [px, py, pz] = panel.at
	return [px - Math.sign(px) * x, py + y, pz + z]
}

const DEFINES = {
	CR_W: num(PILOT_SET.halfWidth),
	CR_FLOOR: num(-PILOT_SET.eye),
	CR_CEIL: num(PILOT_SET.height - PILOT_SET.eye),
	CR_CHAMFER: num(PILOT_SET.chamfer),
	CR_DOOR_Z: num(PILOT_SET.door),
	CR_BACK_Z: num(PILOT_SET.back),
	CR_RIB_EVERY: num(ribs.every),
	CR_BAY_FIRST: num(bays.first),
	CR_BAY_EVERY: num(bays.every),
	CR_BAYS: num(bays.count),
	CR_BAY_HALF: num(bays.half),
	CR_BAY_DEPTH: num(bays.depth),
	CR_LINE_W: num(PILOT_SET.lineWidth),
	CR_DOOR_POS: vec3(
		frame([(doorway.x[0] + doorway.x[1]) / 2, doorway.glow, PILOT_SET.door - doorway.ahead])
	),
	CR_WELD: vec3(frame(panelPoint(panel.weld))),
	CR_LOCKER_EDGE: num(lockers.edge),
	CR_LOCKER_PITCH: num(lockers.pitch),
	CR_LOCKER_COUNT: num(lockers.count),
	CR_LOCKER_INSET: num(lockers.inset),
	CR_LOCKER_BOTTOM: num(lockers.bottom),
	CR_LOCKER_TOP: num(lockers.top),
	CR_DOOR_X0: num(-doorway.x[1]),
	CR_DOOR_X1: num(-doorway.x[0]),
	CR_DOOR_TOP: num(doorway.top),
	CR_EARTH_AIM: vec3(PILOT_WINDOW.aim),
	CR_EARTH_RADIUS: num(PILOT_WINDOW.radius),
	CR_EXACT: num(PILOT_EXACT_ALPHA),
}
const PALETTE_GLSL = paletteConsts([
	'pitch',
	'soot',
	'iron',
	'steel',
	'zinc',
	'frost',
	'rime',
	'graphite',
	'gun',
	'brushed',
	'silver',
	'star',
	'rust',
	'brick',
	'amber',
	'ember',
	'glow',
])
const DEFINE_GLSL = Object.entries(DEFINES)
	.map(([name, value]) => `#define ${name} ${value}`)
	.join('\n')

// the player's z, the clock, the door's glow and the lockers' light, shared by every material
const shared = {
	uCrPlayerZ: { value: 0 },
	uCrClock: { value: 0 },
	uCrDoor: { value: 0 },
	uCrLit: { value: 0 },
	// the art grid, for the stars through the window; the Earth's disc and its centre, radius and side in
	// cells, all naught until it is painted
	uRes: { value: new Vector2(1, 1) },
	uEarth: { value: null },
	uEarthDisc: { value: new Vector3() },
}

// The Earth through the glass, painted off the main thread for this art grid so that one of its cells is one
// cell of the grid; until it lands, and between sizes, the glass shows the stars.
let earthRes = 0
function paintWindowEarth(rows) {
	const { radius, view, light, gain } = PILOT_WINDOW
	const cellsPerRad = rows / ((PILOT.fovDeg * Math.PI) / 180)
	const res = 2 * Math.round((radius * cellsPerRad) / planetDisc(1).radius / 2)
	if (res === earthRes) return
	earthRes = res
	const worker = new EarthWorker()
	worker.onmessage = ({ data }) => {
		worker.terminate()
		if (res !== earthRes) return
		const disc = new DataTexture(new Uint8Array(data.buffer), res, res, RGBAFormat)
		disc.magFilter = disc.minFilter = NearestFilter
		disc.needsUpdate = true
		shared.uEarth.value?.dispose()
		shared.uEarth.value = disc
		const { center, radius: cells } = planetDisc(res)
		shared.uEarthDisc.value.set(center, cells, res)
	}
	worker.postMessage({ res, view, light, gain })
}

export function tickCorridor({ z, clock, door, lit }) {
	shared.uCrPlayerZ.value = z
	shared.uCrClock.value = clock
	shared.uCrDoor.value = door
	shared.uCrLit.value = lit
}
export function sizeCorridor(width, height) {
	shared.uRes.value.set(width, height)
	paintWindowEarth(height)
}

// world point and normal for the light; skinned and instanced meshes too
const VERTEX = `
#include <common>
#include <skinning_pars_vertex>
varying vec3 vCrWorld;
varying vec3 vCrNormal;
void main(){
  #include <beginnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <begin_vertex>
  #include <skinning_vertex>
  vec4 w = vec4(transformed, 1.0);
  vec3 nrm = objectNormal;
  #ifdef USE_INSTANCING
  w = instanceMatrix*w;
  nrm = mat3(instanceMatrix)*nrm;
  #endif
  w = modelMatrix*w;
  vCrWorld = w.xyz;
  vCrNormal = normalize(mat3(modelMatrix)*nrm);
  gl_Position = projectionMatrix*viewMatrix*w;
}
`

export const KIND = {
	deck: 0,
	ceiling: 1,
	upperCut: 2,
	lowerCut: 3,
	wall: 4,
	bayBack: 5,
	baySides: 6,
	bulkhead: 7,
	doorWall: 8,
	thing: 9,
	vitals: 10,
	screen: 11,
	world: 12,
	recording: 13,
	spark: 14,
}

// own: uniforms of its own (uBase, uEmit, uGloss, uRim for a thing; uCenter, uHalf for what draws about
// its middle)
export function surfaceMaterial(kind, own = {}) {
	return new ShaderMaterial({
		defines: { ...DEFINES, CR_KIND: KIND[kind] },
		uniforms: {
			...shared,
			uBase: { value: new Vector3() },
			uEmit: { value: new Vector3() },
			uGloss: { value: 0 },
			uRim: { value: 1 },
			uCenter: { value: new Vector3() },
			uHalf: { value: new Vector2() },
			...own,
		},
		vertexShader: VERTEX,
		fragmentShader: `${PALETTE_GLSL}\n${common}\n${light}\n${surface}`,
	})
}

// a PILOT_MATS colour, [name, k] or [a, b, t, k], as the shader's sRGB values
function paint(spec) {
	const [a, b, t, k] = spec.length === 2 ? [spec[0], spec[0], 0, spec[1]] : spec
	const [ca, cb] = [PALETTE[a], PALETTE[b]]
	return new Vector3(...ca.map((v, i) => ((v + (cb[i] - v) * t) * k) / 255))
}
const things = new Map()
export function thingMaterial(key) {
	if (!things.has(key)) {
		const { base, emit, gloss = 0, rim = 1 } = PILOT_MATS[key]
		things.set(
			key,
			surfaceMaterial('thing', {
				uBase: { value: paint(base) },
				uEmit: { value: emit ? paint(emit) : new Vector3() },
				uGloss: { value: gloss },
				uRim: { value: rim },
			})
		)
	}
	return things.get(key)
}

// a model's own material lit as the corridor lights: its albedo and glow taken back to the shader's
// colours, bathed and rimmed like everything standing in the bays
const WORLD_VERTEX = `
vec4 crW = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
crW = instanceMatrix*crW;
#endif
vCrWorld = (modelMatrix*crW).xyz;
`
const LIT_FRAGMENT = `
vec3 crN = crTurn(inverseTransformDirection(normal, viewMatrix));
vec3 crCol = crLight(crFrame(vCrWorld), crN, crToSrgb(diffuseColor.rgb), crToSrgb(totalEmissiveRadiance), 0.0, 1.0, 1.0);
gl_FragColor = vec4(crToLinear(crCol), diffuseColor.a);
`
export function takeCorridorLight(material) {
	if (material.isShaderMaterial || material.userData.corridorLit) return
	material.userData.corridorLit = true
	material.onBeforeCompile = shader => {
		Object.assign(shader.uniforms, shared)
		shader.vertexShader = `varying vec3 vCrWorld;\n${shader.vertexShader}`.replace(
			'#include <project_vertex>',
			`#include <project_vertex>\n${WORLD_VERTEX}`
		)
		shader.fragmentShader =
			`${DEFINE_GLSL}\n${PALETTE_GLSL}\n${light}\n${shader.fragmentShader}`.replace(
				'#include <opaque_fragment>',
				LIT_FRAGMENT
			)
	}
}
