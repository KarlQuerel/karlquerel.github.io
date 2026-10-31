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
	// one step: how long a full stride keeps the boot in the air and how far it carries it (a shorter
	// step takes its share of that, never under quickS), how high it peels up behind (a quarter into
	// the swing), how long both boots stay down between steps, how far ahead of the moving body it
	// lands (s of travel)
	stepS: 0.4,
	stride: 0.8,
	quickS: 0.26,
	lift: 0.22,
	dwellS: 0.1,
	leadS: 0.2,
	// no two steps alike: how much a step's length and timing wander (a share), and how far a boot
	// strays from its spot
	vary: 0.08,
	wander: 0.03,
	// how far the feet turn toward a sideways walk (rad), how far off straight ahead a walk counts
	// as backward, and how much sooner the boot on the side the body is going steps than the other
	turnIn: 0.75,
	backFrom: 1.8,
	leadBias: 0.3,
	// two boots never come closer than this across; a planted boot no further than this from its
	// spot, across and along the feet, before it is dragged along
	gap: 0.14,
	stretch: [0.32, 0.65],
	// The legs under the head, as body() in corridor.frag.glsl draws them (it keeps the same numbers):
	// the hip across, up and back from the foot of the eye, the boot's height, how far the knee
	// straightens, how far a boot turns out, how it rolls up on its toe behind the hip and back on its
	// heel ahead ([from, per unit, up to] rad), pivoting this far along the boot (toe, heel).
	leg: {
		hip: [0.1, 0.9, 0.16],
		boot: 0.08,
		length: 0.808,
		toeOut: 0.1,
		toeRoll: [0.12, 1.6, 0.9],
		heelRoll: [0.18, 1.8, 0.5],
		pivot: [0.19, 0.08],
	},
	// the head rides the pelvis, which the leg bearing the weight holds up, its knee this much short
	// of straight: the head's share of that rise and fall, of the lean over the boot, and how quickly
	// it follows (dropping onto a landing boot, rising over it)
	kneeGive: 0.008,
	headBob: 0.4,
	headSway: 0.12,
	headS: [0.03, 0.09],
}
