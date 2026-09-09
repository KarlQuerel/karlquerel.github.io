// The flight: scroll in, camera basis out. No WebGL or DOM here, so it can be re-tuned in isolation.

import { clamp01, hermite, smoothstep } from './math.js'
import { add, cross, dot, lerp, mul, norm, slerp, sub } from './vec3.js'
import {
	BANK_GRAVITY,
	BODIES,
	BANK_LEAD,
	BANK_MAX,
	BANK_MAX_STILL,
	BANK_SPAN,
	ENTRY_START,
	FOCUS,
	HEADING_SPAN,
	LOOK_MAX,
	MAX_FRAME_DT,
	PATH,
	RING_NORMAL,
	ROLL_DAMPING,
	ROLL_FREQ,
	ROLL_REST,
	SWAY_FADE,
	SWAY_MAX,
	TARGETS,
	UP,
	WAKE_SPAN,
	WAKE_START,
} from '../constants/flyby.js'

// The ring plane's own axes, for anything that has to travel in it.
const RING_E1 = norm(cross(RING_NORMAL, UP))
const RING_E2 = cross(RING_NORMAL, RING_E1)

// Where a body sits at scroll `s`. All but one are fixed; the shepherd carries an orbit in the ring plane.
export function bodyAt(b, s) {
	if (!b.orbit) return b.c
	const th = (b.orbit.phase + b.orbit.sweep * s) * 2 * Math.PI
	const arm = add(mul(RING_E1, Math.cos(th) * b.orbit.r), mul(RING_E2, Math.sin(th) * b.orbit.r))
	return add(BODIES[b.orbit.about].c, arm)
}

// Which keyframe interval `s` falls in — every channel keys on scroll the same way and shares the search.
function segment(keys, s) {
	let i = 0
	while (i < keys.length - 2 && s > keys[i + 1].s) i++
	return i
}

// Velocity per waypoint. Catmull-Rom assumes even knots; ours are not, so it kinks. A 3-point difference does not.
const TAN = PATH.map((_, j) => {
	const a = PATH[Math.max(0, j - 1)]
	const b = PATH[Math.min(PATH.length - 1, j + 1)]
	return mul(sub(b.p, a.p), 1 / (b.s - a.s || 1))
})

// cubic Hermite through the waypoints, keyed on scroll
export function camAt(s) {
	const i = segment(PATH, s)
	const h = PATH[i + 1].s - PATH[i].s || 1
	const t = clamp01((s - PATH[i].s) / h)
	const out = []
	for (let k = 0; k < 3; k++) {
		out[k] = hermite(PATH[i].p[k], PATH[i + 1].p[k], TAN[i][k], TAN[i + 1][k], h, t)
	}
	return out
}

function focusAt(s) {
	const i = segment(FOCUS, s)
	const t = smoothstep(clamp01((s - FOCUS[i].s) / (FOCUS[i + 1].s - FOCUS[i].s || 1)))
	return { b0: FOCUS[i].b, b1: FOCUS[i + 1].b, w0: FOCUS[i].w, w1: FOCUS[i + 1].w, t }
}

// The chord across the heading window. Clamping the ends keeps s=1 from a zero-length chord.
const chordAt = s => sub(camAt(Math.min(1, s + HEADING_SPAN)), camAt(Math.max(0, s - HEADING_SPAN)))
const headingAt = s => norm(chordAt(s))
const speedAt = s => Math.hypot(...chordAt(s)) / (2 * HEADING_SPAN)

// The bank a coordinated turn asks for: atan(yaw rate x speed / BANK_GRAVITY) puts lift where it cancels.
function bankAt(s, still) {
	const level = norm(cross(headingAt(s), UP))
	const dh = sub(headingAt(Math.min(1, s + BANK_SPAN)), headingAt(Math.max(0, s - BANK_SPAN)))
	const yawRate = dot(dh, level) / (2 * BANK_SPAN)
	const cap = still ? BANK_MAX_STILL : BANK_MAX
	return Math.max(-cap, Math.min(cap, Math.atan((speedAt(s) * yawRate) / BANK_GRAVITY)))
}

// Roll velocity lives between frames, so the caller holds it. One per mounted flight.
export const createRollState = () => ({ angle: 0, vel: 0, settled: true })

