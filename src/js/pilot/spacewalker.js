// The spacewalker: a crew member in her helmet on the space layer, lit by the sun alone, making her round of
// the station's outside along PILOT_SPACEWALKER.path on a thruster pack, her escort drone at her side. Between
// stops she drifts, easing in and out, leaning into her travel with her head turned out from the hull, the
// pack puffing cold gas against her acceleration; at each stop she rests looking in at the hull, or at the
// player once they come near, a puff now and then holding her there.

import { BoxGeometry, CatmullRomCurve3, Group, Matrix4, Mesh, Quaternion, Vector3 } from 'three'
import { spaceThingMaterial, takeSpaceLight } from './corridorMaterial.js'
import { clipRig } from './crew.js'
import { addEscort } from './escort.js'
import { createPuffs } from './puffs.js'
import { rod } from './parts.js'
import { smootherstep } from '../math.js'
import { PILOT, PILOT_SPACE, PILOT_SPACEWALKER } from '../../constants/game/pilot.js'

// arc-length samples per stretch between two waypoints, to place each stop along the loop
const SAMPLES = 32
// smootherstep's top speed over its average; its slope, and its slope's slope, scaled so the top speed is 1
const PEAK = 1.875
const paceAt = k => 16 * k * k * (1 - k) ** 2
const speedingAt = k => 32 * k * (1 - k) * (1 - 2 * k)
const UP = new Vector3(0, 1, 0)
const SIDEWAYS = new Vector3(1, 0, 0)
// the pack's nozzles: how long and round
const NOZZLE = { length: 0.05, r: 0.022 }

// a mesh's own copy of its materials, so lighting it for space leaves the crew's, which share them, alone
function ownMaterials(mesh) {
	mesh.material = Array.isArray(mesh.material)
		? mesh.material.map(m => m.clone())
		: mesh.material.clone()
}

// her round as legs, stop to stop: each rests `restS` s, then moves `moveS` s from `from` along `span` of the
// loop (shares of its length), so where she is follows from the clock alone
function legs(curve, length, { stops, speed }) {
	const lengths = curve.getLengths(curve.points.length * SAMPLES)
	const at = stops.map(s => lengths[s.at * SAMPLES] / length)
	return stops.map((s, i) => {
		const span = (at[(i + 1) % at.length] - at[i] + 1) % 1
		return { from: at[i], span, restS: s.restS, moveS: (PEAK * span * length) / speed }
	})
}
// where she is on the loop (0..1), how fast she moves as a share of her top speed (0 at a stop), and how hard
// she speeds up along her way (m/s², below 0 braking)
function roundAt(round, cycle, clock, speed) {
	let t = clock % cycle
	for (const { from, span, restS, moveS } of round) {
		if (t < restS) return { u: from, moving: 0, push: 0 }
		t -= restS
		if (t < moveS) {
			const k = t / moveS
			const u = (from + span * smootherstep(k)) % 1
			return { u, moving: paceAt(k), push: (speed * speedingAt(k)) / moveS }
		}
		t -= moveS
	}
	return { u: round[0].from, moving: 0, push: 0 }
}

// the thruster pack on her back, hung on her spine as she stands loaded; its nozzles, to puff from
function wearPack(body, { bone, back, half, nozzles }) {
	const spine = body.getObjectByName(bone)
	body.updateMatrixWorld(true)
	const pack = new Group()
	pack.add(new Mesh(new BoxGeometry(...half.map(h => 2 * h)), spaceThingMaterial('white')))
	const vents = nozzles.map(([x, y, z]) => {
		const from = new Vector3(x, y, z)
		// pointing down and back, off her
		const to = from.clone().add(new Vector3(0, -NOZZLE.length, -NOZZLE.length))
		const vent = rod(from, to, NOZZLE.r, spaceThingMaterial('seam'), 8)
		pack.add(vent)
		return vent
	})
	spine.getWorldPosition(pack.position)
	pack.position.z -= back
	pack.updateMatrixWorld()
	spine.attach(pack)
	return vents
}

