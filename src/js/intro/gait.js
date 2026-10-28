// The boots under a walk: each stays where it was set down and steps, one at a time, once the body
// has left it behind or turned away from it. Small turns of the head leave them planted.

import { GAIT } from '../../constants/intro/walk.js'
import { smoothstep } from '../math.js'

const SIDES = [-1, 1]
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))

// where the boot on side sd (-1 left) stands under a body at (x, z) facing yaw
function standAt(x, z, yaw, sd) {
	const sin = Math.sin(yaw)
	const cos = Math.cos(yaw)
	return {
		x: x + cos * sd * GAIT.side + sin * GAIT.ahead,
		z: z - sin * sd * GAIT.side + cos * GAIT.ahead,
		yaw,
	}
}

export const createGait = w => ({
	yaw: w.heading,
	steps: 0,
	feet: SIDES.map(sd => ({ sd, ...standAt(w.x, w.z, w.heading, sd), lift: 0, from: null, t: 0 })),
})

// where a stepping boot lands: ahead of the moving body, and never across the other boot
function landing(g, w, foot, other) {
	const at = standAt(w.x + w.vx * GAIT.leadS, w.z + w.vz * GAIT.leadS, g.yaw, foot.sd)
	const sin = Math.sin(g.yaw)
	const cos = Math.cos(g.yaw)
	const short = GAIT.gap - foot.sd * (cos * (at.x - other.x) - sin * (at.z - other.z))
	if (short > 0) {
		at.x += cos * foot.sd * short
		at.z -= sin * foot.sd * short
	}
	return at
}

export function stepGait(g, w, dt) {
	const walking = w.pace > GAIT.walking
	if (walking || Math.abs(wrap(w.heading - g.yaw)) > GAIT.deadZone) g.yaw = w.heading
	// a planted boot the body outruns while the other is in the air (setting off, a fast strafe) is
	// dragged along, rather than the leg stretched past its length
	for (const f of g.feet) {
		if (f.from) continue
		const at = standAt(w.x, w.z, g.yaw, f.sd)
		const far = Math.hypot(f.x - at.x, f.z - at.z)
		if (far <= GAIT.stretch) continue
		f.x = at.x + ((f.x - at.x) * GAIT.stretch) / far
		f.z = at.z + ((f.z - at.z) * GAIT.stretch) / far
	}
	const lifted = g.feet.find(f => f.from)
	if (lifted) {
		// aimed again every frame, so a step follows the body if it changes course mid-stride
		const to = landing(
			g,
			w,
			lifted,
			g.feet.find(f => f !== lifted)
		)
		lifted.t = Math.min(1, lifted.t + dt / GAIT.stepS)
		const e = smoothstep(lifted.t)
		lifted.x = lifted.from.x + (to.x - lifted.from.x) * e
		lifted.z = lifted.from.z + (to.z - lifted.from.z) * e
		lifted.yaw = lifted.from.yaw + wrap(to.yaw - lifted.from.yaw) * e
		lifted.lift = GAIT.lift * Math.sin(Math.PI * lifted.t)
		if (lifted.t < 1) return
		lifted.from = null
		lifted.lift = 0
		g.steps++
		return
	}
	// Both down: the boot furthest from where it would land steps, once it is far enough out. Measured
	// against the landing, not the rest spot, or the boot just set down ahead counts as out and goes again.
	const reach = walking ? GAIT.reach : GAIT.settle
	let worst = null
	let most = 1
	for (const f of g.feet) {
		const at = landing(
			g,
			w,
			f,
			g.feet.find(o => o !== f)
		)
		const off = Math.max(
			Math.hypot(f.x - at.x, f.z - at.z) / reach,
			Math.abs(wrap(f.yaw - g.yaw)) / GAIT.twist
		)
		if (off > most) {
			most = off
			worst = f
		}
	}
	if (!worst) return
	worst.from = { x: worst.x, z: worst.z, yaw: worst.yaw }
	worst.t = 0
}

// a full turn a step, from a quarter back: the head is lowest as a boot lands, highest mid-step
export const gaitPhase = g =>
	2 * Math.PI * (g.steps + (g.feet.find(f => f.from)?.t ?? 0)) - Math.PI / 2

// a boot in the frame of the body at the walk's spot facing the head: [across, ahead, lift, yaw]
export function footFrame(f, w) {
	const sin = Math.sin(w.heading)
	const cos = Math.cos(w.heading)
	const dx = f.x - w.x
	const dz = f.z - w.z
	return [cos * dx - sin * dz, sin * dx + cos * dz, f.lift, wrap(f.yaw - w.heading)]
}
