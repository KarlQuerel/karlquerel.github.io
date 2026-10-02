import frag from '../../shaders/intro/board.frag.glsl?raw'
import { BOARD } from '../../constants/intro/board.js'
import { INTRO_BOARD } from '../../data/gameIntro.js'
import { hermite, monotoneSlopes, ramp, smoothstep } from '../math.js'
import { hash1 } from '../pixelNoise.js'

const C = BOARD.chart
const frac = v => v - Math.floor(v)

// every ship but yours, in the order its light goes out: one fixed shuffle so the cascade is a story
export const LOST_ORDER = Array.from({ length: INTRO_BOARD.ships }, (_, i) => i + 1)
	.filter(s => s !== INTRO_BOARD.yours)
	.map(s => [hash1(s, BOARD.seed), s])
	.sort((a, b) => a[0] - b[0])
	.map(([, s]) => s)

// how many ships have gone dark by shot time t, and how far the crossing has run (0..1)
export const goneAt = t => Math.floor(ramp(t, BOARD.outFrom, BOARD.outTo) * LOST_ORDER.length)
const daysAt = t => smoothstep(ramp(t, BOARD.daysFrom, BOARD.daysTo))

// Where the chart sits in frame uv (y -0.5..0.5, x by aspect). The shader rebuilds the same frame
// from uH, so the DOM labels land on the stars they name.
export function chartLayout(aspect) {
	if (aspect < 1) {
		const P = C.portrait
		return { portrait: true, sol: [0, P.solY], spanX: aspect * 0.5 - P.sidePad, spanY: P.spanY }
	}
	const L = C.landscape
	const solX = -aspect * 0.5 + L.solInset
	return {
		portrait: false,
		sol: [solX, 0],
		spanX: aspect * 0.5 - L.rightPad - solX,
		spanY: L.spanY,
	}
}

// ship i's destination in chart space: an angle in the fan and a reach out from Sol
export function reachOf(i) {
	return C.near + (C.far - C.near) * Math.sqrt(frac(i * C.reachStep))
}
export function angleOf(i) {
	return (frac(i * C.angleStep) * 2 - 1) * C.spread
}

// a point `r` out along angle `a` from Sol, in frame uv
function chartPoint(layout, r, a) {
	const u = r * Math.cos(a)
	const v = r * Math.sin(a)
	const [sx, sy] = layout.sol
	return layout.portrait
		? [sx + v * layout.spanX, sy + u * layout.spanY]
		: [sx + u * layout.spanX, sy + v * layout.spanY]
}

// how far along its route ship i is: the far ones travel faster, so the fleet spreads out together
const shipProgress = (i, days) => Math.min(1, (days * BOARD.progMax * C.far) / reachOf(i))

// One key track of the chart camera, eased through its keys on a monotone cubic: no overshoot.
const CAM = BOARD.camera
const slopesOf = values => monotoneSlopes(CAM.at, values)
function track(values, slopes, t) {
	const at = CAM.at
	if (t <= at[0]) return values[0]
	const i = Math.min(
		at.length - 2,
		at.findLastIndex(a => a <= t)
	)
	const h = at[i + 1] - at[i]
	return hermite(
		values[i],
		values[i + 1],
		slopes[i],
		slopes[i + 1],
		h,
		Math.min(1, (t - at[i]) / h)
	)
}
const ZOOM = slopesOf(CAM.zoom)
const SHIP = slopesOf(CAM.ship)
const screenTrack = keys => [0, 1].map(k => [keys.map(p => p[k]), slopesOf(keys.map(p => p[k]))])
const SCREEN = screenTrack(CAM.screen)
const PORTRAIT_SCREEN = screenTrack(CAM.portraitScreen)

// The chart as the camera sees it at shot time t: the same layout, zoomed about the point it
// watches (between Sol and your marker) and slid to where that point sits in the frame. The shader
// and the labels both read this, so they cannot drift apart.
function cameraLayout(aspect, t) {
	const base = chartLayout(aspect)
	const z = track(CAM.zoom, ZOOM, t)
	const w = track(CAM.ship, SHIP, t)
	const i = INTRO_BOARD.yours
	const k = shipProgress(i, daysAt(t))
	const ship = chartPoint(base, reachOf(i) * k, angleOf(i))
	const look = [0, 1].map(a => base.sol[a] + (ship[a] - base.sol[a]) * w)
	const half = [aspect * 0.5, 0.5]
	const screen = (base.portrait ? PORTRAIT_SCREEN : SCREEN).map(
		([v, s], a) => track(v, s, t) * half[a]
	)
	return {
		portrait: base.portrait,
		sol: [0, 1].map(a => screen[a] + (base.sol[a] - look[a]) * z),
		spanX: base.spanX * z,
		spanY: base.spanY * z,
	}
}

// the lost ships as one exact integer, ship i at bit i - 1: ten bits fit a float with room to spare
const packLost = gone => LOST_ORDER.slice(0, gone).reduce((w, s) => w + 2 ** (s - 1), 0)

// When the j-th loss happens (0-based): goneAt crosses j + 1 at this moment.
const lostTime = j => BOARD.outFrom + ((j + 1) / LOST_ORDER.length) * (BOARD.outTo - BOARD.outFrom)
// how far along its route each lost ship got before it went dark; yours never stops
const STOPS = new Map(LOST_ORDER.map((s, j) => [s, shipProgress(s, daysAt(lostTime(j)))]))

// The stops as three floats for uP.yzw: ship i in word floor((i-1)/4), six bits each.
const STOP_WORDS = [0, 0, 0]
for (const [s, k] of STOPS) {
	const slot = s - 1
	STOP_WORDS[Math.floor(slot / BOARD.stopsPerWord)] +=
		Math.round(k * BOARD.stopLevels) * (BOARD.stopLevels + 1) ** (slot % BOARD.stopsPerWord)
}

export const board = {
	key: 'board',
	frag,
	duration: BOARD.duration,
	params(t, io, gl, grid) {
		const gone = goneAt(t)
		const latest = gone ? LOST_ORDER[gone - 1] : 0
		// when the latest ship went dark: the gone count crossed `gone` at this moment
		const lostAt = gone ? lostTime(gone - 1) : 0
		const layout = cameraLayout(grid.width / grid.height, t)
		return {
			p: [packLost(gone), ...STOP_WORDS],
			q: [latest, t - lostAt, daysAt(t), ramp(t, 0, BOARD.reveal)],
			h: [layout.sol[0], layout.sol[1], layout.spanX, layout.spanY],
		}
	},
}
