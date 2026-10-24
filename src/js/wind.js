// The surface's one wind, as a strength in [lull, gust] at `ms` on the page clock: every thing the
// air moves reads it here, so a gust bends them all at once.

import { ENTRY } from '../constants/journey.js'
import { ramp, smoothstep } from './math.js'
import { fbm1 } from './pixelNoise.js'

export function windAt(ms, seed) {
	const { lull, gust, gustMs, calm, blow } = ENTRY.wind
	// pushed apart at `calm`/`blow`, so the air mostly sits in a lull or a gust, not in between
	const t = smoothstep(ramp(fbm1(ms / gustMs, seed), calm, blow))
	return lull + (gust - lull) * t
}
