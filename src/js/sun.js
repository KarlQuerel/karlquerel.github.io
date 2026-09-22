// Where the arrival's sun stands. It crosses the whole sky rather than setting where it rose: up from
// behind the right-hand range, over in a low arc, down behind the left, then back under the world the
// way it came, so the glow before dawn gathers on the right where it will come up. None of it answers
// to the scroll: the visitor lands at the same noon every time, and the surface's own clock
// runs from there.

import { ENTRY } from '../constants/journey.js'
import { clamp01 } from './math.js'
import { cellFor } from './ridge.js'

// How far round the circuit the sun is, 0..1 from sunrise, entered at `arriveAt`. The two halves
// run on their own clocks: sunrise to sunset over `dayMs`, sunset back to sunrise over `nightMs`.
function dayAt(elapsed) {
	const { dayMs, nightMs, arriveAt } = ENTRY.sun.circuit
	// the entry hour as time into one turn, on whichever clock it falls in
	const start = arriveAt < 0.5 ? arriveAt * 2 * dayMs : dayMs + (arriveAt - 0.5) * 2 * nightMs
	const t = (start + elapsed) % (dayMs + nightMs)
	return t < dayMs ? (0.5 * t) / dayMs : 0.5 + (0.5 * (t - dayMs)) / nightMs
}

// Where the sun is, what its light is doing, and how far night has come. All of it answers to the
// sun's height and nothing else: the rim reddens as it comes down (`low`), and night falls by how far
// under the skyline it is, so midnight is dark because the sun is under the world then — not because a
// timer said so. Night walks linearly with depth: twilight loses light about evenly per degree the sun
// sinks, and the arc already slows it into the bottom of the turn.
export function sunAt(elapsed = 0, frame) {
	const { horizon, rise, nightFrom, groundFrom, floor } = ENTRY.sun.circuit
	// the disc is sized in cells, so on a narrow frame the path pulls in to keep it off the edges
	const span = frame?.w
		? Math.min(ENTRY.sun.circuit.span, 0.5 - (ENTRY.sun.r * cellFor(frame)) / frame.w)
		: ENTRY.sun.circuit.span
	const day = dayAt(elapsed)
	// Across the frame at one pace, right to left by day and back under the world by night, on a
	// parabola over the skyline and its mirror under it. A sun crosses the sky at a steady pace on a
	// line near enough straight; an ellipse plunged at the horizon and curled back while still in view.
	const up = day < 0.5
	const u = up ? 1 - 4 * day : 4 * day - 3
	const arc = rise * (1 - u * u)
	const y = up ? horizon - arc : horizon + arc
	const top = horizon - rise
	// night is full at the bottom of the turn, so the whole way down is twilight and none of it a plateau
	const gone = clamp01((y - nightFrom) / (horizon + rise - nightFrom))
	// The rock and the sky do not lose the sun together. The ranges lose it as the disc goes behind
	// them, over `groundFrom` to `horizon`; the sky holds its light to midnight, which is what keeps a
	// sunset worth looking at. On one clock the ranges were still two thirds lit with the disc long
	// gone, twice as bright as the sky that was by then their only light.
	const beam = 1 - clamp01((y - groundFrom) / (horizon - groundFrom))
	return {
		x: 0.5 + span * u,
		y,
		// how far down its arc the disc has come: 0 at the top of the turn, 1 as it meets the skyline
		low: clamp01((y - top) / (nightFrom - top)),
		light: 1 - (1 - floor) * gone,
		// what is left of the direct sun on the rock: the ranges' own light, their shadows and the
		// warmth near the disc all go out with it, since an occluded disc throws none of them
		beam,
		night: ENTRY.sun.night * gone,
		// the rock's night: at its floor as the disc vanishes, not at midnight
		ground: ENTRY.sun.night * (1 - beam),
	}
}
