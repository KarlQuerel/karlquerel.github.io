// HERMES-8's cryo bay, built for itself (dev only, the ship lab): a quiet dark room round one object. Five pods
// stand round a pentagonal core in its middle, each facing out, held off the deck with light pooling under them, its
// number lit on its glass; a ring of light in the ceiling hangs over their fronts, ribs run from it to the walls, and
// a ring on the deck answers it. The room keeps the corridor's language: the ceiling's edges cut at 45° with a line
// of light down each cut, the walls panels held off a dark recess, a lit niche in each stretch of the side walls.
// Metres; the room's box and doors are SHIP_LAYOUT's.

export const SHIP_CRYO = {
	room: 'cryo',
	// the walls: panels about `panel` m wide, `seam` m apart, standing `gap` m off the deck; behind them the dark
	// `recess` m back; the ceiling's edges cut `cove` m at 45°; lines of light `line` m wide down each cut, round each
	// open door and down each locked one, the light of the first two hung `standoff` m out into the room. On the
	// `walls` of `niche`, a niche in the middle of each stretch between doors: `width` m, from `sill` to `head` over
	// the deck, `depth` m back, its light reaching `wrap` round past its side
	shell: {
		panel: 1.25,
		seam: 0.025,
		gap: 0.07,
		recess: 0.05,
		cove: 0.4,
		line: 0.05,
		standoff: 0.05,
		niche: {
			walls: ['x0', 'x1'],
			width: 0.62,
			sill: 0.95,
			head: 1.9,
			depth: 0.15,
			wrap: 0.4,
		},
	},
	// the core: a pentagon `apothem` m from its middle to each face, deck to ceiling, a seam of light `seam` m wide
	// down each corner; the pods on it `lift` m off the deck, the glow under them from a pentagon of light `under` m
	// from the middle, `glow` m over the deck
	core: { apothem: 0.62, seam: 0.03, lift: 0.1, under: 1, glow: 0.06 },
	// a pod on each face, its back against it: `width`, `depth` and `height` m, its outline by `shape` ('arch' a half
	// circle on top, its foot's corners rounded `foot` m; 'octagon' the corridor's, its corners cut `cut` of its width;
	// 'capsule' a half circle top and bottom), its edges bevelled `bevel.size` m in `bevel.segments` (1 a 45° cut); a
	// window `rim` m in from its outline and `sill` m up, its glass set `recess` m back with a rim of light `mouth` m
	// wide just behind it; through it the hollow a body stands in, back to `cradle` m off the core, with `pads` where
	// head, back and legs rest ({ w, y, h }, standing `pad.depth` proud, their corners rounded `pad.round`); under the
	// window a status line [width, height].
	// Each pod's number round from the nose (yours, `yours`, 04 as your cabin) lit on its glass in the 3x5 font,
	// `digits.cell` m cells, its top `digits.under` m beneath the window's; yours in the ship's amber
	pod: {
		width: 0.84,
		depth: 0.5,
		height: 2.25,
		shape: 'octagon',
		foot: 0.06,
		cut: 0.24,
		bevel: { size: 0.03, segments: 1 },
		rim: 0.08,
		sill: 0.16,
		recess: 0.04,
		mouth: 0.018,
		cradle: 0.12,
		pads: [
			{ w: 0.36, y: 0.26, h: 0.5 },
			{ w: 0.46, y: 0.82, h: 0.56 },
			{ w: 0.24, y: 1.44, h: 0.22 },
		],
		pad: { depth: 0.05, round: 0.04 },
		status: [0.36, 0.025],
		yours: 0,
		numbers: [4, 5, 1, 2, 3],
		digits: { cell: 0.024, under: 0.13 },
	},
	// the ring of light over the pods' fronts: a tube `tube` m round, half sunk in the ceiling, `radius` m out
	halo: { radius: 1.32, tube: 0.045 },
	// ribs `width` × `depth` m under the ceiling, from `clear` m outside the halo along each core corner to the coves,
	// a line of the deck's trace along each one's underside
	ribs: { width: 0.1, depth: 0.05, clear: 0.12 },
	// on the deck, lines `trace` m wide: a ring under the halo, and a path from each open door to it
	trace: 0.035,
	// the pods breathe: the light in each swells and ebbs smoothly between `low` and full once every `period` s, a
	// fifth of a breath behind the pod before it
	breath: { period: 8, low: 0.6 },
	// each part's paint: a palette colour, how rough (0 a mirror, 1 matte), what glows (a colour, how bright), and
	// how opaque; the night's cold ramp throughout, which the palette never snaps toward violet
	paint: {
		floor: { base: 'iron', rough: 0.35 },
		panel: { base: 'zinc', rough: 0.85 },
		recess: { base: 'pitch' },
		cove: { base: 'steel', rough: 0.9 },
		ceiling: { base: 'iron', rough: 0.9 },
		rib: { base: 'steel', rough: 0.8 },
		core: { base: 'iron', rough: 0.6, flat: true },
		shell: { base: 'frost', rough: 0.6 },
		cradle: { base: 'steel', rough: 0.8 },
		glass: { base: 'rime', rough: 0.1, opacity: 0.1 },
		pad: { base: 'zinc', rough: 0.75 },
		mouth: { glow: 'star' },
		line: { glow: 'star' },
		frame: { glow: 'star' },
		door: { base: 'iron', rough: 0.7 },
		lock: { glow: 'brick' },
		seam: { glow: 'star' },
		niche: { base: 'zinc', rough: 0.7 },
		trace: { glow: 'rime' },
		number: { glow: 'rime' },
		status: { glow: 'rime' },
		yours: { glow: 'amber' },
	},
	// the room's own light (roomLight.glsl), no sun in here: the cove lines, each open door's head, each niche's, the
	// halo (drawn as `chords` straight pieces), the glow under the pods, and in each pod a light behind its glass
	// turned onto the pads (`hollow`) and one throwing its glow out into the room (`glow`), each reaching `wrap` round
	// past its side; colours as [palette, palette, mix], at `power`; `fill`
	// the least light anywhere, `soft` how near a line its glow stops climbing, `sheen` how bright a gloss throws a
	// light back; a lit colour turns to `metal`'s hue as its brightness (luma, 0..1) climbs through `neutral`: bare
	// metal a touch cold, whose greys the palette snaps between its own (a neutral grey there dithers with the warm
	// bone, a bluer one with the sky's violets)
	light: {
		cove: { color: ['rime', 'star', 0.75], power: 0.5 },
		frame: { color: ['rime', 'star', 0.75], power: 0.3 },
		niche: { color: ['rime', 'star', 0.8], power: 0.35 },
		halo: { color: ['rime', 'star', 0.85], power: 0.9, chords: 16 },
		under: { color: ['rime', 'star', 0.6], power: 0.3 },
		hollow: { color: ['rime', 'star', 0.6], power: 0.35, wrap: 0.6 },
		glow: { color: ['rime', 'star', 0.5], power: 0.45, wrap: 0.5 },
		fill: ['soot', 'iron', 0.5, 0.35],
		soft: 0.05,
		sheen: 0.9,
		metal: ['gun', 'rime', 0.25],
		neutral: [0.28, 0.5],
	},
}
