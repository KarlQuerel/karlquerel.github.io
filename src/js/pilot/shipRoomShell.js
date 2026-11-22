// A ship room built for itself, its box (SHIP_LAYOUT) in the corridor's language: the walls are panels standing off
// the deck over a dark recess, split at seams and cut round each door; the ceiling's edges are cut at 45° with a line
// of light down the middle of each cut; an open door framed in light, a locked one shut by a dark panel set back with
// a red seam down it; on the walls chosen, a lit niche in the middle of each stretch between doors; a
// flat ceiling and deck. Faces come by part, for the room to paint, with the lines of light for its own light.

import { BufferGeometry, Float32BufferAttribute, Mesh } from 'three'
import { doorsIn, floorOf, heightOf, OTHER } from './shipInterior.js'

// how far a line of light stands proud of its cut, clear of it in the depth buffer
const PROUD = 0.004

// faces (flat triangles' corners) as one mesh
export function facesMesh(positions, material) {
	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
	geometry.computeVertexNormals()
	return new Mesh(geometry, material)
}

// a room's wall ('x0', 'x1', 'z0' or 'z1'): its axis and side, its span along, and a point on it (`u` along, `y` over
// the deck, `w` back behind its face)
export function wallFrame(room, wall) {
	const [axis, side] = [wall[0], Number(wall[1])]
	const out = side ? 1 : -1
	const floor = floorOf(room, room.z[0])
	const at = (u, y, w) => {
		const c = room[axis][side] + out * w
		return axis === 'x' ? [c, floor + y, u] : [u, floor + y, c]
	}
	return { axis, side, span: room[OTHER[axis]], at }
}

// the rect `u` × `y` less a hole { u, y } (clipped to it): the pieces round it, each { u, y }
function around(u, y, hole) {
	const whole = [{ u, y }]
	if (!hole) return whole
	const [h0, h1] = [Math.max(u[0], hole.u[0]), Math.min(u[1], hole.u[1])]
	const [g0, g1] = [Math.max(y[0], hole.y[0]), Math.min(y[1], hole.y[1])]
	if (h0 >= h1 || g0 >= g1) return whole
	return [
		{ u: [u[0], h0], y },
		{ u: [h1, u[1]], y },
		{ u: [h0, h1], y: [y[0], g0] },
		{ u: [h0, h1], y: [g1, y[1]] },
	].filter(p => p.u[1] > p.u[0] && p.y[1] > p.y[0])
}

