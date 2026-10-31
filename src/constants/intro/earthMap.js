// The Earth of 3812, painted from its map by js/intro/earthMap.js for the holding screen: the real
// continents, the seas drained to their deep basins, the old seabed a dry salt pan, the land
// scorched and over-lit, smoke where the weather was, fires on the night side. Places are [lat, lon]
// in degrees, north and east positive; a region is [lat, lon, latReach, lonReach], an ellipse in
// degrees. Every ramp runs from the terminator to full sun.
export const EARTH_MAP = {
	seed: 613,
	// the coast: how far fine noise at `scale` over the unit sphere pushes it, as a share of land
	coast: { scale: 48, push: 0.3, octaves: 3 },
	// The drying. Sea within `drain` degrees of an old coast is gone and its bed a salt pan; the last
	// `rim` degrees before the water are the brine's pink shore; noise at `frayScale` moves the
	// waterline by up to `fray` degrees.
	drying: { drain: 6, rim: 1.2, fray: 2.5, frayScale: 10 },
	// What the land is: bleached dunes over the old deserts and wherever noise at `scale` tops
	// `bleached`, burned highland over the old ranges and under `-burnt`, scorched ground between;
	// the noise frays every edge, `desert` is the dune threshold.
	ground: {
		scale: 9,
		desert: 0.42,
		bleached: 0.12,
		burnt: 0.16,
		deserts: [
			[23, 10, 9, 28],
			[23, 46, 8, 11],
			[35, 60, 7, 12],
			[41, 95, 6, 16],
			[27, 71, 4, 5],
			[-25, 132, 9, 15],
			[-24, 20, 6, 8],
			[-22, -69, 7, 2.5],
			[-45, -69, 7, 4],
			[31, -111, 7, 8],
			[8, 46, 4, 5],
		],
		ranges: [
			[33, 88, 6, 14],
			[-20, -68, 24, 3],
			[45, -113, 12, 5],
			[46, 10, 2, 5],
			[32, -4, 2.5, 5],
			[32, 50, 5, 7],
			[10, 38, 4, 4],
		],
	},
	// The smoke, where the weather was: noise at `scale` over the sphere (`zonal` of it east to west,
	// so trails stretch along the wind), bent by a second field (`warp` of its own cells at
	// `warpScale`) so they curl; cover past `cover` is smoke, its edge dithered over `edge`. `belts`
	// lift or drop the cover by latitude: [lat, halfWidth, lift] in both hemispheres. `storms` twist
	// the field: [lat, lon, radius, swirl]. `texture` hollows a trail where finer noise at `scale`
	// falls under `below`. A trail casts its shadow `shadowOffset` of the sphere down-sun, dropping
	// the ground `shadowDrop` ramp steps.
	smoke: {
		scale: 9,
		zonal: 0.5,
		octaves: 5,
		warp: 0.9,
		warpScale: 2.2,
		cover: 0.53,
		edge: 0.05,
		belts: [
			[0, 7, 0.06],
			[30, 12, -0.08],
			[58, 12, 0.06],
		],
		storms: [
			[52, -24, 15, 2.6],
			[60, 32, 10, 2.2],
			[38, 17, 6, 1.8],
		],
		texture: { scale: 36, below: 0.42 },
		shadowOffset: 0.006,
		shadowDrop: 1,
	},
	// The fires: `regions` burn along fronts, where noise at `scale` crosses its middle within
	// `width`; the side it has crossed is burned out. At night the front is glow and ember, `lit` of
	// its cells, by day a black scar; `lift` more smoke rises over a burning region.
	fires: {
		scale: 14,
		width: 0.05,
		lit: 0.5,
		lift: 0.12,
		regions: [
			[12, 10, 5, 22],
			[37, -4, 3, 7],
			[45, 24, 4, 8],
			[50, 40, 5, 14],
			[27, 46, 6, 9],
			[-8, 25, 7, 14],
			[-25, 135, 8, 12],
			[40, -100, 7, 16],
			[-15, -58, 8, 10],
			[55, 95, 8, 30],
			[30, 110, 6, 10],
		],
	},
	// The light: `gain` spreads it over the ramps, high enough that the sun side bleaches toward
	// sand; each seam dithered over `seam` of a step
	light: { gain: 1.6, seam: 0.1 },
	ramps: {
		sea: ['void', 'deep', 'brine', 'brine', 'tide', 'tide'],
		shore: ['deep', 'brine', 'tide', 'shoal', 'foam', 'foam'],
		salt: ['ink', 'basalt', 'stone', 'bone', 'bone', 'chalk'],
		ground: ['ink', 'basalt', 'rust', 'ochre', 'clay', 'dune'],
		highland: ['ink', 'shale', 'basalt', 'rust', 'garnet', 'brick'],
		dune: ['ink', 'rust', 'clay', 'dune', 'sand', 'sand'],
		smoke: ['ink', 'ash', 'stone', 'stone', 'bone', 'bone'],
	},
	// a burn scar by day, in dusk and in sun
	scar: ['void', 'ink'],
	// the night side: the fires on it by the lattice's roll, and what is left of the cities (built
	// where a second world's land would be, above `built`, densest `spread` above it, thickest on
	// the coast and between `lats`, `lit` of its cells on a lattice `fine` across)
	night: {
		sea: 'void',
		land: 'ink',
		smoke: 'soot',
		fire: ['glow', 'ember', 'amber'],
		cities: { until: 0.02, built: 0.54, spread: 0.1, lit: 0.03, lats: [25, 60], fine: 160 },
	},
	// The air past the limb, in cells, thick with dust: `depth` toward the sun, `night` away from it,
	// `wrap` how far the glow reaches round. Inner band out, each [tone, cells at full depth], the
	// first only where the limb faces the sun past `lineFrom`; seams dithered over `seam` of a band,
	// the last band thinning out across its width.
	air: {
		depth: 12,
		night: 2,
		wrap: 0.6,
		bands: [
			['amber', 1.5],
			['haze', 3.5],
			['rust', 4],
			['garnet', 2.5],
		],
		lineFrom: 0.2,
		seam: 0.35,
	},
	// The air over the ground near the limb, seen edge-on: past `from` of the disc the ground goes
	// over to the pair of tones for its light, in two dithered steps spread by `gain`.
	limb: {
		from: 0.955,
		gain: 1.3,
		tones: { lit: ['clay', 'amber'], dusk: ['rust', 'clay'], night: [null, 'basalt'] },
	},
	tidyPasses: 2,
}
