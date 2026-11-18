// A crewmate taking their helmet off and putting it back on (HELMET_OFF): the steps start the body's clips, carry the
// helmet from anchor to anchor and ease each hand onto its sides by two-bone IK, after the clips have posed the arms.

import { Box3, Euler, Matrix4, Quaternion, Vector3 } from 'three'
import { HELMET_OFF } from '../../constants/game/helmetOff.js'
import { clamp, smoothstep } from '../math.js'
import { mixamoBones, showSkin } from './models.js'

const { steps, grip, elbow, clear } = HELMET_OFF
// each arm by its bones' side, and which way its side lies along the body's x
const SIDES = { Left: 1, Right: -1 }

const at = bone => bone.getWorldPosition(new Vector3())

// turn a bone so the world direction `from` points along `to`, its children with it
function aim(bone, from, to) {
	const world = bone.getWorldQuaternion(new Quaternion())
	world.premultiply(new Quaternion().setFromUnitVectors(from.normalize(), to.normalize()))
	bone.quaternion.copy(bone.parent.getWorldQuaternion(new Quaternion()).invert().multiply(world))
	bone.updateMatrixWorld(true)
}

// two-bone IK: the hand to `target`, the elbow bent toward the world direction `pole` from the shoulder
function reach({ arm, fore, hand }, target, pole) {
	const shoulder = at(arm)
	const upper = shoulder.distanceTo(at(fore))
	const lower = at(fore).distanceTo(at(hand))
	const toward = target.clone().sub(shoulder)
	const d = clamp(toward.length(), 1e-3, (upper + lower) * 0.999)
	toward.normalize()
	const cos = clamp((upper ** 2 + d ** 2 - lower ** 2) / (2 * upper * d), -1, 1)
	const bend = pole.clone().addScaledVector(toward, -pole.dot(toward)).normalize()
	const bent = shoulder
		.clone()
		.addScaledVector(toward, upper * cos)
		.addScaledVector(bend, upper * Math.sqrt(1 - cos * cos))
	aim(arm, at(fore).sub(shoulder), bent.sub(shoulder))
	const joint = at(fore)
	aim(fore, at(hand).sub(joint), target.clone().sub(joint))
}

// rig: a clipRig wearing its helmet, with HELMET_OFF.clips among its roles
export function helmetRoutine(rig) {
	const { body } = rig
	const [helmet, seal] = rig.worn
	const bones = mixamoBones(body)
	const arms = Object.entries(SIDES).map(([side, sign]) => ({
		sign,
		arm: bones[`${side}Arm`],
		fore: bones[`${side}ForeArm`],
		hand: bones[`${side}Hand`],
	}))
	// as worn: its place on the head, its turn against the body's and its size in the world
	body.updateMatrixWorld(true)
	const seat = {
		p: helmet.position.clone(),
		q: helmet.quaternion.clone(),
		s: helmet.scale.clone(),
	}
	const size = helmet.getWorldScale(new Vector3())
	const upright = body
		.getWorldQuaternion(new Quaternion())
		.invert()
		.multiply(helmet.getWorldQuaternion(new Quaternion()))
	// its box in its own frame, for the grips
	const box = new Box3()
	const own = helmet.matrixWorld.clone().invert()
	helmet.traverse(mesh => {
		if (!mesh.isMesh) return
		mesh.geometry.computeBoundingBox()
		box.union(
			mesh.geometry.boundingBox.clone().applyMatrix4(own.clone().multiply(mesh.matrixWorld))
		)
	})
	const middle = box.getCenter(new Vector3())
	const extent = box.getSize(new Vector3())
	const m = new Matrix4()
	const scale = new Vector3()
	const frame = new Quaternion()
	const pose = () => ({ p: new Vector3(), q: new Quaternion() })
	const [a, b, now, seated] = [pose(), pose(), pose(), pose()]

	// an anchor's world pose this frame
	function where(anchor, out) {
		if (anchor === 'worn') {
			m.compose(seat.p, seat.q, seat.s).premultiply(helmet.parent.matrixWorld)
			m.decompose(out.p, out.q, scale)
		} else {
			const { from, at: offset = [0, 0, 0], tip = [0, 0, 0] } = anchor
			out.p.copy(from ? at(bones[from]) : body.getWorldPosition(out.p))
			out.p.add(new Vector3(...offset).applyQuaternion(frame))
			out.q
				.setFromEuler(new Euler(...tip))
				.premultiply(frame)
				.multiply(upright)
		}
		return out
	}

	// the step under way, its time so far, and what it carries the helmet and the hands from and to
	let index = -1
	let time = 0
	let from = 'worn'
	let to = 'worn'
	let held = [0, 0]
	let holding = [0, 0]

	function begin(i) {
		index = i
		const step = steps[i]
		from = to
		held = holding
		if (step.clip) rig.play(step.clip, step.clip !== 'rest')
		if (step.helmet) to = step.helmet
		holding = step.hands ?? holding
	}

	function finish() {
		index = -1
		from = to = 'worn'
		held = holding = [0, 0]
		helmet.position.copy(seat.p)
		helmet.quaternion.copy(seat.q)
		helmet.scale.copy(seat.s)
		showSkin(body, false)
		seal.visible = true
	}

	return {
		running: () => index >= 0,
		start() {
			if (index >= 0) return
			time = 0
			begin(0)
		},
		// before the mixer: the steps on in time, each one's clip started
		step(dt) {
			if (index < 0) return
			time += dt
			while (index >= 0 && time >= steps[index].s) {
				time -= steps[index].s
				if (index + 1 < steps.length) begin(index + 1)
				else finish()
			}
		},
		// after the mixer: the helmet where the step has carried it, the head bare once it is clear, the hands on it
		pose() {
			if (index < 0) return
			const u = smoothstep(clamp(time / steps[index].s, 0, 1))
			body.updateMatrixWorld(true)
			body.getWorldQuaternion(frame)
			where(from, a)
			where(to, b)
			now.p.lerpVectors(a.p, b.p, u)
			now.q.slerpQuaternions(a.q, b.q, u)
			const world = new Matrix4().compose(now.p, now.q, size)
			m.copy(helmet.parent.matrixWorld).invert().multiply(world)
			m.decompose(helmet.position, helmet.quaternion, helmet.scale)
			const off = now.p.distanceTo(where('worn', seated).p) > clear
			showSkin(body, off)
			seal.visible = !off
			arms.forEach((limb, k) => {
				const w = held[k] + (holding[k] - held[k]) * u
				if (w <= 0) return
				const side = new Vector3(
					middle.x + limb.sign * grip[0] * extent.x,
					middle.y + grip[1] * extent.y,
					middle.z + grip[2] * extent.z
				).applyMatrix4(world)
				const pole = new Vector3(limb.sign * elbow[0], elbow[1], elbow[2]).applyQuaternion(
					frame
				)
				const posed = at(limb.fore).sub(at(limb.arm)).normalize()
				reach(limb, at(limb.hand).lerp(side, w), posed.lerp(pole.normalize(), w))
			})
		},
	}
}
