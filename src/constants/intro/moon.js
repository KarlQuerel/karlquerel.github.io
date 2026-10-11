// The Moon's near side as the earth shot paints it (js/intro/earthArt.js): selenographic [lat, lon,
// radius] in degrees, north up and east to the right as seen from Earth. Long maria are a few blobs.
export const MOON = {
	maria: [
		// Oceanus Procellarum, the great western sea
		[28, -58, 15],
		[12, -55, 15],
		[-2, -45, 12],
		[38, -46, 9],
		[5, -30, 9],
		// Imbrium, Serenitatis, Tranquillitatis, Crisium
		[33, -16, 17],
		[28, 17, 10],
		[8, 30, 12],
		[17, 59, 7],
		// Fecunditatis, Nectaris, Nubium, Humorum, Cognitum, Vaporum
		[-8, 51, 9],
		[-15, 35, 5.5],
		[-21, -17, 10],
		[-24, -39, 6],
		[-10, -23, 5],
		[13, 4, 4],
		// Frigoris, the thin band across the north
		[56, -25, 4],
		[57, 0, 4.5],
		[55, 25, 4],
		// Plato's dark floor
		[51.6, -9.4, 1.6],
	],
	// bright young craters [lat, lon, radius, ray reach]: Tycho's rays cross half the disc
	craters: [
		[-43, -11, 2.2, 55],
		[9.6, -20, 2, 18],
		[8, -38, 1.4, 10],
		[24, -47, 1.2, 6],
	],
	// how far fbm pushes a mare's edge, in degrees, and at what scale
	ragged: 5,
	raggedScale: 0.12,
	// albedo of highland, mare, ray; `grain` the highland's speckle
	highland: 0.82,
	mare: 0.56,
	ray: 0.12,
	grain: 0.08,
	// the light's reach past the terminator (on n·l), and earthshine on the night side
	terminator: 0.18,
	earthshine: 0.1,
	seam: 0.3,
	ramp: ['void', 'ink', 'slate', 'ash', 'stone', 'bone', 'chalk', 'cream', 'linen'],
}
