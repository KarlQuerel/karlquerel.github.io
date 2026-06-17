/***	SPLIT-FLAP DISPLAY CONFIG		***/
// Timing + glyph pool for the Solari departure-board hero transition (useSplitFlap.js).
// All durations are in milliseconds. Settle time for a line is roughly:
//   lastCharIndex * STAGGER_MS + FLIPS_PER_CHAR * FRAME_MS
// Longest current line is ~30 chars -> 29 * 18 + 8 * 45 ≈ 882ms, within the ~0.6-0.9s target.
// Spaces never cycle; the pool includes the punctuation that actually appears (`.` and `,`).

export const SPLIT_FLAP_CONFIG = {
	FRAME_MS: 45, // time each intermediate glyph is shown (stepped, no easing)
	FLIPS_PER_CHAR: 8, // intermediate glyphs cycled before a character locks
	STAGGER_MS: 18, // extra start delay added per character index (left -> right)
	GLYPH_POOL: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,', // glyphs cycled while flipping
}
