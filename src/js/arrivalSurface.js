// The arrival's surface: the dusk sky and the three ranges cut for the frame, then the sun's circuit
// run over them. Canvas work and arithmetic only, no DOM, so the same code runs on the page or in
// arrival.worker.js (see arrivalCut.js for which).

import { ENTRY } from '../constants/journey.js'
import { darkenSky, drawArrivalSky, paintSun, rebuildSky } from './arrivalSky.js'
import { cutRidge, lightRidge } from './ridge.js'
import { sunAt } from './sun.js'

// far → near, each with its parallax depth
export const ARRIVAL_BANDS = ['distant', 'far', 'near'].map(key => ({
	...ENTRY[key],
	key,
	depth: ENTRY.parallax[key],
}))

const tick = night => Math.floor(night / ENTRY.sun.notch)

export function createSurface({ sky: skyEl, bands: bandEls }) {
	let frame = { w: 0, h: 0 }
	// the kept sky (arrivalSky.js) and the ranges, cut once for the frame: the dear part
	let sky = null
	let ranges = []
	// the ranges' own night, kept so a notch of THEIR walk asks for a relight: it runs far faster than
	// the sky's around the setting, and on the sky's notch alone the rock darkened in visible stairs
	let groundLit = -1
	const jobs = []

	function lightRanges(now) {
		ranges.forEach(sprite => sprite && lightRidge(sprite, now))
		groundLit = now.ground
	}
	// one notch of night over everything that keeps its rungs
	function fall(now) {
		darkenSky(sky, now.night)
		lightRanges(now)
	}

	// Cut for `box` with the sun `sunk` ms into its circuit. Hands back where the habitat's chimney
	// stands, in the band's own fractions and cells, for the smoke.
	function cut(box, sunk) {
		frame = box
		const now = sunAt(sunk, frame)
		sky = drawArrivalSky(skyEl, frame, now)
		ranges = ARRIVAL_BANDS.map(
			(band, i) => bandEls[i] && cutRidge(bandEls[i], band, ENTRY.ridgeSeed, frame)
		)
		lightRanges(now)
		jobs.length = 0
		const i = ranges.findIndex(sprite => sprite?.vent)
		return i < 0 ? null : { ...ranges[i].vent, cell: ranges[i].cell, key: ARRIVAL_BANDS[i].key }
	}

	// One step of the circuit, at `sunk` ms on the surface. The disc is repainted whenever it has slid
	// `nudge` of a cell, where its edge starts to answer. Every `travel` cells the sky is placed again
	// and the ranges relit, so their light, shadows and glow follow the disc; between those, every
	// `notch` of a step of night the sky is darkened and the ranges relit, for a sun that sinks faster
	// than it travels. Work runs one job a step, and a step that lands on pending jobs folds into them:
	// a job reads the sun as it stands when it runs, so the step rate is the ceiling on how fine any of
	// it gets, never a backlog.
	function step(sunk) {
		if (!sky) return
		const set = sunAt(sunk, frame)
		const [cx, cy] = [set.x * sky.w, set.y * sky.h]
		if (!jobs.length) {
			if (Math.hypot(cx - sky.litX, cy - sky.litY) >= ENTRY.sun.travel) {
				jobs.push(s => rebuildSky(sky, s), lightRanges)
			} else if (tick(set.night) !== tick(sky.night)) {
				jobs.push(fall)
			} else if (tick(set.ground) !== tick(groundLit)) {
				jobs.push(lightRanges)
			}
		}
		const job = jobs.shift()
		if (job) job(set)
		if (job || Math.hypot(cx - sky.atX, cy - sky.atY) >= ENTRY.sun.nudge) paintSun(sky, set)
	}

	return { cut, step }
}
