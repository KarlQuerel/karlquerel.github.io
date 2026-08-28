// The flight, as pure maths: scroll position in, camera basis out. Nothing here
// touches WebGL or the DOM, so the whole flight can be reasoned about — and
// re-tuned — without going near the renderer.

import { clamp01, hermite, smoothstep } from './math.js'
import { add, cross, dot, lerp, mul, norm, slerp, sub } from './vec3.js'
import {
	BANK_GAIN,
	BANK_MAX,
	BANK_SPAN,
	ENTRY_START,
	FOCUS,
	HEADING_SPAN,
	LOOK_MAX,
	PATH,
	ROLL,
	SWAY_FADE,
	SWAY_MAX,
	TARGETS,
	UP,
	WAKE_SPAN,
	WAKE_START,
} from '../constants/flyby.js'

// Which keyframe interval `s` falls in. Every channel below is keyed on scroll the
// same way, so they share the search rather than each rolling their own.
function segment(keys, s) {
	let i = 0
	while (i < keys.length - 2 && s > keys[i + 1].s) i++
	return i
}

// Velocity at each waypoint, in world units per unit of scroll. Plain Catmull-Rom
// assumes evenly spaced knots; ours are not, so its tangents disagree across every
// knot and the camera kinks there. A three-point difference in s does not.
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

function rollAt(s) {
	const i = segment(ROLL, s)
	const t = smoothstep(clamp01((s - ROLL[i].s) / (ROLL[i + 1].s - ROLL[i].s || 1)))
	return lerp(ROLL[i].r, ROLL[i + 1].r, t)
}

// Full camera state at scroll `p`. `lookX/lookY` are the eased pointer position in
// -1..1; `still` is prefers-reduced-motion, which drops the scripted roll and the
// pointer look but never the flight itself — that is the reader's own scrolling.
export function sampleFlight(p, lookX, lookY, still) {
	// how far out of the still frame we are: drives the dust and the pointer look
	const wake = smoothstep(clamp01((p - WAKE_START) / WAKE_SPAN))

	const pos = camAt(p)
	const ahead = camAt(Math.min(1, p + HEADING_SPAN))
	const behind = camAt(Math.max(0, p - HEADING_SPAN))
	let fwd = norm(sub(ahead, behind))
	const travel = fwd // where we are actually going, before the camera turns to look

	// turn toward the world being passed, so it sweeps the frame instead of
	// just growing in the middle
	const f = focusAt(p)
	const aimAt = b => norm(sub(TARGETS[b].c, pos))
	// Turn the flight direction toward the world being watched. While the two
	// keyframes name the same world that is one rotation; across a handover the
	// pulls cross-fade, which beats switching the target index and snapping the
	// view across whatever angle separates them.
	if (f.b0 === f.b1) {
		const w = lerp(f.w0, f.w1, f.t)
		if (w > 0) fwd = slerp(fwd, aimAt(f.b0), w)
	} else {
		const pull0 = f.w0 * (1 - f.t)
		const pull1 = f.w1 * f.t
		if (pull0 > 0) fwd = slerp(fwd, aimAt(f.b0), pull0)
		if (pull1 > 0) fwd = slerp(fwd, aimAt(f.b1), pull1)
	}

	// A few degrees of look, off the world axes so it composes with the bank rather
	// than fighting it. Applied to the heading only - the flight path never moves.
	if (!still) {
		const amt = LOOK_MAX * (0.4 + 0.6 * wake)
		const rref = norm(cross(fwd, UP))
		fwd = norm(add(fwd, add(mul(rref, lookX * amt), mul(cross(rref, fwd), -lookY * amt))))
	}

	// Roll into the turn, from how far the path bends across the frame. Saturating
	// rather than clamped, so a hard turn eases over instead of hitting a stop and
	// kinking there - unbounded, this reached 80 degrees and cartwheeled the horizon.
	// Read over a wider span than the heading uses: the horizon should lean through
	// a whole turn, not twitch at every wiggle in the path. The window slides but
	// never shrinks - clamping its ends instead leaves a zero-length chord at s=1,
	// which flips the horizon on the last frame of the scroll.
	const bEnd = Math.min(1, Math.max(2 * BANK_SPAN, p + BANK_SPAN))
	const bMid = bEnd - BANK_SPAN
	const c0 = norm(sub(camAt(bMid), camAt(bMid - BANK_SPAN)))
	const c1 = norm(sub(camAt(bEnd), camAt(bMid)))
	const turn = dot(sub(c1, c0), norm(cross(fwd, UP)))
	const bank = BANK_MAX * Math.tanh((turn * BANK_GAIN) / BANK_MAX)
	// Rotate the frame about the way we are pointing. Tilting world up and rebuilding
	// from it - which is what this did - is only a roll while the angle is small: past
	// a quarter turn the axis it actually rotates about is the world's, not the
	// camera's, and a barrel roll through the name came out as a lurch.
	let right = norm(cross(fwd, UP))
	let up = cross(right, fwd)
	// The scripted roll is the one piece of this the reader did not ask for by scrolling,
	// so it is also the one piece that answers prefers-reduced-motion. The bank the path
	// earns stays: it is a couple of degrees and it follows the flight.
	const roll = bank + (still ? 0 : rollAt(p))
	if (roll !== 0) {
		const cr = Math.cos(roll)
		const sr = Math.sin(roll)
		right = norm(add(mul(right, cr), mul(up, sr)))
		up = cross(right, fwd)
	}

	const entry = clamp01((p - ENTRY_START) / (1 - ENTRY_START))
	// shake while the shield is hot
	const heat = smoothstep(clamp01(entry / 0.4)) * smoothstep(clamp01((0.95 - entry) / 0.4))
	const jit = k => (Math.sin(p * 9000 + k) + Math.sin(p * 23000 + k * 3)) * 0.0016 * heat
	right = norm(add(right, [0, jit(1), 0]))
	up = norm(add(up, [jit(2), 0, 0]))

	// The eye, as opposed to the path: everything above still keys off pos, so the
	// flight plan is untouched and only the viewpoint slides.
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
