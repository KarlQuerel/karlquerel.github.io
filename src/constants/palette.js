// The one palette the procedural art draws from: planet surface, both ranges, and the cloud decks.
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

	// Night. The departure ridge is lit by starlight, so it gets the only cold ramp in the palette.
	pitch: [13, 15, 22],
	soot: [17, 21, 31],
	iron: [24, 29, 42],
	steel: [31, 38, 53],
	zinc: [40, 48, 66],
	frost: [66, 79, 102],
	rime: [96, 112, 140],

	// Air and light. `ember` is the site's accent, so chrome and world share one yellow.
	haze: [172, 120, 104],
	ember: [255, 189, 46],
	glow: [255, 231, 196],
	star: [255, 255, 255],
}
