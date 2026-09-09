// Every tuned number the landing flyby is made of; useFlyby.js hard-codes none.

import { norm } from '../js/vec3.js'

const DEG = Math.PI / 180

// Radius 1 = ~Earth; bodies strung along -Z so the camera flies a corridor.
export const BODIES = [
	// y is solved: hides the destination s=0.196..0.241 so its reveal is its own beat.
	{ c: [10.15, 4.0, -60], r: 3.0, pid: 0, spin: 0.9, ring: [4.3, 7.2] },
	{ c: [14, -3.0, -186], r: 6.0, pid: 1, spin: 0.2, ring: [0, 0] }, // the destination
	// Hides the corridor by blocking it; x is solved to sit the horizon under the name.
	{ c: [10.25, -6, -25], r: 12.0, pid: 2, spin: 0.12, ring: [0, 0] },
	// Hides the destination again to s=0.527. Must stay smooth: rockRadius bulges 30%, pass at 1.36r.
	{ c: [8.55, -1.17, -148.2], r: 3.68, pid: 3, spin: 0.16, ring: [0, 0] },
	// Free bodies: on the system plane, phase 55-125 for a terminator, faint enough to sit at rest.
	{ c: [1.39, 36.34, -142.55], r: 1.42, pid: 4, spin: 0.27, ring: [0, 0] },
	// the small half of the binary: 12 units out, tilted so the pair carries its own inclination
	{ c: [66.5, -1.5, -222.5], r: 1.16, pid: 7, spin: 0.33, ring: [0, 0] },
	{ c: [-29.96, 82.6, -472.12], r: 3.17, pid: 8, spin: 0.06, ring: [0, 0] },
	// upper-left, mid-flight: on screen s=0.35..0.72 while everything else is right
	{ c: [-42, 47, -345], r: 3.04, pid: 9, spin: 0.09, ring: [0, 0] },
	{ c: [73.69, 5.31, -229.16], r: 2.18, pid: 6, spin: 0.14, ring: [0, 0] },
	// Moons: a fifth to a third of the primary, 3-6 radii out, never on a scripted reveal.
	{
		orbit: { about: 0, r: 7.6, phase: 0.205, sweep: -0.09 },
		r: 0.56,
		pid: 2,
		spin: 0.41,
		ring: [0, 0],
	},
	// Beside and below the corridor moon (4.3 radii) so the two read as a pair.
	{ c: [19.55, -11.67, -152.7], r: 1.08, pid: 4, spin: 0.35, ring: [0, 0] },
	{ c: [18.36, 13.33, -218.77], r: 2.07, pid: 2, spin: 0.19, ring: [0, 0] },
]

// Marched in the scene shader so they occlude each other, and never on the destination sightline.
export const ROCKS = [
	{ c: [4.2, -1.6, -104.5], r: 1.3, spin: 3.1, tumble: 1.9 },
	// The only one over the top: 30 degrees elevation, so the corridor is not a row at eye level.
	{ c: [3.2, 4.86, -83.17], r: 1.24, spin: 4.3, tumble: 2.9 },
	// The only pass on the left; placed for how big it gets while still in frame (10 degrees at s=0.51).
	{ c: [-1, -2, -125], r: 1.9, spin: 2.3, tumble: 3.7 },
]

// what the camera can be asked to watch — not the rocks: they sweep through frame on their own
export const TARGETS = [BODIES[0], BODIES[1]]

