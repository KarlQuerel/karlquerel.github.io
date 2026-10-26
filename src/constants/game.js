import { EARTH } from './intro/earth.js'

// Ships when GAME_SHIPPED flips; until then /game is dev-only and builds redirect (src/main.js).
export const GAME_SHIPPED = false

// The letters: plain glyph masks, `#` = stroke, 26 rows, six-cell strokes. Light, depth, outline,
// plating and wear are all derived in js/wordmark.js, so the letters are the only thing drawn by hand.
// They are drawn coarse and painted at `scale` cells per drawn cell, doubled with their stair-steps
// rounded (js/pixelScale.js); every other length here is in painted cells.
export const GAME_WORDMARK = {
	text: 'HERMES-8',
	scale: 2,
	glyphs: {
		H: [
			'.####........####.',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'##################',
			'##################',
			'##################',
			'##################',
			'##################',
			'##################',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'.####........####.',
		],
		E: [
			'.################.',
			'##################',
			'##################',
			'##################',
			'##################',
			'#################.',
			'######............',
			'######............',
			'######............',
			'######............',
			'###############...',
			'################..',
			'################..',
			'################..',
			'################..',
			'###############...',
			'######............',
			'######............',
			'######............',
			'######............',
			'#################.',
			'##################',
			'##################',
			'##################',
			'##################',
			'.################.',
		],
		R: [
			'.###############..',
			'#################.',
			'##################',
			'##################',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'##################',
			'##################',
			'#################.',
			'################..',
			'######..#######...',
			'######...######...',
			'######...######...',
			'######....######..',
			'######....######..',
			'######.....######.',
			'######.....######.',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'.####........####.',
		],
		M: [
			'.#####..........#####.',
			'#######........#######',
			'########......########',
			'#########....#########',
			'#########....#########',
			'######.###..###.######',
			'######.###..###.######',
			'######.###..###.######',
			'######..######..######',
			'######..######..######',
			'######..######..######',
			'######...####...######',
			'######...####...######',
			'######....##....######',
			'######....##....######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'######..........######',
			'.#####..........#####.',
		],
		S: [
			'..##############..',
			'.################.',
			'##################',
			'##################',
			'##################',
			'##################',
			'######.......#####',
			'######........###.',
			'######............',
			'######............',
			'#############.....',
			'###############...',
			'.###############..',
			'...###############',
			'.....#############',
			'........##########',
			'............######',
			'............######',
			'.###........######',
			'#####.......######',
			'##################',
			'##################',
			'##################',
			'##################',
			'.################.',
			'..##############..',
		],
		// the dash: a plain dot, one stroke square at bar height, plated like the letters
		'-': [
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'.####.',
			'######',
			'######',
			'######',
			'######',
			'.####.',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
			'......',
		],
		8: [
			'..##############..',
			'.################.',
			'##################',
			'##################',
			'##################',
			'##################',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'.################.',
			'..##############..',
			'..##############..',
			'..##############..',
			'..##############..',
			'.################.',
			'######......######',
			'######......######',
			'######......######',
			'######......######',
			'##################',
			'##################',
			'##################',
			'##################',
			'.################.',
			'..##############..',
		],
	},
	gap: 10,
	// how far the letters stand off the wall, in cells, down and to the right (away from the key light):
	// none, so the plates sit flat with only their bevel and outline
	depth: 0,
	// Brushed steel under the site's upper-left key light. The lit and shaded bands are `bevel` cells
	// deep; the very top row is the specular line and the very bottom row a thin rim light off the floor.
	bevel: 4,
	ramp: {
		specular: 'star',
		light: 'silver',
		face: 'pewter',
		brushed: 'brushed',
		shade: 'gun',
		dark: 'gun',
		rim: 'pewter',
		depth: 'graphite',
		depthFar: 'iron',
		outline: 'pitch',
		glint: 'star',
	},
	// the face falls off toward the lower right by dither, between these points of the box diagonal
	shade: { from: 0.5, to: 1.1 },
	// Wear on a fixed seed: brushed grain runs across the faces in short horizontal runs, highlights
	// worn back to face here and there, chips out of the outer outline. No scratches: at this size a
	// dark cell reads as a dead pixel.
	wear: { seed: 9, run: 12, streak: 0.2, worn: 0.06, chip: 0.03 },
	// one diagonal glint sweeps the faces every `every` ms, one cell per `step` ms, `width` cells thick
	glint: { every: 4200, step: 14, width: 6 },
	// one line of void sawn through every letter, `rows` cells thick from row `at`: just above the bars
	cut: { at: 16, rows: 4 },
	// Under the cursor the cut lights up as if the saw had just passed: the hottest tone at the cursor's
	// column, a step cooler every `reach` / tones.length cells, dark past `reach`. Leaving, it dies a
	// tone every `ebbMs`.
	seam: { reach: 30, tones: ['glow', 'ember', 'amber', 'brick', 'rust'], ebbMs: 70 },
	// The build (PlatingWordmark.vue), plate by plate.
	plating: {
		// the word spans this share of the frame, at no more than cellMax CSS px per cell
		span: 0.88,
		cellMax: 2,
		// cells of margin round the layout, room for the sparks to drift into
		pad: 18,
		// plates are this many cells square, cut on each letter's box so they tile the strokes
		plate: 12,
		// one plate lands per step; a letter starts once the one before is this far along
		stepMs: 42,
		overlap: 0.7,
		// a landed plate glows for this many steps and throws this many sparks
		hotSteps: 2,
		sparks: 2,
		// zero-g: a spark coasts straight out from the plate's centre, `from` to `to` cells over `life`
		// ms, cooling once it is `cools` of the way
		drift: { from: 4, to: 16, life: 700, cools: 0.5 },
		seed: 4,
	},
	// a plate that has just landed, and the sparks it throws
	weld: { spark: 'glow', cool: 'amber', hot: 'glow' },
}

