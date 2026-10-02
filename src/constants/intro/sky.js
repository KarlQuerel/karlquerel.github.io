// The intro's shared sky (js/intro/sky.js): one star tile read at two depths, and the galaxy's band.
// A depth is how far a layer moves with a shot's pan, 1 = the shot's subject.
export const SKY = {
	// wider than a frame is tall, so the repeat never shows as a lattice
	tile: 512,
	density: 0.0035,
	// share of stars bright enough to carry a cross
	bright: 0.04,
	depths: [0.03, 0.08],
	galaxyDepth: 0.02,
}
