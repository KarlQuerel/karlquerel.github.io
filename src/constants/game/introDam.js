// The intro's dam shot (GDD.md): a dry reservoir at dusk, its bed cracked into plates, a boat stranded on it close
// to the lens, drowned trees and a fence line out across it, the old water line pale on the canyon walls, the dam
// across the gorge with each side's searchlights sweeping the bed; then the horizon behind it flashes white and
// the dust rolls in. Metres: the camera looks up the valley along -z toward the dam, y up, the bed at 0. Every
// layout is drawn from `seed`, so the shot is the same each time.

export const INTRO_DAM = {
	seed: 2137,
	fovDeg: 44,
	near: 0.1,
	far: 3000,
	// the camera's push over the bed, from one key to the other over the shot (reduced motion: held at `to`)
	from: { at: [2.2, 1.35, 5], look: [-8, 14, -360] },
	to: { at: [0.9, 1.1, -0.5], look: [-3, 18, -360] },
	// reduced motion holds the shot at this second, before the flash
	stillS: 2.2,

	// The dusk on a dome `radius` out round the camera, `segments` fine: `low` at the horizon to `high` and
	// `zenith` overhead, darker toward `east` behind the camera; the afterglow `horizon` low over the gorge,
	// centred `glowAzDeg` off the view's axis (+ right), `glowSpread` of a half turn wide, fading `glowFade` up
	sky: {
		radius: 2800,
		segments: [96, 48],
		glowAzDeg: -14,
		glowSpread: 0.3,
		glowFade: 0.3,
		horizon: ['amber', 'dune', 0.35],
		low: ['garnet', 'haze', 0.55],
		high: 'indigo',
		zenith: 'pitch',
		east: 'iron',
	},
	// the dusk's air: FogExp2 of `density` in `color`
	fog: { color: ['garnet', 'haze', 0.35], density: 0.0011 },

	light: {
		// the sky overhead and the dark bed
		hemi: { sky: 'frost', ground: 'ink', intensity: 0.45 },
		// the afterglow low over the gorge: a warm rim on whatever faces the dam
		glow: { color: 'haze', intensity: 1.4, elevationDeg: 4 },
		// the blue dusk behind the camera, on every face turned to it
		fill: { color: 'rime', intensity: 0.85, azDeg: 160, elevationDeg: 25 },
	},

	// The valley, a grid `size` m round `center` [x, z] in `cells`: a flat bed `halfWidth` m either side of the
	// axis at the dam, widening by `widen` per metre toward the camera, its walls climbing `slope` m per metre to
	// `top`, roughened by `rough` m of ridged noise every `grain` m; past the plates the bed dips in swales
	// `swale` m deep. Below `waterLine` m the old lake bleached the rock (`bleached`), above it `rock` in strata
	// `strataEvery` m apart, `strata` lighter and darker; the bed itself `mud`.
	valley: {
		size: [1400, 980],
		center: [0, -450],
		cells: [220, 150],
		halfWidth: 80,
		widen: 0.42,
		slope: 1.25,
		top: 200,
		bench: 14,
		rough: 40,
		grain: 110,
		swale: 0.35,
		waterLine: 56,
		strata: 0.14,
		strataEvery: 4,
		mud: ['ash', 'stone', 0.55],
		bleached: ['chalk', 'bone', 0.5],
		rock: ['basalt', 'rust', 0.45],
	},
	// The arch dam: its upstream face a `radius` arc bowing toward the camera, its crown at `z`, `chord` m across
	// in `segments` columns, `height` tall and `crest` thick, a `parapet` on top; its concrete `face`, `bleached`
	// below the old water line, a `stain` at it and in the crest's `shadow` (m) under the parapet, `joints` darker
	// lines down it; `towers` (intake towers on the dry bed: x along the chord, metres out from the face, radius,
	// height) in `tower`; its `lamp`s along the crest every `lampEvery` m.
	dam: {
		z: -360,
		radius: 260,
		chord: 360,
		height: 80,
		crest: 9,
		parapet: 1.4,
		segments: 64,
		face: ['silver', 'bone', 0.35],
		bleached: ['silver', 'chalk', 0.5],
		stain: 'graphite',
		shadow: 3,
		joints: 14,
		towers: [
			[-34, 22, 7, 78],
			[30, 26, 7, 78],
		],
		tower: ['pewter', 'bone', 0.3],
		lampEvery: 18,
		lamp: 'glow',
	},

	// Each side's searchlights on the crest (`at`: x along the chord, metres over the parapet), sweeping the bed:
	// the aim swings round `aim` [x, z] by `swing` [x, z] m at `rateHz` from `phase`; `halfDeg` the beam's half
	// angle, its spot `intensity`, its shaft `shaft` opaque at the lamp fading to `tail` at the bed
	searchlights: {
		color: 'glow',
		halfDeg: 0.9,
		intensity: 6,
		shaft: 0.22,
		tail: 0,
		lights: [
			{ at: [-118, 4], aim: [30, -160], swing: [55, 70], rateHz: 0.11, phase: 0.2 },
			{ at: [-104, 4], aim: [-10, -60], swing: [40, 30], rateHz: 0.08, phase: 2.4 },
			{ at: [112, 4], aim: [-40, -120], swing: [60, 60], rateHz: 0.1, phase: 4.1 },
			{ at: [98, 4], aim: [8, -40], swing: [35, 20], rateHz: 0.13, phase: 1.1 },
		],
	},

	// The bed near the lens broken into mud plates, from `fromZ` out `depth` m: a jittered grid of cells `cell` m
	// across growing to `farCell` at the far end, `wide` [m, m per m out] either side; each plate shrunk by `gap`
	// of its size to leave the crack, `thick` m thick, its rim curled up `curl` m; in `plate` paints, their sides
	// `side` of it, over the cracks' `crack`
	plates: {
		fromZ: 3,
		depth: 45,
		cell: 0.42,
		farCell: 1.5,
		wide: [5, 0.85],
		gap: 0.08,
		thick: [0.02, 0.05],
		curl: [0.005, 0.02],
		side: 0.5,
		plate: [
			['ash', 'stone', 0.7],
			['ash', 'stone', 0.85],
			['stone', 'bone', 0.2],
		],
		crack: 'ink',
	},

	// The boat stranded close to the lens, keel in the mud, heeled over: hull `length` x `beam` x `depth` with its
	// bow raised `sheer`, lofted through `stations` sections of `ribs` points; red antifouling below `boot` of its
	// depth, a dark boot top, white topsides streaked with rust; a wheelhouse (`at` m along from midships), a
	// mast and its boom (`boom`: m aft, m up)
	boat: {
		at: [-5.5, 1.6, -21],
		yawDeg: 140,
		heelDeg: 12,
		pitchDeg: 2,
		length: 9,
		beam: 3.2,
		depth: 2,
		sheer: 0.9,
		stations: 28,
		ribs: 10,
		boot: 0.55,
		bottom: 'brick',
		bootTop: 'ink',
		topsides: ['chalk', 'bone', 0.4],
		rust: ['rust', 'bone', 0.45],
		deck: 'stone',
		house: { at: -1.2, size: [2.6, 2, 2.2], paint: ['chalk', 'bone', 0.25], glass: 'ink' },
		mast: { at: 1.2, height: 5.5, radius: 0.08, boom: [3.4, 2.6], paint: 'graphite' },
	},

	// drowned trees standing on the bed `at` [x, z, height], forking `levels` times; a fence line run out toward
	// the dam from `from` to `to` [x, z], a `post` [thick, tall] every `every` m, leaning up to `lean`
	trees: {
		at: [
			[-16, -34, 7],
			[-30, -70, 9],
			[24, -55, 6],
			[-60, -140, 10],
			[48, -120, 8],
			[-12, -190, 11],
			[90, -230, 9],
		],
		levels: 3,
		paint: 'basalt',
	},
	fence: {
		from: [7, 4],
		to: [62, -300],
		every: 4.5,
		post: [0.12, 1.5],
		lean: 0.12,
		paint: 'basalt',
	},

	// The flash past the dam, `atS` into the shot: `azDeg` off the view's axis (+ right), `elevDeg` up,
	// `distance` out; full in `riseS`, settling to `settle` of it by `settleS`, then swelling to `white` over the
	// shot's last `whiteS`, the white the next shot comes in out of. The sky whitens round it out to `sky` of a
	// half turn, the land lit from it at `intensity`, the air turned `warm`. Its fireball swells to `radius` m
	// (most of it in `growS`), sitting `sit` of its radius up and climbing `climb` m/s: lumpy (`lumps` of its
	// radius) `shells`, rim to core, each smaller one bulging out of the last toward the camera.
	flash: {
		atS: 3.0,
		azDeg: 8,
		elevDeg: 6,
		distance: 2500,
		riseS: 0.12,
		settle: 0.45,
		settleS: 0.7,
		white: 1.6,
		whiteS: 0.35,
		color: 'star',
		warm: 'glow',
		sky: 0.85,
		intensity: 9,
		fireball: {
			radius: 400,
			growS: 0.5,
			sit: 0.6,
			climb: 260,
			lumps: 0.14,
			shells: ['ember', 'glow', 'star'],
		},
	},
	// The dust thrown up behind the dam after the flash: `count` lumps along a front `wide` m across from `z`,
	// rolling `speed` m/s toward the camera, swelling from `size[0]` to `size[1]` m and lifting by `rise` m, in
	// `color` and partly lit by the flash itself (`lit`)
	dust: {
		count: 70,
		z: -680,
		wide: 700,
		speed: 80,
		size: [10, 38],
		rise: [60, 130],
		color: ['stone', 'haze', 0.5],
		lit: 0.45,
	},
}