// The holding screen (GameHolding.vue): the plated name over the Earth's limb, a status line typed
// under it.
export const GAME_HOLDING = {
	// The line under the name, brought in once the name is up. It has one job: nobody should think there
	// is a game to play yet.
	readout: { lead: 'UNDER', accent: 'CONSTRUCTION', delayMs: 500, charMs: 55 },
	// the name takes no more than cellMax CSS px per cell here (bigger than in the intro, where it is a
	// card) and leans `depth` px with the cursor: the nearest layer
	title: { cellMax: 3, depth: 9 },
	// The Earth under the ship, the intro's world turned to `spin`: its centre `x` across the frame, its
	// limb cresting `top` down it, `radius` frame widths round, painted at `cellPx` CSS px per cell.
	// `light` is the sun's direction (x right, y down, z toward the viewer): high off the frame to the
	// right, so the limb is in day and the night with its cities only reaches the left foot; a sun
	// level with the limb walled the cap off with a vertical terminator. The air is the intro's,
	// deepened to four bands: this close, the glow is most of what says "atmosphere", and a line of light
	// rides the lit limb inside it. Bands meet on one-cell seams, coasts carry a foam line, decks have
	// hard edges and the sea catches the sun: flat shapes with edges, the pixel-art way.
	earth: {
		x: 0.38,
		top: 0.7,
		radius: 1,
		cellPx: 3,
		spin: 2.1,
		light: [0.87, -0.18, 0.44],
		air: {
			...EARTH.air,
			depth: 22,
			wrap: 0.9,
			night: 3,
			limbLift: 0,
			ramp: ['sand', 'haze', 'rust', 'basalt'],
			rim: { cells: 1.2, from: -0.15, bright: 0.6, tones: ['sand', 'linen'] },
		},
		detail: {
			...EARTH.detail,
			gain: 1.5,
			seam: 0.06,
			hillshade: 0.15,
			cloud: 0.55,
			cloudEdge: 0.02,
			shadowDrop: 0.3,
			shadowOffset: 0.04,
			glint: 1.2,
			glintPower: 12,
			coastLine: 'foam',
		},
		depth: 3,
	},
	// The entrance: the Earth and the Moon rise into place over `ms`, from `earth` and `moon` frame heights
	// below it, the nearer Moon further and so faster, lighting up from black: they turn opaque over the
	// first `coverMs`, still dark, so no star ever shows through them. `title.delayMs` later the
	// name rises `title.from` frame heights and fades in over `title.ms`. Once it is in, the status line
	// does the same after `status.delayMs`.
	rise: {
		ms: 3500,
		coverMs: 300,
		earth: 0.14,
		moon: 0.24,
		title: { delayMs: 700, ms: 1800, from: 0.04 },
		status: { delayMs: 750, ms: 1400, from: 0.03 },
	},
	// The title screen's music (js/ambient.js): a 33 s loop of "Charon" from the IXION soundtrack, Opus
	// where the browser decodes it (a seventh of the size) and lossless FLAC elsewhere; both keep the
	// loop's exact length, so it wraps sample-exact. It starts with the page, eased in over `fadeInMs`,
	// and eases out over `fadeOutMs`.
	ambient: {
		sources: [
			{ src: '/assets/audio/charon-loop.opus', type: 'audio/ogg; codecs=opus' },
			{ src: '/assets/audio/charon-loop.flac', type: 'audio/flac' },
		],
		volume: 0.27,
		fadeInMs: 1500,
		fadeOutMs: 3000,
	},
	// the Moon risen over the night limb, `radius` a share of the frame's short side
	moon: { at: [0.13, 0.58], radius: 0.045, depth: 5 },
}
