// The chimney's plume (PlanetEntry.vue): `puffs` flown from the lip on the surface's clock. Every puff
// reads the one wind (wind.js) as it blows, so a gust leans the whole plume at once, and a puff leaves
// the lip hot and slows as it cools, so under wind the plume curves over instead of tilting whole.
// Counted in cells of the band it rises from, shown on whole cells and whole frames of its sheet.

import { ENTRY } from '../constants/journey.js'
import { ramp } from './math.js'
import { hash1 } from './pixelNoise.js'

// a puff's climb in cells a life at `strength` of wind: `riseCells` in still air, `bend` of it gone
// under a full gust, scaled so the `cool` fade still sums to that over a life
function lift(strength) {
	const { riseCells, bend, cool } = ENTRY.smoke
	const { lull, gust } = ENTRY.wind
	return (riseCells * (1 - bend * ramp(strength, lull, gust))) / (1 - cool / 2)
}

// and its drift, in cells a life: `driftCells` a unit of wind, by its own share of it
const carry = (puff, strength) => ENTRY.smoke.driftCells * puff.wander * strength

// where a puff `age` into its life stands had the wind held at `strength` since it left the lip
function settle(puff, strength) {
	const { cool } = ENTRY.smoke
	puff.x = carry(puff, strength) * puff.age
	puff.y = lift(strength) * (puff.age - (cool * puff.age * puff.age) / 2)
}

export function createPlume() {
	const S = ENTRY.smoke
	const puffs = Array.from({ length: S.puffs }, (_, i) => ({
		// its own share of the wind, between `driftMin` and 2 minus it
		wander: S.driftMin + (1 - S.driftMin) * 2 * hash1(i, ENTRY.ridgeSeed),
		// staggered through a life, so the column stands full on its first frame
		age: i / S.puffs,
		x: 0,
		y: 0,
	}))
	const frames = S.cellsTo - S.cellsFrom + 1
	// what each puff last showed, so a frame that moves nothing paints nothing
	const keys = []

	// `dt` ms on in the wind as it blows now; a puff that reaches the top starts over at the lip
	function blow(strength, dt) {
		const step = dt / S.periodMs
		for (const puff of puffs) {
			puff.age += step
			if (puff.age >= 1) {
				puff.age %= 1
				settle(puff, strength)
			} else {
				puff.x += carry(puff, strength) * step
				puff.y += lift(strength) * (1 - S.cool * puff.age) * step
			}
		}
	}

	// Each puff on the band's `cell`: whole cells, a whole frame of its sheet, and a fade in `levels`
	// steps, handed to `paint(i, style)` only once something of it would change on screen.
	function show(cell, paint) {
		const { peak, fade } = S
		puffs.forEach((puff, i) => {
			const col = Math.round(puff.x)
			const row = Math.round(puff.y)
			const frame = Math.min(frames - 1, Math.floor(puff.age * frames))
			const level = Math.round(
				Math.min(ramp(puff.age, 0, fade.in), ramp(puff.age, 1, fade.hold)) * fade.levels
			)
			const key = `${cell}:${col},${row},${frame},${level}`
			if (key === keys[i]) return
			keys[i] = key
			paint(i, {
				translate: `${col * cell}px ${-row * cell}px`,
				backgroundPositionX: `${-frame * S.cellsTo * cell}px`,
				opacity: ((peak * level) / fade.levels).toFixed(3),
			})
		})
	}

	// the column as it would stand had the wind held at `strength`; shown afresh, spans and all
	function settleAll(strength) {
		puffs.forEach(puff => settle(puff, strength))
		keys.length = 0
	}

	return { settle: settleAll, blow, show }
}
