// The boots under a walk: each stays where it was set down and steps, one at a time, once the body
// has left it behind or turned away from it. Small turns of the head leave them planted. The feet
// turn part way toward a sideways walk, and a short step is a quick one. The head rides on the leg
// bearing the weight, which a landing boot takes over, and leans over that boot.

import { GAIT } from '../../constants/intro/walk.js'
import { approach, clamp, randIn, smoothstep } from '../math.js'

const SIDES = [-1, 1]
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))
// a swing's height curve t(1-t)^3 at its peak, a quarter in: the boot peels up behind and skims forward
const SWING_PEAK = 0.25 * 0.75 ** 3

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

// lope: on a lighter world every step is this much longer, slower and higher (1 on the deck)
export function createGait(w, lope = 1) {
	const feet = SIDES.map(sd => ({
		sd,
		...standAt(w.x, w.z, w.heading, sd),
		lift: 0,
		from: null,
		t: 0,
		dur: GAIT.stepS * lope,
		wander: [0, 0],
	}))
	return {
		yaw: w.heading,
		// the boot bearing the weight, the head's rise over that leg and its lean across, from the eye's rest
		stance: feet[0],
		rise: 0,
		sway: 0,
		steps: 0,
		// seconds since both boots were last on the deck together, and how long they stay so this time
		down: 0,
		dwell: GAIT.dwellS,
		lope,
		feet,
	}
}

// where a stepping boot lands: ahead of the moving body, a little astray, and never across the other boot
function landing(g, w, foot, other) {
	const at = standAt(w.x + w.vx * GAIT.leadS, w.z + w.vz * GAIT.leadS, g.yaw, foot.sd)
	at.x += foot.wander[0]
	at.z += foot.wander[1]
	const sin = Math.sin(g.yaw)
	const cos = Math.cos(g.yaw)
	const short = GAIT.gap - foot.sd * (cos * (at.x - other.x) - sin * (at.z - other.z))
	if (short > 0) {
		at.x += cos * foot.sd * short
		at.z -= sin * foot.sd * short
	}
	return at
}

// How high the pelvis rides on the leg standing on boot b ([across, ahead, lift, yaw] in the head's
// frame), the hips turned the way the boots point: the boot rolls up on its toe as the body leaves
// it behind and lands on its heel ahead, as the shader draws it, and the knee straightens no further.
function legReach(b, sd, hipAhead, sway) {
	const { hip, boot, length, toeOut, toeRoll, heelRoll, pivot } = GAIT.leg
	const hx = sway + hipAhead[1] * sd * hip[0]
	const hz = -hip[2] - hipAhead[0] * sd * hip[0]
	const yaw = b[3] + sd * toeOut
	const ahead = (b[0] - hx) * hipAhead[0] + (b[1] - hz) * hipAhead[1]
	const roll =
		ahead < 0
			? clamp((-ahead - toeRoll[0]) * toeRoll[1], 0, toeRoll[2])
			: -clamp((ahead - heelRoll[0]) * heelRoll[1], 0, heelRoll[2])
	const along = roll > 0 ? pivot[0] : -pivot[1]
	const cr = Math.cos(roll)
	const sr = Math.sin(roll)
	// the ankle, swung about the pivot on the deck
	const shift = along * (1 - cr) + boot * sr
	const ax = b[0] + Math.sin(yaw) * shift - hx
	const az = b[1] + Math.cos(yaw) * shift - hz
	const ay = Math.max(b[2], 0) + along * sr + boot * cr
	return Math.min(hip[1], ay + Math.sqrt(Math.max(length * length - ax * ax - az * az, 0)))
}

// the head over the legs: it rides the pelvis, which the leg bearing the weight holds up on a soft
// knee (lowest as the boot lands, highest passing over it) and carries across over that boot
function rideLegs(g, w, dt) {
	const boots = g.feet.map(f => footFrame(f, w))
	const hipYaw = Math.atan2(
		boots.reduce((a, b) => a + Math.sin(b[3]), 0),
		boots.reduce((a, b) => a + Math.cos(b[3]), 0)
	)
	const hipAhead = [Math.sin(hipYaw), Math.cos(hipYaw)]
	const stance = boots[g.feet.indexOf(g.stance)]
	const height = legReach(stance, g.stance.sd, hipAhead, g.sway) - GAIT.kneeGive
	const rise = (height - GAIT.leg.hip[1]) * GAIT.headBob
	g.rise = approach(g.rise, rise, dt, GAIT.headS[rise < g.rise ? 0 : 1])
	// the lean comes with the walk: standing, the feet shuffle round under a still head
	g.sway = approach(g.sway, stance[0] * GAIT.headSway * w.pace, dt, GAIT.headS[1])
}

