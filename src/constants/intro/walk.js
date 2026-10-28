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
}

const SPEED = 2.2
const STRIDE_HZ = 1.25

export const WALK = {
	// the old scripted walk's pace, with its stride: 1.25 a second at full pace
	speed: SPEED,
	strideRad: (STRIDE_HZ * 2 * Math.PI) / SPEED,
	// radians per second at a full turn
	turnRate: 1.9,
	// how quickly the body answers the keys: a camera has mass
	easeS: 0.14,
	// radians per pixel of mouse travel, and how far the head tips: down far enough to see the boots
	lookRad: 0.0022,
	pitchUp: 0.9,
	pitchDown: 1.2,
}