// s = scroll progress, p = world position. One arc: y and z never reverse.
export const PATH = [
	// The first three x values are solved together: name centred, opening horizon level.
	{ s: 0.0, p: [10.0, 2.6, 24] },
	{ s: 0.123, p: [10.0, 3.4, 18] }, // still frame ends here, engines light
	// Carries straight on into the ridge turn so the two read as one manoeuvre; ridge still passed at 1.20 radii.
	{ s: 0.194, p: [9.8, 6.0, 4] }, // climbing: the ridge starts to drop away
	{ s: 0.255, p: [7.8, 8.6, -20] }, // up and over it, and the system is just there
	{ s: 0.306, p: [6.9, 6.4, -44] }, // settling back onto the corridor
	{ s: 0.356, p: [3.8, 4.4, -61.2] }, // through the ring plane, near its outer edge
	{ s: 0.415, p: [3.4, 2.4, -78] }, // wider and slower: a close pass sweeps the frame
	{ s: 0.475, p: [3.0, 1.2, -103] }, // faster than the eye wants to follow
	{ s: 0.519, p: [2.6, -0.1, -118] },
	{ s: 0.6, p: [2.8, -0.7, -136] }, // the low point; from here it only opens out
	{ s: 0.7, p: [4.6, -1.1, -158] },
	{ s: 0.78, p: [8.0, -1.5, -168] }, // lining up on the approach axis
	{ s: 0.86, p: [11.6, -2.2, -174] },
	{ s: 0.93, p: [13.4, -2.8, -176.5] }, // from here it is a straight run in
	{ s: 1.0, p: [14.0, -3.0, -179.1] }, // dead radial, into the atmosphere
]

// which world the camera turns to watch and how hard: b = world, w = turn strength
export const FOCUS = [
	// Weights stay low: every degree the camera turns is a degree the reader's eye must follow.
	{ s: 0.0, b: 0, w: 0 },
	{ s: 0.24, b: 0, w: 0.08 },
	// Must be back to zero by the closest pass at s=0.349, or the camera follows what it has passed.
	{ s: 0.3, b: 0, w: 0.24 },
	{ s: 0.345, b: 0, w: 0 },
	{ s: 0.78, b: 1, w: 0.25 }, // then nothing but the destination, dead centre
	{ s: 0.88, b: 1, w: 0.45 },
	{ s: 1.0, b: 1, w: 0.55 },
]

export const UP = [0, 1, 0]
export const SUN = norm([0.82, 0.3, 0.48])
// The system's plane, doubling as the ring normal and the belt's scatter plane, so they cannot drift.
export const RING_NORMAL = norm([0.2, 1.0, 0.13])

// FOCAL is the cotangent of the HALF angle (uv.y spans -0.5..0.5), so this is 58 degrees end to end.
export const FOCAL = 1 / Math.tan((58 * Math.PI) / 360)

export const ENTRY_START = 0.87
// the dust wakes with the engines, not on load: the opening frame gives nothing away
export const WAKE_START = 0.03
export const WAKE_SPAN = 0.09
// Bank is read off the flight path, atan(a_lat / g) — never scripted, so every degree is earned.
export const BANK_GRAVITY = 1500
// A ceiling, not a shape: atan already saturates, so this only catches an absurd path edit.
export const BANK_MAX = 30 * DEG
// Reduced motion keeps the bank — it only moves when the reader scrolls — but not this much.
export const BANK_MAX_STILL = 6 * DEG
// How much path the turn rate is measured over, wide enough not to twitch at every wiggle.
export const BANK_SPAN = 0.06
// Roll leads the turn, because a pilot rolls in before the nose comes round.
export const BANK_LEAD = 0.025
// Second-order response, underdamped on purpose: critically damped is correct and reads as dead.
export const ROLL_FREQ = 9
export const ROLL_DAMPING = 0.7
// A backgrounded tab hands back one enormous frame; integrating it whole would fling the spring.
export const MAX_FRAME_DT = 0.05
// Both an order of magnitude below one art pixel of horizon tilt, so the loop can stop redrawing.
export const ROLL_REST = 2e-4
// Short windows track every kink in the spline; a long one flies it like something with mass.
export const HEADING_SPAN = 0.045
// A few degrees of look on the pointer: enough to feel depth, far too little to steer with.
export const LOOK_MAX = 0.055
// Rotation turns ridge and stars alike; sliding the eye is what makes the near ridge travel.
export const SWAY_MAX = 0.5
export const SWAY_FADE = 0.14
// a wheel notch is a jump; the camera glides to it instead of snapping
export const SCROLL_EASE = 0.085