export function stepGait(g, w, dt) {
	rideLegs(g, w, dt)
	const walking = w.pace > GAIT.walking
	// the feet turn toward a sideways walk as far as the hips allow, and away from one backward, so
	// the body walks along them; a step straight back keeps them straight
	let toward = Math.atan2(w.side, w.ahead)
	if (Math.abs(toward) > GAIT.backFrom) toward = wrap(toward - Math.PI)
	const yaw = w.heading + (walking ? clamp(toward, -GAIT.turnIn, GAIT.turnIn) : 0)
	if (walking || Math.abs(wrap(yaw - g.yaw)) > GAIT.deadZone) g.yaw = yaw
	// a planted boot the body outruns while the other is in the air (setting off, a wall) is dragged
	// along, rather than the leg stretched past its length
	const sin = Math.sin(g.yaw)
	const cos = Math.cos(g.yaw)
	for (const f of g.feet) {
		if (f.from) continue
		const at = standAt(w.x, w.z, g.yaw, f.sd)
		const dx = f.x - at.x
		const dz = f.z - at.z
		const far = Math.hypot(
			(cos * dx - sin * dz) / GAIT.stretch[0],
			(sin * dx + cos * dz) / GAIT.stretch[1]
		)
		if (far <= 1) continue
		f.x = at.x + dx / far
		f.z = at.z + dz / far
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
		lifted.t = Math.min(1, lifted.t + dt / lifted.dur)
		const e = smoothstep(lifted.t)
		const quick = lifted.dur / (GAIT.stepS * g.lope)
		lifted.x = lifted.from.x + (to.x - lifted.from.x) * e
		lifted.z = lifted.from.z + (to.z - lifted.from.z) * e
		lifted.yaw = lifted.from.yaw + wrap(to.yaw - lifted.from.yaw) * e
		lifted.lift = (GAIT.lift * g.lope * quick * lifted.t * (1 - lifted.t) ** 3) / SWING_PEAK
		if (lifted.t < 1) return
		// the weight comes onto the boot as it lands
		lifted.from = null
		lifted.lift = 0
		g.stance = lifted
		g.steps++
		g.down = 0
		g.dwell = GAIT.dwellS * quick
		return
	}
	// a walk keeps both boots down a moment between steps; only a run leaves the deck at once
	g.down += dt
	if (walking && g.down < g.dwell) return
	// Both down: the boot furthest from where it would land steps, once it is far enough out. Measured
	// against the landing, not the rest spot, or the boot just set down ahead counts as out and goes again.
	const reach = walking ? GAIT.reach : GAIT.settle
	// the boot on the side the body is going steps first: a side step leads with the outer boot
	const across = cos * w.vx - sin * w.vz
	let worst = null
	let most = 1
	let travel = 0
	for (const f of g.feet) {
		const at = landing(
			g,
			w,
			f,
			g.feet.find(o => o !== f)
		)
		const far = Math.hypot(f.x - at.x, f.z - at.z)
		const off =
			Math.max(far / reach, Math.abs(wrap(f.yaw - g.yaw)) / GAIT.twist) *
			(1 + GAIT.leadBias * Math.max(0, Math.sign(f.sd * across)))
		if (off > most) {
			most = off
			worst = f
			travel = far
		}
	}
	if (!worst) return
	worst.from = { x: worst.x, z: worst.z, yaw: worst.yaw }
	worst.t = 0
	// a short step is a quick one: a side step, a shuffle round, a settle; and no two steps alike
	const stray = [-GAIT.wander, GAIT.wander]
	worst.wander = [randIn(stray), randIn(stray)]
	worst.dur =
		clamp((GAIT.stepS * travel) / GAIT.stride, GAIT.quickS, GAIT.stepS) *
		g.lope *
		(1 + randIn([-GAIT.vary, GAIT.vary]))
	// the weight stays on the other boot while this one is in the air
	g.stance = g.feet.find(f => f !== worst)
	// the left boot steps on an even count, the right on an odd one, even when one steps twice
	if (g.steps % 2 !== (worst.sd + 1) / 2) g.steps++
}

// a boot in the frame of the body at the walk's spot facing the head: [across, ahead, lift, yaw]
export function footFrame(f, w) {
	const sin = Math.sin(w.heading)
	const cos = Math.cos(w.heading)
	const dx = f.x - w.x
	const dz = f.z - w.z
	return [cos * dx - sin * dz, sin * dx + cos * dz, f.lift, wrap(f.yaw - w.heading)]
}