// the room's faces by part (recess, panel, cove, line, frame, door, lock, niche, ceiling, floor) and its lines of
// light ({ a, b, kind, face?, wrap? }: a cove's, the light under an open door's head, each hung `standoff` m out into
// the room, and a niche's), from the shell's sizes (SHIP_CRYO.shell). A locked door's seam lights nothing: red on the room's cold blues dithers to mud.
export function roomShell(room, { panel, seam, gap, recess, cove, line, standoff, niche }) {
	const faces = {}
	const quad = (part, a, b, c, d) => (faces[part] ??= []).push(...a, ...b, ...c, ...a, ...c, ...d)
	const lines = []
	const h = heightOf(room)
	const top = h - cove
	for (const wall of ['x0', 'x1', 'z0', 'z1']) {
		const { axis, side, span, at } = wallFrame(room, wall)
		const [start, end] = span
		const rect = (part, [u0, u1], [y0, y1], w) =>
			quad(part, at(u0, y0, w), at(u1, y0, w), at(u1, y1, w), at(u0, y1, w))
		const doors = doorsIn(room, axis, side).sort((p, q) => p.from - q.from)
		if (doors.some(d => d.head > top))
			throw new Error(`a door in ${room.id} rises into its cove`)
		// the wall less its doors, and on a wall with niches one in the middle of each stretch
		const solid = [start, ...doors.flatMap(d => [d.from, d.to]), end]
			.reduce((spans, u, i, all) => (i % 2 ? [...spans, [all[i - 1], u]] : spans), [])
			.filter(([u0, u1]) => u1 > u0)
		const holes = solid.map(([s0, s1]) => {
			if (!niche?.walls.includes(wall)) return null
			const m = (s0 + s1) / 2
			return { u: [m - niche.width / 2, m + niche.width / 2], y: [niche.sill, niche.head] }
		})
		// the dark behind, shut under and over (or the sky shows through the slit; under a door the frame's sill
		// covers it), and over each door a lintel
		solid.forEach((s, i) => {
			for (const p of around(s, [0, top], holes[i])) rect('recess', p.u, p.y, recess)
		})
		for (const y of [-PROUD, top])
			quad('recess', at(start, y, 0), at(end, y, 0), at(end, y, recess), at(start, y, recess))
		for (const d of doors) {
			rect('recess', [d.from, d.to], [d.head, top], recess)
			rect('panel', [d.from, d.to], [d.head, top], 0)
			const middle = (d.from + d.to) / 2
			if (d.locked) {
				rect('door', [d.from, d.to], [0, d.head], recess / 2)
				rect(
					'lock',
					[middle - line / 2, middle + line / 2],
					[0, d.head],
					recess / 2 - PROUD
				)
				continue
			}
			// the open door's frame: a line of light up each side and across its head, proud of the wall
			rect('frame', [d.from - line, d.from], [0, d.head + line], -PROUD)
			rect('frame', [d.to, d.to + line], [0, d.head + line], -PROUD)
			rect('frame', [d.from, d.to], [d.head, d.head + line], -PROUD)
			lines.push({
				a: at(d.from, d.head, -standoff),
				b: at(d.to, d.head, -standoff),
				kind: 'frame',
			})
		}
		// each stretch in panels about `panel` wide, a seam between them and at a door, none in a corner
		solid.forEach(([s0, s1], i) => {
			const count = Math.max(1, Math.round((s1 - s0) / panel))
			const step = (s1 - s0) / count
			for (let k = 0; k < count; k++) {
				const [u0, u1] = [s0 + k * step, s0 + (k + 1) * step]
				const lo = u0 > start ? u0 + seam / 2 : u0
				const hi = u1 < end ? u1 - seam / 2 : u1
				for (const p of around([lo, hi], [gap, top], holes[i])) rect('panel', p.u, p.y, 0)
			}
		})
		// each niche: its box `depth` back, a strip of light across its head and its line of light
		for (const hole of holes.filter(Boolean)) {
			const [u0, u1] = hole.u
			const [y0, y1] = hole.y
			const { depth } = niche
			rect('niche', hole.u, hole.y, depth)
			for (const y of hole.y)
				quad('niche', at(u0, y, 0), at(u1, y, 0), at(u1, y, depth), at(u0, y, depth))
			for (const u of hole.u)
				quad('niche', at(u, y0, 0), at(u, y1, 0), at(u, y1, depth), at(u, y0, depth))
			const inset = line
			quad(
				'line',
				at(u0 + inset, y1 - PROUD, inset),
				at(u1 - inset, y1 - PROUD, inset),
				at(u1 - inset, y1 - PROUD, depth - inset),
				at(u0 + inset, y1 - PROUD, depth - inset)
			)
			lines.push({
				a: at(u0 + inset, y1 - 2 * inset, depth / 2),
				b: at(u1 - inset, y1 - 2 * inset, depth / 2),
				kind: 'niche',
				face: [0, -1, 0],
				wrap: niche.wrap,
			})
		}
		// the cut up to the ceiling, mitred at the corners; `t` of the way up it, its ends, height and depth
		const cut = t => [start + t * cove, end - t * cove, top + t * cove, -t * cove]
		const band = (part, t0, t1, lift = 0) => {
			const [a0, a1, y0, w0] = cut(t0)
			const [b0, b1, y1, w1] = cut(t1)
			quad(
				part,
				at(a0, y0 - lift, w0 - lift),
				at(a1, y0 - lift, w0 - lift),
				at(b1, y1 - lift, w1 - lift),
				at(b0, y1 - lift, w1 - lift)
			)
		}
		band('cove', 0, 1)
		const half = line / 2 / (cove * Math.SQRT2)
		band('line', 0.5 - half, 0.5 + half, PROUD)
		const [m0, m1, y, w] = cut(0.5)
		lines.push({ a: at(m0, y, w), b: at(m1, y, w), kind: 'cove' })
	}
	const floor = floorOf(room, room.z[0])
	const [x0, x1] = room.x
	const [z0, z1] = room.z
	const sheet = (part, [a0, a1], [b0, b1], y) =>
		quad(part, [a0, y, b0], [a1, y, b0], [a1, y, b1], [a0, y, b1])
	sheet('ceiling', [x0 + cove, x1 - cove], [z0 + cove, z1 - cove], floor + h)
	sheet('floor', room.x, room.z, floor)
	return { faces, lines }
}
