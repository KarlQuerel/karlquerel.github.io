// The one palette the procedural art draws from — the planet's surface, the ranges
// at both ends of the trip, and the cloud decks. Two rules are what make those read
// as one piece of art rather than three effects that happen to sit next to each
// other:
//
//   1. Ramps hue-shift. A surface does not simply darken toward black: as it turns
//      away from the sun its hue rotates toward the cool of the sky, and as it turns
//      into the sun it rotates warm. Multiplying one base colour by a brightness is
//      what gives you a low-resolution render; rotating hue along the ramp is what
//      makes the same geometry read as pixel art.
//   2. Ramps share their dark ends. Everything in this world bottoms out in the same
//      violet-black, which is what ties a night ridge, an orbiting globe and a dusk
//      range together — and it is also just true, since you cannot tell an ocean
//      from a continent on the night side.
//
// Colours are [r, g, b] 0-255 and are named, not indexed, so a ramp reads as the
// walk it is and two ramps can share a step without either owning it. Nothing in the
// canvas art may invent a colour outside this file: the drawing code picks a step,
// never a blend, so every pixel it paints is exactly one of these.
export const PALETTE = {
	// The shared cool end. Every ramp starts somewhere in here.
	void: [10, 8, 14],
	ink: [22, 17, 30],
	slate: [38, 30, 48],

	// Water: violet dark through maroon to a dusty lit rose.
	deep: [30, 25, 45],
	brine: [52, 36, 52],
	tide: [76, 48, 58],
	shoal: [106, 64, 68],
	foam: [140, 92, 88],

	// Rock: violet-brown through red to a warm tan where the sun hits square on.
	// Stepped finely on purpose: a ramp compresses for distance by picking adjacent
	// entries, never by repeating one — a repeat costs the dither a boundary.
	// `shale` and `garnet` are the rotation, not extra brightness steps: a ramp that
	// only brightens reads as one colour under a dimmer, and the eye takes that for
	// paint. Shadow sits in the sky's violet and swings through a cool red before it
	// reaches the orange the sun actually puts on the rock.
	shale: [52, 38, 58],
	basalt: [50, 34, 40],
	rust: [84, 46, 44],
	garnet: [104, 52, 66],
	ochre: [124, 60, 48],
	brick: [141, 68, 51],
	clay: [158, 76, 54],
	flare: [174, 92, 62],
	amber: [190, 108, 70],
	dune: [202, 130, 87],
	sand: [214, 152, 104],

	// Pale ground and cloud: cool grey through warm bone to cream.
	ash: [66, 58, 68],
	stone: [110, 94, 90],
	bone: [150, 132, 124],
	chalk: [188, 170, 158],
	cream: [214, 200, 190],
	linen: [238, 230, 216],

	// Night. The departure ridge is the one thing here lit by starlight instead of by
	// the sun, so it gets the only cold ramp in the palette — which is exactly what
	// makes leaving read as cold and arriving read as warm.
	pitch: [13, 15, 22],
	soot: [17, 21, 31],
	iron: [24, 29, 42],
	steel: [31, 38, 53],
	zinc: [40, 48, 66],
	frost: [66, 79, 102],
	rime: [96, 112, 140],

	// Air and light. `ember` is the site's own accent, so the chrome and the world
	// are lit by the same yellow.
	haze: [172, 120, 104],
	ember: [255, 189, 46],
	glow: [255, 231, 196],
	star: [255, 255, 255],
}
