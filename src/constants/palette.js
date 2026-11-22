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

	// Sky. The open world's nebula (assets/game/sky/nebula.png), three ramps dark to light at matching
	// steps: teal gas, its blue dust, and the dust turned violet and magenta. Its darkest cells are Night's.
	veil: [16, 40, 48],
	drift: [28, 76, 80],
	aurora: [48, 118, 118],
	ion: [112, 184, 176],
	indigo: [30, 28, 84],
	cobalt: [44, 58, 112],
	lapis: [78, 96, 170],
	nova: [130, 146, 222],
	plum: [54, 26, 70],
	orchid: [100, 42, 112],
	fuchsia: [156, 66, 148],
	rose: [222, 140, 196],

	// Bare metal: the game's brushed steel, cold greys with a blue cast.
	graphite: [58, 64, 78],
	gun: [88, 96, 112],
	pewter: [140, 148, 162],
	brushed: [158, 166, 180],
	silver: [200, 206, 216],

	// Air and light. `ember` is the site's accent, so chrome and world share one yellow.
	haze: [172, 120, 104],
	ember: [255, 189, 46],
	// ember turned down: a suit light dimmed, which would otherwise fall to amber, an orange
	brass: [176, 136, 40],
	// the suit gauge's air: a cyan as bright as ember, past where the sky's teal ramp stops
	ice: [70, 226, 232],
	glow: [255, 231, 196],
	star: [255, 255, 255],
}

// A palette entry as a CSS colour, for canvas fills and style bindings.
export const paletteRgb = (name, alpha) =>
	alpha === undefined
		? `rgb(${PALETTE[name].join(',')})`
		: `rgba(${PALETTE[name].join(',')},${alpha})`

export const paletteHex = name =>
	`#${PALETTE[name].map(c => c.toString(16).padStart(2, '0')).join('')}`

// A mix of two palette entries as 0..1 sRGB, scaled by k: [a, k], or [a, b, t] with an optional k.
export function paletteMix(spec) {
	const [a, b, t, k = 1] = spec.length === 2 ? [spec[0], spec[0], 0, spec[1]] : spec
	return PALETTE[a].map((v, i) => ((v + (PALETTE[b][i] - v) * t) * k) / 255)
}

// The palette as Sass variables, served to the stylesheets as `@use 'palette:'`.
export const paletteScss = () =>
	Object.entries(PALETTE)
		.map(([name, [r, g, b]]) => `$${name}: rgb(${r}, ${g}, ${b});`)
		.join('\n')
