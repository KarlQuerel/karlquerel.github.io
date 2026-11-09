// The repair job at the open wall panel: the cavity with its cables and relay, the panel held up off the
// wall, and the drone (drone.js) at work facing it, one jointed arm's fingers on the panel and the other's
// torch welding, the sparks it throws falling, bouncing off the deck and going out in steps. Its tick bobs
// the drone on a stepped clock, runs its own clocks and flies the sparks, flashing in time with the weld's
// light in the shader.

import {
	CylinderGeometry,
	Group,
	InstancedMesh,
	Mesh,
	Object3D,
	SphereGeometry,
	Vector3,
} from 'three'
import { panelPoint, surfaceMaterial, thingMaterial } from './corridorMaterial.js'
import { buildDrone } from './drone.js'
import { box, rod } from './parts.js'
import { randIn } from '../math.js'
import { PILOT_REPAIR, PILOT_SET } from '../../constants/game/pilot.js'

const { halfWidth: W, chamfer: C, panel: wallPanel } = PILOT_SET
const R = PILOT_REPAIR
// out from the wall, in three's x
const OUT = -Math.sign(wallPanel.at[0])
const at = q => new Vector3(...panelPoint(q))
// the shader's hash, so the sparks fly when the weld's light flashes (crWeld in corridorLight.glsl)
const fract = v => v - Math.floor(v)
function crHash(p) {
	p = fract(p * 0.1031)
	p *= p + 33.33
	return fract(p * (p + p))
}
const WELD_HZ = 24
const welding = clock => crHash(Math.floor(clock * WELD_HZ)) > 0.55

const Z = new Vector3(0, 0, 1)
const ball = (centre, r) => {
	const mesh = new Mesh(new SphereGeometry(r, 8, 6), thingMaterial('seam'))
	mesh.position.copy(centre)
	return mesh
}

// a jointed arm from its shoulder to its tool, the elbow lifted above the straight line between them: the
// torch on to the weld tip, or two fingers either side of the grip
function arm(from, to, tool) {
	const { r, lift, torch, fingers } = R.arms
	const elbow = from.clone().lerp(to, 0.5)
	elbow.y += lift
	const along = to.clone().sub(elbow).normalize()
	const wrist = to
		.clone()
		.addScaledVector(along, -(tool === 'torch' ? torch.length : 2 * fingers.half[2]))
	const parts = [
		ball(from, r * 1.6),
		rod(from, elbow, r, thingMaterial('white'), 8),
		ball(elbow, r * 1.4),
		rod(elbow, wrist, r * 0.85, thingMaterial('brushed'), 8),
		ball(wrist, r * 1.2),
	]
	if (tool === 'torch') return [...parts, rod(wrist, to, torch.r, thingMaterial('seam'), 8)]
	const apart = new Vector3().crossVectors(along, new Vector3(0, 1, 0)).normalize()
	for (const side of [-1, 1]) {
		const finger = box(
			wrist
				.clone()
				.lerp(to, 0.5)
				.addScaledVector(apart, (side * fingers.spread) / 2),
			fingers.half,
			thingMaterial('brushed')
		)
		finger.quaternion.setFromUnitVectors(Z, along)
		parts.push(finger)
	}
	return parts
}

// the panel taken off, held beside the hole with its far edge swung out toward the corridor; and where the
// drone holds it, the middle of its near edge
function heldPanel() {
	const { at: centre, half, tilt } = R.panel
	const mesh = box(at(centre), half, thingMaterial('furniture'))
	mesh.rotation.y = OUT * tilt
	mesh.updateMatrixWorld(true)
	return { mesh, grip: mesh.localToWorld(new Vector3(0, 0, -half[2])) }
}

