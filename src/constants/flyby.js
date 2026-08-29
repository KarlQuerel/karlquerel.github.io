// The landing flyby: every tuned number the flight is made of. The GL plumbing in
// useFlyby.js reads these and never hard-codes any of them, so this file is the one
// to open when changing what the flight does.

import { norm } from '../js/vec3.js'

const DEG = Math.PI / 180

// ---------------------------------------------------------------- scene
// Two worlds: a ringed one to thread, and the one we are heading home to.
// Radius 1 = ~Earth. Both strung along -Z so the camera flies a corridor.
export const BODIES = [
	// The ringed world. Its y is solved, not chosen: it has to take the destination off
	// the ridge with no gap (the ridge lets go of it at s=0.197) and hold it until the
	// ridge reveal has finished landing, so the destination coming out from behind this
	// limb is its own beat rather than a detail inside a bigger one. Hides it
	// s=0.196..0.241, clear of it by 0.318. One unit lower and the two beats collide.
	{ c: [10.15, 4.0, -60], r: 3.0, pid: 0, spin: 0.9, ring: [4.3, 7.2] },
	{ c: [14, -3.0, -186], r: 6.0, pid: 1, spin: 0.2, ring: [0, 0] }, // the destination
	// The ridge. It sits squarely between the camera and everything else, so at rest
	// the page is a grey horizon under stars and nothing else exists. It hides the
	// corridor by blocking it, not by the camera looking away - which is why the
	// reveal is parallax as we climb over it, and needs no camera trick at all.
	// x is solved with the opening waypoints: centred under the rest camera (0.1
	// degrees off), so the horizon sits under the name instead of leaning left.
	{ c: [10.25, -6, -25], r: 12.0, pid: 2, spin: 0.12, ring: [0, 0] },
	// The corridor moon: the ridge's trick again, but spent on one body instead of the
	// whole scene. It takes the destination back after the first look at it and holds
	// it to s=0.527, so the arrival happens at 8.2 degrees across instead of 2.4 - the
	// flight closes a third of the remaining distance while it is out of sight.
	// Solved the same way the ridge was: on the sightline to the destination, sized to
	// cover it with margin, far enough off the route to clear its surface by a third of
	// a radius (the ridge is passed at 1.29, this at 1.36). It has to be a smooth body
	// and not a rock: rockRadius bulges 30%, so a marched rock passed this close would
	// put the camera inside its own silhouette.
	{ c: [8.55, -1.17, -148.2], r: 3.68, pid: 3, spin: 0.16, ring: [0, 0] },
	// --- the rest of the system. The four above are a chain and have to be: an occlusion
	// reveal needs the occluder on the sightline to what it hides. Everything else used to
	// be placed by asking "where can this hide on the opening frame", which is not a
	// question a solar system has ever answered, and it showed - the bodies were scattered
	// in a shell around a scene that plainly has a plane. The ring says where that plane
	// is; measured, the four above sit within 22 units of it and the old scenery sat 30 to
	// 173 units off it. Half the scene obeyed a grammar the other half ignored, and that
	// contradiction is what read as wrong. Not the randomness - the inconsistency.
	//
	// So these are placed on that plane instead, within 18 degrees of it, and they are
	// allowed to be seen at rest as long as they are faint: under a degree across and 93%
	// hazed, which is a smudge among the stars. A photograph of space has distant worlds in
	// it. Only the three scripted reveals are still protected - the ridge over the
	// corridor, and the two eclipses of the destination.
	// Every one of them also sits at a phase angle between 55 and 125 degrees, so it has a
	// terminator across it. Four of the old set sat under 50 and rendered as flat lit discs,
	// which is most of what made them look pasted on.
	// Spread matters as much as the plane does. Measured before this pass, everything
	// prominent sat within six degrees of eye level and all of it to the right - a
	// system obeying one plane still reads as beads on a string if every body also
	// shares the camera's own height and side. So the free bodies take the spread a
	// real ecliptic has: inclinations both ways, depth in clumps rather than even
	// steps (one loner, then a binary, then a void), and the upper-left field handed
	// from one tenant to the next as the flight goes - the ice world to s=0.29, the
	// tan one from 0.35. Phase angles all hold 55-125.
	{ c: [1.39, 36.34, -142.55], r: 1.42, pid: 4, spin: 0.27, ring: [0, 0] },
	// the small half of the binary: 12 units from its partner, 5.5 partner-radii,
	// tilted across the plane so the pair carries its own inclination
	{ c: [66.5, -1.5, -222.5], r: 1.16, pid: 7, spin: 0.33, ring: [0, 0] },
	{ c: [-29.96, 82.6, -472.12], r: 3.17, pid: 8, spin: 0.06, ring: [0, 0] },
	// upper-left, mid-flight: on screen s=0.35..0.72 while everything else is right
	{ c: [-42, 47, -345], r: 3.04, pid: 9, spin: 0.09, ring: [0, 0] },
	{ c: [73.69, 5.31, -229.16], r: 2.18, pid: 6, spin: 0.14, ring: [0, 0] },
	// Moons. The cheapest thing in the scene that reads as a system: the eye sees a pair
	// and supplies the orbit. They are also the only near-field bodies that come hidden for
	// free - whatever covers the primary covers them - and on the plane for free, because
	// the primary is. Each is a fifth to a third of its planet, three to six radii out, and
	// none may sit on the destination during either scripted reveal: a moon crossing its
	// own planet is worth having, a moon crossing the beat is not.
	// The shepherd. This was a fixed moon at 4.4 radii; it now rides the ring's outer
	// edge - 7.6 units out, just past the 7.2 the ring stops at, which is where ring
	// physics actually keeps such a thing - and it is the one body in the system that
	// visibly revolves: 32 degrees of arc across the scroll, in the ring's own plane.
	// Phase and sweep are solved, not chosen: hidden on the opening frame, never nearer
	// the hull than 8.9 units, never on the destination sightline, and on screen from
	// s=0.20 to 0.42 - four to five degrees across through the ring pass, creeping
	// three quarters of its own diameter while watched.
	{
		orbit: { about: 0, r: 7.6, phase: 0.205, sweep: -0.09 },
		r: 0.56,
		pid: 2,
		spin: 0.41,
		ring: [0, 0],
	},
	// The corridor moon's companion sits beside and below it (4.3 radii) rather than
	// twenty units ahead: at the same depth the two read as a pair, and it is the one
	// prominent body under the plane - low-right against everything else's eye level.
	{ c: [19.55, -11.67, -152.7], r: 1.08, pid: 4, spin: 0.35, ring: [0, 0] },
	{ c: [18.36, 13.33, -218.77], r: 2.07, pid: 2, spin: 0.19, ring: [0, 0] },
]

