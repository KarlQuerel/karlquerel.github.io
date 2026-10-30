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
	// push, and later every other verb on what the view rests on
	use: ['KeyE'],
}

export const WALK = {
	// a brisk walk: faster and the legs could only keep up at a run
	speed: 1.6,
	// radians per second at a full turn
	turnRate: 1.9,
	// how quickly the body answers the keys: a camera has mass
	easeS: 0.14,
	// radians per pixel of mouse travel, and how far the head tips: down far enough to see the boots
	lookRad: 0.0022,
	pitchUp: 0.9,
	pitchDown: 1.3,
}

// The feet under the walk: each boot stays where it was set down until the body leaves it behind.
export const GAIT = {
	// where a boot stands from the eye: across, and ahead (behind it, just in front of the hip)
	side: 0.12,
	ahead: -0.1,
	// a boot steps once it is this far from where it should stand, walking or settling at rest,
	// or turned this far from the body
	reach: 0.3,
	settle: 0.08,
	twist: 0.45,
	// below this pace the body is standing: the head turns this far before the body follows it
	walking: 0.15,
	deadZone: 0.6,
	// one step: how long the boot is in the air, how high it peels up behind (a quarter into the swing),
	// how long both boots stay down between steps, how far ahead of the moving body it lands (s of travel)
	stepS: 0.36,
	lift: 0.15,
	dwellS: 0.1,
	leadS: 0.21,
	// two boots never come closer than this across; a planted boot no further than this from its spot
	gap: 0.14,
	stretch: 0.7,
}
