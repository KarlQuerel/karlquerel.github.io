// The journey route's path (JourneyRoute.vue): corners flown as arcs, walked by the tip at scroll speed.

import { ROUTE } from '../constants/journey.js'
import { clamp } from './math.js'

const quadAt = (a, c, b, t) => {
	const u = 1 - t
	return [
		u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
		u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
	]
}

// Corners are flown: each interior vertex becomes a small arc entered `turnPx` short of the corner.
// A vertex may carry its own radius as a third entry. Returns the SVG subpaths and the walkable run.
export function flyCorners(subpaths) {
	const segs = []
	const subs = []
	let total = 0
	const pushSeg = (x1, y1, x2, y2, len) => {
		if (len < 0.5) return
		segs.push({ x1, y1, x2, y2, len, cum: total, ya: y1, yb: y2 })
		total += len
	}
	for (const pts of subpaths) {
		const start = total
		let d = `M${pts[0][0]} ${pts[0][1]}`
		let cur = pts[0]
		for (let i = 1; i < pts.length; i++) {
			const corner = pts[i]
			const inLen = Math.hypot(corner[0] - cur[0], corner[1] - cur[1])
			const next = i < pts.length - 1 ? pts[i + 1] : null
			const outLen = next ? Math.hypot(next[0] - corner[0], next[1] - corner[1]) : 0
			const turn = corner[2] ?? ROUTE.turnPx
			const t = next
				? Math.min(turn, inLen * ROUTE.cornerLegShare, outLen * ROUTE.cornerLegShare)
				: 0
			if (!next || t < 2) {
				d += ` L${corner[0]} ${corner[1]}`
				pushSeg(cur[0], cur[1], corner[0], corner[1], inLen)
				cur = corner
				continue
			}
			const ax = corner[0] - ((corner[0] - cur[0]) / inLen) * t
			const ay = corner[1] - ((corner[1] - cur[1]) / inLen) * t
			const bx = corner[0] + ((next[0] - corner[0]) / outLen) * t
			const by = corner[1] + ((next[1] - corner[1]) / outLen) * t
			d += ` L${ax} ${ay} Q${corner[0]} ${corner[1]} ${bx} ${by}`
			pushSeg(cur[0], cur[1], ax, ay, Math.hypot(ax - cur[0], ay - cur[1]))
			// steps in proportion to the arc: a tight corner is still one chord
			const steps = clamp(Math.round(t / ROUTE.arcStepPx), 1, ROUTE.curveSteps)
			let prev = [ax, ay]
			for (let k = 1; k <= steps; k++) {
				const q = quadAt([ax, ay], corner, [bx, by], k / steps)
				pushSeg(prev[0], prev[1], q[0], q[1], Math.hypot(q[0] - prev[0], q[1] - prev[1]))
				prev = q
			}
			cur = [bx, by]
		}
		subs.push({ d, start, len: total - start })
	}
	evenTurns(segs)
	return { segs, subs, total }
}

// The tip crosses a turn at constant path speed: a turn group's y-extent is dealt out by arc length.
function evenTurns(segs) {
	const turning = s => s.y2 - s.y1 < s.len * ROUTE.straightAt
	let gi = 0
	while (gi < segs.length) {
		if (!turning(segs[gi])) {
			gi++
			continue
		}
		let gj = gi
		let dy = 0
		let len = 0
		while (gj < segs.length && turning(segs[gj])) {
			dy += segs[gj].y2 - segs[gj].y1
			len += segs[gj].len
			gj++
		}
		let y = segs[gi].y1
		for (let k = gi; k < gj; k++) {
			segs[k].ya = y
			y += (dy * segs[k].len) / len
			segs[k].yb = y
		}
		gi = gj
	}
}

// Flown length, tip position and the segment under it at page y `yT` — a walk over segments monotone
// in y. A tip inside a gap parks at the previous end and keeps its docked heading.
export function walkRoute(segs, total, yT) {
	let flown = total
	let pos = [segs.at(-1).x2, segs.at(-1).y2]
	let on = segs.at(-1)
	for (const s of segs) {
		if (yT >= s.yb) {
			pos = [s.x2, s.y2]
			on = s
			continue
		}
		if (yT <= s.ya) {
			flown = s.cum
			break
		}
		const t = (yT - s.ya) / (s.yb - s.ya)
		flown = s.cum + t * s.len
		pos = [s.x1 + (s.x2 - s.x1) * t, s.y1 + (s.y2 - s.y1) * t]
		on = s
		break
	}
	if (yT >= segs.at(-1).yb) flown = total
	return { flown, pos, on }
}