// Rocks down the corridor, each marched in the scene shader so they occlude the
// scene, each other, and get occluded in turn. Sizes and offsets all differ: a
// field of one rock repeated is worse than no field at all.
// Deliberately NOT on the sightline to the destination. Anything that fully covers
// what is dead ahead has to be dead ahead itself, and we fly into it - measured at
// -0.33 clearance before this was reverted. Occlusion reveals need an occluder the
// route passes to one side of, which is what the ridge and the ringed world are.
// spin and tumble are turns per full scroll, about the vertical and end over end. The
// rates are deliberately not multiples of each other: a rock that returns to the same
// face reads as a prop on a turntable.
// Rates are turns per full scroll and are all raised from where they were: at 1.4 and
// 2.3 a rock turned about a third of a revolution while it was actually in shot, which
// is a rock that looks like it is being carried past rather than tumbling. No pair of
// them divides into another, so no rock ever returns to the same face on a beat.
export const ROCKS = [
	{ c: [4.2, -1.6, -104.5], r: 1.3, spin: 3.1, tumble: 1.9 },
	// Third rock, and the only one that goes over the top: it clears the camera at 30
	// degrees of elevation while the other two pass low, so the corridor stops being a
	// row of things at eye level. Peaks at 34 degrees across at s=0.415, two thirds of
	// a bulged radius off the hull, and nineteen units clear of anything else in the
	// scene. Solved under the same rule as the other two - never on the sightline to
	// the destination or the ringed world, so it can be threaded and never blocks a
	// reveal it was not meant to.
	{ c: [3.2, 4.86, -83.17], r: 1.24, spin: 4.3, tumble: 2.9 },
	// Its own stretch of corridor, and the only thing in the flight that passes on the
	// left. It used to sit two radii off the corridor moon - close enough that the two
	// read as one lumpy object - while everything else worth looking at is right of the
	// flight line. Placed for presence rather than proximity: a rock passed at two radii
	// is at its largest when it is ninety degrees off the axis, which is off the frame
	// entirely, so what matters is how big it gets while still inside it. Ten degrees at
	// s=0.51, low and left, against the moon high and right - and it is six radii clear
	// of everything else in the scene.
	{ c: [-1, -2, -125], r: 1.9, spin: 2.3, tumble: 3.7 },
]

