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
	stride: 0,
	pace: 0,
	moved: false,
})

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
	// a diagonal is no faster than a straight walk
	const speed = ahead && side ? WALK.speed * Math.SQRT1_2 : WALK.speed
	w.ahead = approach(w.ahead, ahead * speed, dt, WALK.easeS)
	w.side = approach(w.side, side * speed, dt, WALK.easeS)
	w.turn = approach(w.turn, turn * WALK.turnRate, dt, WALK.easeS)
	w.heading += w.turn * dt
	const sin = Math.sin(w.heading)
	const cos = Math.cos(w.heading)
	const x = clamp(w.x + (sin * w.ahead + cos * w.side) * dt, -box.halfWidth, box.halfWidth)
	const z = clamp(w.z + (cos * w.ahead - sin * w.side) * dt, box.back, box.front)
	// pace from the ground covered, not the speed asked: pushing into a wall is standing still
	const covered = Math.hypot(x - w.x, z - w.z)
	w.stride += covered * WALK.strideRad
	w.pace = Math.min(1, covered / dt / WALK.speed)
	w.x = x
	w.z = z
}