// Semi-implicit Euler on a damped spring: stable here, and its velocity is an airframe's lag and overshoot.
function stepRoll(state, target, dt) {
	const step = Math.min(dt, MAX_FRAME_DT)
	const acc =
		ROLL_FREQ * ROLL_FREQ * (target - state.angle) - 2 * ROLL_DAMPING * ROLL_FREQ * state.vel
	state.vel += acc * step
	state.angle += state.vel * step
	// the frame loop stops drawing when the scroll stops, so it must be told the horizon still has momentum
	state.settled = Math.abs(state.vel) < ROLL_REST && Math.abs(target - state.angle) < ROLL_REST
	return state.angle
}

// Full camera state at scroll `p`. `still` is prefers-reduced-motion: it drops the look and most of the bank.
export function sampleFlight(p, lookX, lookY, still, rollState, dt) {
	// how far out of the still frame we are: drives the dust and the pointer look
	const wake = smoothstep(clamp01((p - WAKE_START) / WAKE_SPAN))

	const pos = camAt(p)
	const ahead = camAt(Math.min(1, p + HEADING_SPAN))
	const behind = camAt(Math.max(0, p - HEADING_SPAN))
	let fwd = norm(sub(ahead, behind))
	const travel = fwd // where we are actually going, before the camera turns to look

	// turn toward the world being passed, so it sweeps the frame instead of growing in the middle
	const f = focusAt(p)
	const aimAt = b => norm(sub(TARGETS[b].c, pos))
	// One rotation while both keyframes name the same world; across a handover the pulls cross-fade.
	if (f.b0 === f.b1) {
		const w = lerp(f.w0, f.w1, f.t)
		if (w > 0) fwd = slerp(fwd, aimAt(f.b0), w)
	} else {
		const pull0 = f.w0 * (1 - f.t)
		const pull1 = f.w1 * f.t
		if (pull0 > 0) fwd = slerp(fwd, aimAt(f.b0), pull0)
		if (pull1 > 0) fwd = slerp(fwd, aimAt(f.b1), pull1)
	}

	// A few degrees of look, off the world axes so it composes with the bank. Heading only — the path never moves.
	if (!still) {
		const amt = LOOK_MAX * (0.4 + 0.6 * wake)
		const rref = norm(cross(fwd, UP))
		fwd = norm(add(fwd, add(mul(rref, lookX * amt), mul(cross(rref, fwd), -lookY * amt))))
	}

	// Roll read forward: a pilot rolls into a turn before the nose comes round.
	const roll = stepRoll(rollState, bankAt(Math.min(1, p + BANK_LEAD), still), dt)

	// Roll about the axis the flight travels down, not the one the camera happens to look down.
	const rt = norm(cross(travel, UP))
	const ut = cross(rt, travel)
	const cr = Math.cos(roll)
	const sr = Math.sin(roll)
	const horizon = cross(norm(add(mul(rt, cr), mul(ut, sr))), travel)
	// then hang the camera's own frame off that horizon, aimed wherever it is aimed
	const across = cross(fwd, horizon)
	let right = Math.hypot(...across) > 1e-4 ? norm(across) : norm(cross(fwd, UP))
	let up = cross(right, fwd)

	const entry = clamp01((p - ENTRY_START) / (1 - ENTRY_START))
	// shake while the shield is hot
	const heat = smoothstep(clamp01(entry / 0.4)) * smoothstep(clamp01((0.95 - entry) / 0.4))
	const jit = k => (Math.sin(p * 9000 + k) + Math.sin(p * 23000 + k * 3)) * 0.0016 * heat
	right = norm(add(right, [0, jit(1), 0]))
	up = norm(add(up, [jit(2), 0, 0]))

	// The eye, not the path: everything above keys off pos, so only the viewpoint slides.
	const sway = SWAY_MAX * (1 - smoothstep(clamp01(p / SWAY_FADE)))
	const eye =
		still || sway <= 0 ? pos : add(pos, add(mul(right, lookX * sway), mul(up, -lookY * sway)))

	return {
		eye,
		fwd,
		right,
		up,
		travel,
		entry,
		wake,
		// world units per unit of scroll — drives the dust streak length
		speed: Math.hypot(...sub(ahead, behind)) / (2 * HEADING_SPAN),
	}
}
