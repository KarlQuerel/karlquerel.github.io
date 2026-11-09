// What the rooms project: a crew member's recording turning in steps over its plate, standing in the
// plate's dithered beam, glitching now and then, the plate's ring flickering as it speaks; the route on the
// mission table, dots of light from the Earth to the candidate world with a ship stepping along; and the
// seed vault's seedling turning in light.

import {
	AnimationMixer,
	CylinderGeometry,
	DoubleSide,
	Group,
	Mesh,
	QuadraticBezierCurve3,
	SphereGeometry,
	Vector2,
	Vector3,
	Vector4,
} from 'three'
import { BAYS, bayPoint, facingIn } from './corridorShell.js'
import { surfaceMaterial, thingMaterial } from './corridorMaterial.js'
import { loadRigged, wearHelmet } from './models.js'
import { rod } from './parts.js'
import { PILOT_PROP_MODELS } from '../../constants/game/pilot.js'

const ball = (at, r, material) => {
	const mesh = new Mesh(new SphereGeometry(r, 10, 8), material)
	mesh.position.copy(at)
	return mesh
}

// the recording over its plate, its beam, and the tick that turns it, glitches it and flickers the ring
export async function addHolo(scene, k, { at, scale, turn, stepsPerS, beam, glitch, flickerPerS }) {
	const spec = PILOT_PROP_MODELS.recording
	const { body, clips } = await loadRigged({ ...spec, scale })
	await wearHelmet(body, spec.helmet)
	const plate = bayPoint(k, at)
	const light = surfaceMaterial('recording', {
		uGlitch: { value: new Vector4(glitch.perS, glitch.odds, glitch.band, glitch.shift) },
		uGlitchY: { value: new Vector2(plate.y, plate.y + beam.height) },
	})
	body.traverse(o => {
		if (o.isMesh) o.material = light
	})
	body.position.copy(plate)
	const mixer = new AnimationMixer(body)
	mixer.clipAction(clips[spec.clip]).play()
	const glow = surfaceMaterial('beam', {
		uCenter: { value: plate },
		uHalf: { value: new Vector2(0, beam.height) },
	})
	glow.side = DoubleSide
	const shaft = new Mesh(
		new CylinderGeometry(beam.top, beam.foot, beam.height, 12, 1, true),
		glow
	)
	shaft.position.copy(plate)
	shaft.position.y += beam.height / 2
	scene.add(body, shaft)
	const ring = thingMaterial('holoRing').uniforms.uEmit.value
	const lit = ring.clone()
	let step = -1
	return (dt, clock) => {
		body.rotation.y = facingIn(BAYS[k].side) + Math.floor(clock * stepsPerS) * turn
		mixer.update(dt)
		const now = Math.floor(clock * flickerPerS)
		if (now !== step) ring.copy(lit).multiplyScalar(0.6 + 0.6 * Math.random())
		step = now
	}
}

// the route: the Earth, dots arcing up and over to the world's near side, and a ship stepping along them
export function addRoute(scene, k, { from, to, r, lift, dots, dot, earth, ship, stepsPerS }) {
	const start = bayPoint(k, from)
	const world = bayPoint(k, to)
	const end = world.clone().addScaledVector(start.clone().sub(world).normalize(), r)
	const top = start.clone().lerp(end, 0.5)
	top.y += 2 * lift
	const points = new QuadraticBezierCurve3(start, top, end).getSpacedPoints(dots)
	const craft = ball(points[0], ship, thingMaterial('light'))
	scene.add(
		ball(start, earth, thingMaterial('earth')),
		...points.slice(1).map(p => ball(p, dot, thingMaterial('lamp'))),
		craft
	)
	return (dt, clock) => craft.position.copy(points[Math.floor(clock * stepsPerS) % points.length])
}

// a seedling grown in light over the vault's plate: a seed, a stem bending up from it and leaves spiralling
// round it, smaller toward the top, turning in steps
export function addSeedling(scene, k, spec) {
	const { at, height, stem, bend, leaves, leaf, spiral, lean, taper, seed, turn, stepsPerS } =
		spec
	const light = surfaceMaterial('recording')
	const plant = new Group()
	const pod = new Mesh(new SphereGeometry(seed, 10, 8), light)
	pod.position.y = seed
	plant.add(pod)
	// the stem in short pieces along a gentle curve, a leaf at each of the upper joints, turning round it
	const joints = leaves + 1
	const point = i => {
		const t = i / joints
		return new Vector3(bend * Math.sin(t * Math.PI), seed + t * (height - seed), 0)
	}
	for (let i = 0; i < joints; i++) {
		const piece = rod(point(i), point(i + 1), stem * (1 - i / (joints + 1)), light, 6)
		plant.add(piece)
		if (!i) continue
		// each leaf from the stem outward, its base at the joint
		const size = 1 - (taper * i) / joints
		const blade = new Mesh(new SphereGeometry(1, 10, 6), light)
		blade.scale.set(...leaf.map(v => v * size))
		const yaw = i * spiral
		const out = new Vector3(Math.cos(yaw), Math.sin(lean), Math.sin(yaw))
		blade.position.copy(point(i)).addScaledVector(out, leaf[0] * size)
		blade.rotation.set(0, -yaw, lean)
		plant.add(blade)
	}
	plant.position.copy(bayPoint(k, at))
	scene.add(plant)
	return (dt, clock) => {
		plant.rotation.y = Math.floor(clock * stepsPerS) * turn
	}
}
