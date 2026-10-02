// The visor overlay (IntroHud.vue): how the readouts stutter in while the HUD boots.
export const HUD = {
	// one garble step per this many ms: a stepped clock, never a fade
	garbleMs: 55,
	// what a line reads as before it settles
	glyphs: '#%&*+=/<>[]0123456789ABCDEF',
	// share of a booting line's characters still garbled
	garbleShare: 0.55,
}