export async function addSpacewalker(scene) {
	const spec = PILOT_SPACEWALKER
	const { reach, pace, bob, periodS, lean, turnRate, upright, axis, speed, puffs: p } = spec
	const rig = await clipRig(spec)
	const { body } = rig
	body.traverse(o => {
		if (o.isMesh) {
			ownMaterials(o)
			for (const material of [o.material].flat()) takeSpaceLight(material)
		}
	})
	const vents = wearPack(body, spec.pack)
	body.traverse(o => o.layers.set(PILOT_SPACE.layer))
	const gas = createPuffs(p)
	scene.add(body, gas.mesh)
	const escort = addEscort(scene, spec.escort)

	const curve = new CatmullRomCurve3(
		spec.path.map(q => new Vector3(...q)),
		true
	)
	const length = curve.getLength()
	const round = legs(curve, length, spec)
	const cycle = round.reduce((t, leg) => t + leg.restS + leg.moveS, 0)
	const at = new Vector3()
	const up = new Vector3()
	const ahead = new Vector3()
	const side = new Vector3()
	const eye = new Vector3()
	const basis = new Matrix4()
	const facing = new Quaternion()
	const tip = new Quaternion()
	const nozzle = new Vector3()
	const blown = new Vector3()
	const drift = new Vector3()
	let near = false
	let placed = false
	let burst = -1

	// clock: seconds; player: where they stand, three's x and z
	return (dt, clock, player) => {
		const { u, moving, push } = roundAt(round, cycle, clock, speed)
		curve.getPointAt(u, at)
		// her head: between the world's up and straight out from the hull's axis
		up.set(at.x, at.y - axis, 0)
			.normalize()
			.multiplyScalar(upright)
			.addScaledVector(UP, 1 - upright)
			.normalize()
		eye.set(player.x, PILOT.eye, player.z)
		const close = moving === 0 && at.distanceTo(eye) < reach
		if (close && !near && rig.can('react')) rig.play('react', true)
		near = close
		// she faces her travel, the player when near, else in at the hull
		if (moving > 0) curve.getTangentAt(u, ahead)
		else if (near) ahead.subVectors(eye, at)
		else ahead.set(-at.x, axis - at.y, 0)
		ahead.addScaledVector(up, -ahead.dot(up)).normalize()
		side.crossVectors(up, ahead)
		basis.makeBasis(side, up, ahead)
		facing.setFromRotationMatrix(basis).multiply(tip.setFromAxisAngle(SIDEWAYS, lean * moving))
		if (placed) body.quaternion.rotateTowards(facing, turnRate * dt)
		else body.quaternion.copy(facing)
		placed = true
		body.position.copy(at).addScaledVector(up, bob * Math.sin((2 * Math.PI * clock) / periodS))
		if (moving > 0 && rig.can('travel')) rig.play('travel')
		else rig.idle(dt)
		rig.update(dt * pace)
		body.updateMatrixWorld()
		// the pack: a burst against her push while it is hard enough, a lone puff now and then at a stop
		const pushing = Math.abs(push) > p.kick
		const every = pushing ? p.everyS : moving === 0 ? p.holdS : 0
		const beat = every ? Math.floor(clock / every) : burst
		if (beat !== burst) {
			curve.getTangentAt(u, drift)
			blown.copy(drift).multiplyScalar(pushing ? -Math.sign(push) : 0)
			drift.multiplyScalar(moving * speed)
			for (let i = 0; i < (pushing ? p.perBurst : 1); i++) {
				vents[i % vents.length].getWorldPosition(nozzle)
				gas.blow(nozzle, blown.lengthSq() ? blown : up, drift)
			}
			burst = beat
		}
		gas.tick(dt)
		escort(dt, clock, body)
	}
}