// Drawn at its at-rest screen size, so it is crisp there and goes chunky as you close.
export const TITLE = {
	name: ['Karl', 'Querel'], // two words, so the flight can go between them
	role: 'Software Engineer',
	// Multiples of 8 - Press Start 2P's own grid - so every letter pixel lands on a whole texel.
	size: 40,
	roleSize: 16,
	// Fixed: the title stands in the scene, so the texture adapts to the art grid, not this.
	w: 8.05,
	// A word space, not a corridor: the flight goes through the Q now.
	gap: 20,
	nameY: 46,
	roleY: 94,
	tex: [512, 128],
	ink: '#f4f8ff',
	edge: '#05070e',
	// On the path, not above it - that is what makes the letter something you go through.
	at: 0.1777,
}

// The Q's counter in ems from the pen origin; the keyline eats a design pixel each side.
export const Q_COUNTER = [0.4128, -0.1081]
// never author the name below 25px: it has to survive the pass
export const TITLE_FLOOR = 320

// dust motes: two verts per mote (head + tail) drawn as speed streaks
export const MOTES = 900
// Streaks run along travel, so keep the box tight or motes land where they cannot read as motion.
export const DUST_BOX = 22

// Seeded, not written out: the seed gives 5.9 units of hull clearance and keeps the field in front.
export const BELT_Z_NEAR = 85
export const BELT_Z_SPAN = 97
// Floor is the hull safety margin. Flattened along the system plane's normal, not the camera's y.
export const BELT_RADIUS_MIN = 7
export const BELT_RADIUS_MAX = 46
export const BELT_FLATTEN = 0.42

export const BELT_SEED = 777
// ~1.5ms per rock: scan bounding spheres, march only the winner. Raising it costs linearly.
export const BELT_MAX = 70
// Each rock is a vec4 and WebGL1 promises only sixteen, so ask the GPU and let the belt shrink.
export const BELT_UNIFORM_BUDGET = 52
// Most of a real belt is one family's debris; scattering every rock independently reads as confetti.
export const BELT_FAMILIES = 14
// the belt turns with the scroll like everything else
export const BELT_SPIN = 1.7

// The art grid we aim for (px tall); resize() solves for WHOLE device pixels per art pixel.
export const ART_TARGET = 560
export const ART_RUNGS = 3
// The gap between the thresholds is what stops it oscillating between rungs.
export const PERF_WINDOW = 45
export const PERF_SLOW_MS = 30
export const PERF_FAST_MS = 20

// Weighted, not equal sixths: the first frame is about half the wait.
export const BOOT_WEIGHTS = {
	context: 0.04,
	scene: 0.22,
	programs: 0.1,
	field: 0.06,
	typeface: 0.08,
	frame: 0.5,
}
// How fast the displayed figure closes the gap to the next checkpoint, in seconds.
export const BOOT_EASE_TAU = 0.9
// Once the boot lands the fill sweeps the rest at this pace (s per mark), so it climbs.
export const BOOT_SWEEP = 0.5
// Always shown briefly: the GPU wait blocks the main thread, so an "only if slow" timer cannot work.
export const BOOT_MIN_SHOW = 600
// Wait for the face so the first frame has real letters — but never hold the flight hostage.
export const FONT_WAIT_MAX = 1500

// RING PASS and CLOSE PASS are the card kickers; the other four are placeholders.
export const LEGS = [
	[0.12, 'standing by'],
	[0.27, 'climb out'],
	[0.4, 'ring pass'],
	[0.66, 'close pass'],
	[0.87, 'approach'],
	[2, 'entry'],
]
export const HUD_CELLS = 10
