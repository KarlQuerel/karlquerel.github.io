// The landing's camera (HomeJourney.vue): keyframes placed off the measured stations, one cubic per
// channel through them, and the departure's run down the corridor.

import { ARRIVAL, CAMERA, HERO_FLYBY, JOURNEY } from '../constants/journey.js'
import { hermite, monotoneSlopes } from './math.js'

// A missing channel holds at its default.
const CAM_CHANNELS = { x: 0, y: 0, scale: 1, fade: 1, roll: 0, tilt: 0, light: 0 }

// Keyframes in scrolled-px space, off the stations' tops and bottoms in track px.
export function camKeyframes(
	cameras,
	{ vh, workTop, workBottom, lifeTop, lifeBottom, arrivalTop }
) {
	const runwayPx = (ARRIVAL.runwayVh / 100) * vh
	// the run from the top of the page to the WORK dock: the whole flight out
	const dock = workTop - vh
	const workHold = workBottom - vh / 2
	const lifeDock = lifeTop - vh
	const lifeFoot = lifeBottom - vh / 2
	// the skim bottoms out mid-way through the WORK -> LIFE leg, then holds at the deck
	const diveAt = (workHold + lifeDock) / 2
	const beat = JOURNEY.departure
	return [
		{ s: 0, ...cameras.rest },
		{ s: dock * beat.void, ...cameras.void },
		{ s: dock * beat.dot, ...cameras.dot },
		{ s: dock * beat.close, ...cameras.close },
		{ s: dock * beat.orbitIn, ...cameras.orbitIn },
		{ s: dock * beat.orbitOut, ...cameras.orbitOut },
		{ s: dock, ...cameras.work },
		{ s: workHold, ...cameras.workEnd },
		{ s: diveAt, ...cameras.dive },
		{ s: diveAt + (lifeDock - diveAt) * JOURNEY.skimHoldAt, ...cameras.skim },
		{ s: lifeDock, ...cameras.life },
		{ s: lifeFoot, ...cameras.lifeEnd },
		// the turn onto the approach axis, well before the runway starts
		{ s: lifeFoot + (arrivalTop - lifeFoot) * JOURNEY.lineUpAt, ...cameras.lineUp },
		{ s: arrivalTop, ...cameras.approach },
		{ s: arrivalTop + runwayPx * ARRIVAL.entryAt, ...cameras.entry },
		{ s: arrivalTop + runwayPx * ARRIVAL.goneAt, ...cameras.gone },
	]
}

// The camera at any scroll. Monotone slopes: easing each segment on its own parked it at every keyframe.
export function cameraSampler(pts) {
	if (pts.length < 2) return () => ({ ...CAM_CHANNELS, ...CAMERA.rest })
	const xs = pts.map(p => p.s)
	const slopes = {}
	for (const [key, base] of Object.entries(CAM_CHANNELS)) {
		slopes[key] = monotoneSlopes(
			xs,
			pts.map(p => p[key] ?? base)
		)
	}
	return s => {
		if (s <= pts[0].s) return { ...CAM_CHANNELS, ...pts[0] }
		for (let i = 0; i < pts.length - 1; i++) {
			const a = pts[i]
			const b = pts[i + 1]
			if (s <= b.s) {
				const h = b.s - a.s || 1
				const t = (s - a.s) / h
				const frame = {}
				for (const [key, base] of Object.entries(CAM_CHANNELS)) {
					const m = slopes[key]
					frame[key] = hermite(a[key] ?? base, b[key] ?? base, m[i], m[i + 1], h, t)
				}
				return frame
			}
		}
		return pts[pts.length - 1]
	}
}

// How far down the corridor the camera has run, in world units — the one number the flight comes from.
export function flown(p) {
	const h = HERO_FLYBY.spoolUp
	const d = p < h ? (p * p) / (2 * h) : p - h / 2
	const t = d / (1 - h / 2)
	const run = HERO_FLYBY.titleZ * (1 - 1 / HERO_FLYBY.nearScale)
	return t <= 1 ? HERO_FLYBY.titleZ * (1 - HERO_FLYBY.nearScale ** -t) : run * t
}

// The right edge of a part's copy — its text runs, not its boxes: a centred title's box spans the column.
export function textRight(part) {
	const range = document.createRange()
	const walker = document.createTreeWalker(part, NodeFilter.SHOW_TEXT)
	let right = -Infinity
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		if (!node.data.trim()) continue
		range.selectNodeContents(node)
		right = Math.max(right, range.getBoundingClientRect().right)
	}
	return right
}
