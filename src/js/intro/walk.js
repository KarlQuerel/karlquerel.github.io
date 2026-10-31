// The player's walk on a flat deck: the held keys to a position kept inside a box, the mouse to a look.

import { WALK, WALK_KEYS } from '../../constants/intro/walk.js'
import { approach, clamp } from '../math.js'

const held = (keys, codes) => (codes.some(code => keys.has(code)) ? 1 : 0)

export const createWalk = ({ x, z }) => ({
	x,
	z,
	heading: 0,
	pitch: 0,
	ahead: 0,
	side: 0,
	turn: 0,
	vx: 0,
	vz: 0,
	pace: 0,
	sprint: false,
	moved: false,
})

// standing, the head rises and falls with the breath
export const breathe = t => WALK.breathe * Math.sin((2 * Math.PI * t) / WALK.breathS)

// [dx, dy]: mouse travel in px since the last frame
export function lookWalk(w, [dx, dy]) {
	w.heading += dx * WALK.lookRad
	w.pitch = clamp(w.pitch - dy * WALK.lookRad, -WALK.pitchDown, WALK.pitchUp)
}

// box: { halfWidth, back, front }, the deck's reach across x and along z
export function stepWalk(w, keys, dt, box) {
	const ahead = held(keys, WALK_KEYS.forward) - held(keys, WALK_KEYS.back)
	const side = held(keys, WALK_KEYS.strafeRight) - held(keys, WALK_KEYS.strafeLeft)
	const turn = held(keys, WALK_KEYS.turnRight) - held(keys, WALK_KEYS.turnLeft)
	if (ahead || side || turn) w.moved = true
	// a run: faster, and the suit pays for it in air (the shot spends it)
	w.sprint = !!(ahead || side) && held(keys, WALK_KEYS.sprint) > 0
	const speed = WALK.speed * (w.sprint ? WALK.sprint : 1)
	// a stride forward, a shorter step back or to the side, and a diagonal between the two: the speed
	// runs round an ellipse of the three
	const share =
		ahead || side
			? speed / Math.hypot(ahead / (ahead < 0 ? WALK.back : 1), side / WALK.strafe)
			: 0
	w.ahead = approach(w.ahead, ahead * share, dt, WALK.easeS)
	w.side = approach(w.side, side * share, dt, WALK.easeS)
	w.turn = approach(w.turn, turn * WALK.turnRate, dt, WALK.easeS)
	w.heading += w.turn * dt
	const sin = Math.sin(w.heading)
	const cos = Math.cos(w.heading)
	const x = clamp(w.x + (sin * w.ahead + cos * w.side) * dt, -box.halfWidth, box.halfWidth)
	const z = clamp(w.z + (cos * w.ahead - sin * w.side) * dt, box.back, box.front)
	// what the walls let through: pushing into one is standing still
	w.vx = (x - w.x) / dt
	w.vz = (z - w.z) / dt
	w.pace = Math.min(WALK.sprint, Math.hypot(w.vx, w.vz) / WALK.speed)
	w.x = x
	w.z = z
}