// what the camera can be asked to watch. The rocks are not on the list any more:
// they sweep through frame on their own, which is what passing something looks like.
export const TARGETS = [BODIES[0], BODIES[1]]

// ---------------------------------------------------------------- flight path
// Camera waypoints: s = scroll progress, p = world position. One long arc - x eases
// in for the ring pass and back out to the destination, y and z never reverse, so
// the flight reads as one curve rather than a series of corrections.
//
// The s values are the speed profile. The first leg covers six units across a tenth
// of the scroll: from eighty units out that is no visible motion at all, so the page
// opens as a still frame and only admits it is 3D once you have scrolled past it.
export const PATH = [
	// The first three x values are solved together: they aim the rest frame so the
	// name reads centred with the pointer centred (it used to sit 7 degrees right),
	// and they leave the opening horizon dead level (bank under 0.3 degrees).
	{ s: 0.0, p: [10.0, 2.6, 24] },
	{ s: 0.123, p: [10.0, 3.4, 18] }, // still frame ends here, engines light
	// The run-in to the letter is still a turn rather than a straight line - centring
	// the rest frame softened it, so the bank through the title is about 5 degrees now
	// rather than 11 - and it carries straight on into the ridge turn, so the two read
	// as one manoeuvre instead of a tilt that arrives from nowhere. Measured: it leaves
	// the occlusion chain alone and the ridge is still passed at 1.20 radii.
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

// which world the camera turns to watch, and how hard, across the trip
// b = world to watch, w = how hard the camera turns to hold it
export const FOCUS = [
	// Straight down the corridor at first - the ridge does the hiding, so the camera
	// need not point anywhere clever. Weights stay low the whole way: anything we
	// merely pass should sweep through frame on its own, and every degree the camera
	// turns is a degree the reader's eye has to follow.
	{ s: 0.0, b: 0, w: 0 },
	{ s: 0.24, b: 0, w: 0.08 },
	// A lean into the approach, and then let go. The weight has to be back to zero by
	// the closest pass at s=0.349: hold any of it past there and the camera is turning
	// to keep in view something it has already gone by, which it can never manage. It
	// used to carry 0.15 to s=0.35 and reach zero only at 0.40, and so swung 15 degrees
	// off the direction of travel at s=0.36 - peaking after the ringed world was behind
	// the camera, which is the worst possible moment for it. This peaks at 4 degrees at
	// s=0.31, while the thing is still ahead and worth a look, and is straight again
	// before the pass. It is big enough by then to fill the frame without being
	// followed, which was always the intent.
	{ s: 0.3, b: 0, w: 0.24 },
	{ s: 0.345, b: 0, w: 0 },
	{ s: 0.78, b: 1, w: 0.25 }, // then nothing but the destination, dead centre
	{ s: 0.88, b: 1, w: 0.45 },
	{ s: 1.0, b: 1, w: 0.55 },
]

export const UP = [0, 1, 0]
export const SUN = norm([0.82, 0.3, 0.48])
// The system's plane. Doubles as the ring's normal and as the plane the belt is
// scattered on, so the two can never drift apart.
export const RING_NORMAL = norm([0.2, 1.0, 0.13])

// A 58-degree lens. Note the frame is half this off-axis: the shader builds its ray
// as uv.y*uUp + uFocal*uFwd with uv.y spanning -0.5..0.5, so FOCAL is the cotangent
// of the HALF angle and the vertical field of view is 58 degrees end to end.
export const FOCAL = 1 / Math.tan((58 * Math.PI) / 360)

export const ENTRY_START = 0.87
// the dust wakes up with the engines, not on load: streaks past the camera are a
// depth cue, and the opening frame is meant to give nothing away
export const WAKE_START = 0.03
export const WAKE_SPAN = 0.09
// --- the roll, as a coordinated turn.
// An aircraft banks because it turns: the bank angle is whatever puts the lift vector
// where it cancels the sideways acceleration, atan(a_lat / g). So the horizon here is
// never scripted - it is read back off the flight path, and every degree of it is
// caused by something the reader can see the camera doing. There used to be a keyframed
// ROLL table doing this by hand at ten times the amplitude the path earned, which is
// why the motion read as arbitrary: the biggest rotation on screen had no relationship
// to where the camera was going.
// Measured over this path, |a_lat| peaks at about 470 world units per scroll squared,
// on the long swing onto the approach axis around s=0.70. The ridge climb reaches -372
// and the ring pass +290, and the first fifth of the flight is straight enough to sit
// at zero - so the opening frame stays level without being told to, and so does the
// arrival, which matters because the atmosphere is drawn with its ground at the bottom
// of the frame.
// BANK_GRAVITY is the only amplitude dial: it is the `g` in that formula, so a bigger
// number is a heavier aircraft that refuses to lean. 1500 puts the peak at 17 degrees.
export const BANK_GRAVITY = 1500
// A ceiling, not a shape. atan already saturates, so this only catches a path edit that
// asks for something absurd; at the current gravity it never binds.
export const BANK_MAX = 30 * DEG
// Reduced motion keeps the bank - it follows the flight and only moves when the reader
// scrolls - but not this much of it.
export const BANK_MAX_STILL = 6 * DEG
// How much path the turn rate is measured over. Wide enough that the horizon leans
// through a whole turn instead of twitching at every wiggle in the spline.
export const BANK_SPAN = 0.06
// Roll leads the turn, because a pilot rolls in before the nose comes round. Worth
// about a fifth of a turn's width at this path's feature scale.
export const BANK_LEAD = 0.025
// Roll inertia. The bank above is a pure function of scroll, so on its own it snaps to
// its target with no lag going in and no settle coming out. Running it through a
// second-order response gives an airframe that takes time to roll: understeer entering
// the turn, a small overshoot leaving it. Slightly underdamped on purpose - critically
// damped is correct and reads as dead.
// In radians/second and a damping ratio, so this is wall-clock rather than scroll: an
// airframe takes about as long to roll however fast the page is being scrubbed.
export const ROLL_FREQ = 9
export const ROLL_DAMPING = 0.7
// A tab left in the background hands back one enormous frame; integrating it whole
// would fling the spring. Seconds.
export const MAX_FRAME_DT = 0.05
// When the spring counts as arrived, in radians and radians/second. Both are an order
// of magnitude below what one art pixel of horizon tilt would be, so the frame loop can
// stop redrawing without the horizon visibly stopping short.
export const ROLL_REST = 2e-4
// How much path the heading averages over. Short windows make the camera track every
// kink in the spline; a long one flies it like something with mass, which is the
// difference between looking around and going somewhere.
export const HEADING_SPAN = 0.045
// A few degrees of look, driven by the pointer. Enough to feel the depth, far too
// little to steer with - the flight is still entirely the reader's scroll.
export const LOOK_MAX = 0.055
export const LOOK_EASE = 0.055
// Rotation aims the camera; it turns the ridge and the stars through the same angle,
// so nothing appears to move against anything. Sliding the eye a little is what makes
// a near thing travel further than a far one - the ridge is 38 units off at rest and
// the stars are at infinity, so half a unit of slide is nine pixels of ridge against a
// fixed sky. Spent on the opening, where the ridge is the whole frame, and gone by
// SWAY_FADE: from there the camera has a gap in the name to thread, exactly.
export const SWAY_MAX = 0.5
export const SWAY_FADE = 0.14
// a wheel notch is a jump; the camera glides to it instead of snapping
export const SCROLL_EASE = 0.085

// ---------------------------------------------------------------- title plane
// Drawn at the size it occupies on screen at rest, so it is crisp there and goes
// chunky as you close on it - which is the right direction for pixel art.
export const TITLE = {
	name: ['Karl', 'Querel'], // two words, so the flight can go between them
	role: 'Software Engineer',
	// Layout in texels. Sizes are multiples of 8 - Press Start 2P's own design grid,
	// one em per glyph - so every pixel of every letter lands on a whole texel and the
	// keyline stays one design pixel wide.
	size: 40,
	roleSize: 16,
	// The plane's world width, fixed. The title is a thing standing in the scene, not
	// something laid over it, so it must not change size when the art grid does: it is
	// the texture that adapts. This is the width that made one texel one pixel on the
	// 560-tall grid it was tuned against.
	w: 8.05,
	// A word space, not a corridor. It was 88 - 2.2 ems - because the flight had to fit
	// between the words; the flight goes through the Q now, so this is free to be half
	// an em and the name reads as one name again.
	gap: 20,
	nameY: 46,
	roleY: 94,
	tex: [512, 128],
	ink: '#f4f8ff',
	edge: '#05070e',
	// Where on the flight it stands. The plane used to hang above the corridor, so the
	// name slid off the top of the frame and the pass never happened; sitting it on
	// the path is what makes the letter something you go through.
	at: 0.1777,
}

// The counter of the Q - the enclosed hole in the letter - in ems from the glyph's pen
// origin, with y measured off the middle baseline the name is drawn on. Read off the
// face itself at 16 device pixels per design pixel rather than eyeballed: Press Start
// 2P draws Q on an 8x8 grid with a 3x5 counter, and the keyline eats one design pixel
// off each side of it, so what the flight actually threads is 1x3 design pixels.
export const Q_COUNTER = [0.4128, -0.1081]
// never author the name below 25px: it has to survive the pass
export const TITLE_FLOOR = 320

// ---------------------------------------------------------------- dust
// dust motes: two verts per mote (head + tail) drawn as speed streaks
export const MOTES = 900
// World units the motes wrap inside. Streaks run along travel, so a mote near the
// vanishing point has no length to show - keep the box tight and the near field
// dense, or almost every mote lands where it cannot read as motion.
export const DUST_BOX = 22

// ---------------------------------------------------------------- belt
// Generated from a fixed seed rather than written out: fifty positions is not a design
// decision worth fifty lines, and a seeded generator gives every reader the same field.
// The seed is not arbitrary either - it was picked by checking whole fields against the
// flight, judged on the ellipsoids' long axis rather than the nominal radius. This one
// keeps 5.9 units between the hull and the nearest rock's long axis (re-measured after
// the field was tilted into the system plane - the tilt cost nothing), never puts a rock
// on the destination's disc while it is watched, and is at most 0.57 degrees across on
// the opening frame - ten art pixels, where the haze already has 93% of it.
// Where the field lies along the corridor, as depth out from the camera's start. It used
// to run 125..285, which straddled the destination at 186 and put more than half the rocks
// behind the thing they were meant to be seen in front of. 85..182 puts all of it in front
// of the green world, over the stretch the camera actually flies (z=-105 at s=0.48 out to
// -179 at the end), so the reader passes through the field on the way in rather than
// looking at it from outside.
export const BELT_Z_NEAR = 85
export const BELT_Z_SPAN = 97
// How far off the corridor's centre line the rocks sit. The floor is the safety margin -
// nothing may come nearer the hull than this - and the field is weighted toward it, since
// most of a belt is the near gravel you actually pass. Flattened along the system plane's
// own normal - not the camera's y - so the slab crosses the frame at the plane's tilt
// instead of lying as a horizontal stripe at eye level.
export const BELT_RADIUS_MIN = 7
export const BELT_RADIUS_MAX = 46
export const BELT_FLATTEN = 0.42

export const BELT_SEED = 777
// Measured at 640x400 under a software rasteriser, so the absolute numbers mean nothing
// and the slope is everything: the scene costs ~500ms before the belt and ~1.5ms per rock
// after it. That per-rock figure was 8.1ms while the belt was analytic ellipsoids, because
// three hashes and two sines ran for every rock on every pixel whether the ray went near
// it or not; scanning bounding spheres and marching only the winner made the rocks real
// AND the scaling five times cheaper. 70 marched rocks now cost about half what 96 smooth
// ones did. Raise it and the frame gets dearer roughly linearly; on a weak GPU the
// art-grid ladder answers by dropping a rung, which is blockier pixels, not dropped frames.
export const BELT_MAX = 70
// Each belt rock is a vec4 of fragment uniform and the rest of the scene already spends
// about forty of them; WebGL1 only promises sixteen in total, and while no real device
// ships that few, plenty of phones stop at sixty-four. So ask the GPU, keep this margin,
// and let the belt be the thing that shrinks - it is texture, and the flight does not
// depend on any single rock in it.
export const BELT_UNIFORM_BUDGET = 52
// Most of a real belt belongs to a family - the debris of the same break-up, still
// travelling together - and scattering every rock independently is what makes a field
// read as confetti thrown at the screen rather than as something with a history.
export const BELT_FAMILIES = 14
// the belt turns with the scroll like everything else
export const BELT_SPIN = 1.7

// ---------------------------------------------------------------- render grid
// The art grid we aim for, in pixels tall. Fine enough that it reads as detail rather
// than as blocks; the perf ladder coarsens it if the GPU chokes.
// What resize() actually solves for is whole device pixels per art pixel. A fractional
// upscale - 560 tall stretched over a 900px window, say - shows up as every edge on
// screen changing width by a pixel whenever anything moves, because each art pixel
// lands on one device pixel or two depending on where it sits. On hard-edged letters
// that reads as the name chattering under the pointer look.
export const ART_TARGET = 560
export const ART_RUNGS = 3
// Watch this many back-to-back rendered frames and move the grid to suit. Both ways:
// one slow moment used to coarsen the rest of the session for good, which on a page
// whose argument is that it was built carefully is the wrong thing to be permanent.
// What keeps it from oscillating is the gap between the thresholds - it takes worse
// than SLOW to drop a rung and better than FAST to win one back, so a window sitting
// anywhere between the two leaves the grid alone.
export const PERF_WINDOW = 45
export const PERF_SLOW_MS = 30
export const PERF_FAST_MS = 20

// ---------------------------------------------------------------- boot
// What each boot step is worth, as a share of the whole. Weighted rather than six equal
// sixths because they are nothing like equal: the first frame is about half the wait on
// every machine measured, so equal steps would race to 83% and then sit there for the
// entire GPU stall, which is the exact behaviour that makes loaders feel like lies.
// These are checkpoints and they are true - the percentage only passes one when the work
// behind it is genuinely done. Between them the bar creeps toward the next checkpoint
// without ever reaching it, which is an estimate, and is the one part of this that is.
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
// Once the boot lands, the fill sweeps the rest of the mark at this steady pace
// (seconds per full mark), so finishing reads as a climb rather than a teleport.
export const BOOT_SWEEP = 0.5
// How long the cover stays up once it is up, so it reads as a beat rather than a blink.
// There is deliberately no "only show if the boot is slow" threshold. That was tried and
// cannot work here: the boot's own steps take about 100ms of yielding, and the expensive
// part - waiting for the GPU to finish the first frame - blocks the main thread, so a
// timer set to fire during it never runs. Any threshold is therefore either below the
// CPU phase (always shows) or above it (never shows, including on the slow devices it
// existed for). Given the cover also stops the reader seeing an unpainted canvas, always
// showing it briefly is the honest simplification.
export const BOOT_MIN_SHOW = 600
// The name is drawn into a texture with the pixel font. Waiting for the face means the
// first frame has the real letters instead of fallback monospace that pops a moment
// later - but a font that never arrives must not hold the flight hostage.
export const FONT_WAIT_MAX = 1500

// ---------------------------------------------------------------- readout
// Where the reader is, in the flight's own terms. RING PASS and CLOSE PASS are the
// card kickers; the other four are placeholders for Karl's wording.
export const LEGS = [
	[0.12, 'standing by'],
	[0.27, 'climb out'],
	[0.4, 'ring pass'],
	[0.66, 'close pass'],
	[0.87, 'approach'],
	[2, 'entry'],
]
export const HUD_CELLS = 10
