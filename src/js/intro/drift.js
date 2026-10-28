// The second pod drifting down the dead corridor: one rigid capsule along its long axis, a position,
// a velocity and a slow tumble. It knocks off the corridor's box end by end, so a wall met with one
// end sets it turning, and off the player, who stays put on mag boots.

import { WRECK } from '../../constants/intro/wreck.js'
import { clamp } from '../math.js'

const { pod: POD, player: PLAYER } = WRECK
const LO = [-WRECK.box.x, WRECK.box.yLo, WRECK.box.zLo]
const HI = [WRECK.box.x, WRECK.box.yHi, WRECK.box.zHi]

const add = (a, b, k = 1) => a.map((v, i) => v + b[i] * k)
const sub = (a, b) => a.map((v, i) => v - b[i])
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a, b) => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0],
]
const norm = a => Math.hypot(...a)

// v turned by the quaternion q, [x, y, z, w]
function turned(q, v) {
	const u = q.slice(0, 3)
	return add(v, cross(u, add(cross(u, v), v, q[3])), 2)
}

// the turn q carried on by spin w (rad/s) for dt
function spun(q, w, dt) {
	const [x, y, z, s] = q
	const h = dt / 2
	const next = [
		x + h * (w[0] * s + w[1] * z - w[2] * y),
		y + h * (w[1] * s + w[2] * x - w[0] * z),
		z + h * (w[2] * s + w[0] * y - w[1] * x),
		s - h * (w[0] * x + w[1] * y + w[2] * z),
	]
	return next.map(v => v / norm(next))
}

// the closest points of segments p1-q1 and p2-q2 (Ericson, Real-Time Collision Detection 5.1.9)
function nearest(p1, q1, p2, q2) {
	const d1 = sub(q1, p1)
	const d2 = sub(q2, p2)
	const r = sub(p1, p2)
	const a = dot(d1, d1)
	const e = dot(d2, d2)
	const f = dot(d2, r)
	const c = dot(d1, r)
	const b = dot(d1, d2)
	const denom = a * e - b * b
	let s = denom > 1e-9 ? clamp((b * f - c * e) / denom, 0, 1) : 0
	let t = (b * s + f) / e
	if (t < 0) {
		t = 0
		s = clamp(-c / a, 0, 1)
	} else if (t > 1) {
		t = 1
		s = clamp((b - c) / a, 0, 1)
	}
	return [add(p1, d1, s), add(p2, d2, t)]
}

const ends = pod => {
	const axis = turned(pod.q, [POD.half, 0, 0])
	return [add(pod.p, axis), add(pod.p, axis, -1)]
}

// a blow along n at a point of the pod sets it moving and, off-centre, turning
function knock(pod, at, n, speed) {
	pod.v = add(pod.v, n, speed)
	pod.w = add(pod.w, cross(sub(at, pod.p), n), POD.spin * speed)
}

export function createDrift() {
	const n = norm(POD.axis)
	const s = Math.sin(POD.turn / 2) / n
	return {
		p: [...POD.at],
		v: [...POD.drift],
		q: [POD.axis[0] * s, POD.axis[1] * s, POD.axis[2] * s, Math.cos(POD.turn / 2)],
		w: [...POD.tumble],
	}
}

export function stepDrift(pod, walk, dt) {
	const keep = Math.exp(-dt / WRECK.dragS)
	pod.p = add(pod.p, pod.v, dt)
	pod.q = spun(pod.q, pod.w, dt)
	pod.v = pod.v.map(v => v * keep)
	pod.w = pod.w.map(v => v * keep)
	// each end against the corridor's box
	for (const end of ends(pod))
		for (let i = 0; i < 3; i++) {
			const over = end[i] < LO[i] ? LO[i] - end[i] : end[i] > HI[i] ? HI[i] - end[i] : 0
			if (!over) continue
			pod.p[i] += over
			const n = [0, 0, 0]
			n[i] = Math.sign(over)
			const into = -pod.v[i] * n[i]
			if (into > 0) knock(pod, end, n, into * (1 + WRECK.bounce))
		}
	// The player's column, deck to eye. The pod is far the heavier: the player is stopped against it,
	// and walking into it passes on only a share of the pace, so it goes as slowly as it is leaned on.
	const [a, b] = ends(pod)
	const [onCol, onPod] = nearest(
		[walk.x, PLAYER.floor + PLAYER.radius, walk.z],
		[walk.x, PLAYER.eye, walk.z],
		a,
		b
	)
	const off = sub(onPod, onCol)
	const far = norm(off)
	const touch = POD.radius + PLAYER.radius
	if (far >= touch || far === 0) return
	const n = off.map(v => v / far)
	walk.x -= n[0] * (touch - far)
	walk.z -= n[2] * (touch - far)
	pod.p[1] += n[1] * (touch - far)
	const gain = dot([walk.vx, 0, walk.vz], n) * WRECK.shove - dot(pod.v, n)
	if (gain > 0) knock(pod, onPod, n, gain)
}

// the view from the eye: where the head points
const viewOf = walk => [
	Math.sin(walk.heading) * Math.cos(walk.pitch),
	Math.sin(walk.pitch),
	Math.cos(walk.heading) * Math.cos(walk.pitch),
]

// where the view meets the pod within reach, or null
export function aimDrift(pod, walk) {
	const eye = [walk.x, PLAYER.eye, walk.z]
	const [a, b] = ends(pod)
	const [onRay, onPod] = nearest(eye, add(eye, viewOf(walk), WRECK.reach), a, b)
	return norm(sub(onPod, onRay)) < POD.radius ? onPod : null
}

export const pushDrift = (pod, walk, at) => knock(pod, at, viewOf(walk), WRECK.push)

// uB in corridor.frag.glsl: the pod's centre, then its turn as a quaternion
export const driftUniforms = pod => [...pod.p, 0, ...pod.q]
