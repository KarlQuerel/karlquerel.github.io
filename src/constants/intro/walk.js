// The player's walk in the scenes they move through, in world units (the corridor is 3.2 wide) and seconds.

// Physical keys (event.code), so ZQSD on an AZERTY keyboard walks like WASD. The mouse looks; the
// side arrows turn, for a player on the keyboard alone.
export const WALK_KEYS = {
	forward: ['KeyW', 'ArrowUp'],
	back: ['KeyS', 'ArrowDown'],
	strafeLeft: ['KeyA'],
	strafeRight: ['KeyD'],
	turnLeft: ['ArrowLeft'],
	turnRight: ['ArrowRight'],
	// push, read, check: the verb on what the view rests on
	use: ['KeyE'],
	// the suit: hold to run, hold to bring the wrist readout up
	sprint: ['ShiftLeft', 'ShiftRight'],
	wrist: ['Tab'],
}

export const WALK = {
	// a brisk walk: faster and the legs could only keep up at a run
	speed: 1.6,
	// the longest frame one step may take: a stalled frame (a shader compiling) would otherwise carry the body
	// through a wall in a single stride
	stepS: 0.1,
	// a run, with Shift held: this much faster than the walk
	sprint: 1.75,
	// a side step and a step back are shorter than a stride: their share of the walk's speed
	strafe: 0.7,
	back: 0.6,
	// radians per second at a full turn
	turnRate: 1.9,
	// how quickly the body answers the keys: a camera has mass
	easeS: 0.14,
	// radians per pixel of mouse travel, and how far the head tips: down far enough to see the boots
	lookRad: 0.0022,
	pitchUp: 0.9,
	pitchDown: 1.3,
	// standing, the head rises and falls with the breath: how far, over how long
	breathe: 0.004,
	breathS: 4,
}