// the sparks: one instanced mesh, each spark dead (scaled to nothing) until the weld throws it
function sparks() {
	const s = R.sparks
	const mesh = new InstancedMesh(
		new CylinderGeometry(s.size, s.size, s.size, 4),
		thingMaterial('spark'),
		s.count
	)
	const flying = Array.from({ length: s.count }, () => ({
		p: new Vector3(),
		v: new Vector3(),
		age: 0,
		life: 0,
	}))
	const tip = at(wallPanel.weld)
	const place = new Object3D()
	let next = 0
	function throwOne() {
		const k = flying[next]
		next = (next + 1) % s.count
		const speed = randIn(s.speed)
		k.p.copy(tip)
		k.v.set(OUT * speed, Math.random() * s.up, (Math.random() - 0.5) * speed)
		k.age = 0
		k.life = randIn(s.life)
	}
	// the deck, and the lower cut rising toward the wall at 45°
	const groundAt = x => Math.max(0, Math.abs(x) - (W - C))
	const n = new Vector3()
	function fly(k, dt) {
		k.v.y -= s.gravity * dt
		k.p.addScaledVector(k.v, dt)
		const ground = groundAt(k.p.x)
		if (k.p.y >= ground) return
		k.p.y = ground
		if (ground > 0) n.set(-Math.sign(k.p.x) * Math.SQRT1_2, Math.SQRT1_2, 0)
		else n.set(0, 1, 0)
		const into = k.v.dot(n)
		if (into < 0) k.v.addScaledVector(n, -(1 + s.bounce) * into).multiplyScalar(0.7)
	}
	let window = -1
	function tick(dt, clock) {
		const w = Math.floor(clock * WELD_HZ)
		if (w !== window && welding(clock)) for (let i = 0; i < s.perBurst; i++) throwOne()
		window = w
		for (const [i, k] of flying.entries()) {
			k.age += dt
			const left = k.life ? Math.max(0, 1 - k.age / k.life) : 0
			if (left > 0) fly(k, dt)
			place.position.copy(k.p)
			place.scale.setScalar(Math.ceil(left * s.steps) / s.steps)
			place.updateMatrix()
			mesh.setMatrixAt(i, place.matrix)
		}
		mesh.instanceMatrix.needsUpdate = true
	}
	tick(0, 0)
	return { mesh, tick }
}

export function addRepair(scene) {
	const { cavity, cables, relay, relayLight, drone: d } = R
	scene.add(
		box(at(cavity.at), cavity.half, thingMaterial('cavity')),
		box(at(relay.at), relay.half, thingMaterial('fitting')),
		box(at(relayLight.at), relayLight.half, thingMaterial('lamp'))
	)
	for (let i = 0; i < cables.count; i++) {
		const y = cables.from + i * cables.every
		const from = at([cables.x, y, -cables.half])
		const to = at([cables.x, y + cables.sag * Math.sin(i * 1.7), cables.half])
		scene.add(rod(from, to, cables.r, thingMaterial(i === 1 ? 'brushed' : 'seam')))
	}
	const tip = new Mesh(new SphereGeometry(0.02, 10, 8), surfaceMaterial('spark'))
	tip.position.copy(at(wallPanel.weld))
	const held = heldPanel()
	// the drone faces the wall, its eye (+z in its own frame) turned in from the corridor and a little back
	const bot = new Group()
	const worker = buildDrone(thingMaterial)
	worker.drone.position.copy(at(d.at))
	worker.drone.rotation.y = -OUT * (Math.PI / 2 + d.yaw)
	worker.drone.updateMatrixWorld()
	const shoulder = i => worker.drone.localToWorld(new Vector3(...R.arms.shoulders[i]))
	bot.add(
		worker.drone,
		held.mesh,
		...arm(shoulder(0), at(wallPanel.weld), 'torch'),
		...arm(shoulder(1), held.grip, 'fingers')
	)
	const spray = sparks()
	scene.add(tip, bot, spray.mesh)
	return (dt, clock) => {
		bot.position.y = d.bob * Math.sin(Math.floor(clock * d.stepsPerS) * d.phase)
		worker.tick(clock)
		spray.tick(dt, clock)
	}
}
