// HERMES-8's inside dressed with a modelled hallway (SHIP_LAB.hallway), so every room walked in shares one look:
// one bay of it, cut pillar to pillar. Down each passage the whole bay repeats, fitted to its width, height and
// ramp. Round each other room walked in (a door into it unlocked), the bay's wall (panel, porthole, pillar, foot
// bar, and the cove up to the ceiling) repeats along each of the four walls, the middle of its ceiling (the light)
// runs in rows along the room, and its deck plates tile the floor. A wall is cut away under the ceiling across each
// door, down to the greybox's doorway or locked panel; the ceiling opens under the skylights; portholes on a hull
// window keep their glass, the others turn to panels. Every corner keeps the model's own normal, stretched as its
// position is, so its curves stay smooth and the pixel pass glints only on its real edges.

import { Box3, BufferGeometry, Float32BufferAttribute, Group, Mesh, Vector3 } from 'three'
import { SHIP_LAB } from '../../constants/game/shipLab.js'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { paletteHex } from '../../constants/palette.js'
import { loadProp } from './models.js'
import { floorOf, heightOf, longAxis, OPENINGS, OTHER } from './shipInterior.js'

const { model, role, relief, clear, inset, band, jamb, cove, lamp, rows, screen, paint } =
	SHIP_LAB.hallway

const walkedInto = room => SHIP_LAYOUT.doors.some(d => !d.locked && [d.a, d.b].includes(room.id))
const PASSAGES = SHIP_LAYOUT.rooms.filter(r => r.role === role)
const ROOMS = SHIP_LAYOUT.rooms.filter(r => r.role !== role && !r.open && walkedInto(r))
// the rooms the kit dresses, which the greybox leaves bare of its own trim
export const DRESSED = new Set([...PASSAGES, ...ROOMS].map(r => r.id))

const middle = ([a, b]) => (a + b) / 2
const within = ([a, b], [lo, hi]) => a >= lo && b <= hi
// a point over any of a room's skylights
const underSky = (room, [x, , z]) =>
	(room.skylights ?? []).some(s => within([x, x], s.x) && within([z, z], s.z))

// the polygon `poly` (corners [u, y, v, nu, ny, nv]) cut to its part on the `keep` side of its `k`th coordinate
// = at (-1 under, 1 over)
function cut(poly, at, keep, k = 2) {
	const kept = []
	poly.forEach((p, i) => {
		const q = poly[(i + 1) % poly.length]
		const [dp, dq] = [(p[k] - at) * keep, (q[k] - at) * keep]
		if (dp >= 0) kept.push(p)
		if (dp * dq < 0) kept.push(p.map((c, j) => c + ((q[j] - c) * dp) / (dp - dq)))
	})
	return kept
}

// the polygons less the span [a, b] along v: what is left before it and after it
const outside = (polys, [a, b]) =>
	polys.flatMap(p => [cut(p, a, -1), cut(p, b, 1)]).filter(p => p.length > 2)

// a corner [u, y, v, nu, ny, nv] of the bay stretched by [su, sy, sv]: its point, and its normal turned as a
// stretch turns it (the cofactor, safe when a stretch is 0)
const stretch = ([u, y, v, nu, ny, nv], [su, sy, sv]) => ({
	p: [u, y, v],
	n: [nu * sy * sv, ny * su * sv, nv * su * sy],
})

// the bay: its size, its triangles by material (corners with normals, and each one's middle) in its own frame (x
// across, centred; y up; z along), its glass, where its portholes lie, and the panel a porthole off the hull becomes
async function loadBay() {
	const bay = await loadProp({ url: model, paint })
	bay.updateMatrixWorld(true)
	const size = new Box3().setFromObject(bay).getSize(new Vector3())
	const parts = []
	bay.traverse(o => {
		if (!o.isMesh) return
		const { position, normal } = o.geometry
			.toNonIndexed()
			.applyMatrix4(o.matrixWorld).attributes
		const tris = []
		for (let t = 0; t < position.count; t += 3) {
			const tri = [t, t + 1, t + 2].map(i => [
				position.getX(i),
				position.getY(i),
				position.getZ(i),
				normal.getX(i),
				normal.getY(i),
				normal.getZ(i),
			])
			tris.push({ tri, mid: [0, 1, 2].map(k => (tri[0][k] + tri[1][k] + tri[2][k]) / 3) })
		}
		parts.push({ material: o.material, tris })
	})
	const glass = parts.find(p => p.material.name === 'hall_glass')
	const ends = k =>
		[Math.min, Math.max].map(f => f(...glass.tris.flatMap(t => t.tri.map(p => p[k]))))
	const panel = glass.material.clone()
	panel.name = 'hall_screen'
	panel.color.set(paletteHex(screen))
	return {
		size,
		half: size.x / 2,
		parts,
		glass: glass.material,
		port: { y: ends(1), z: ends(2) },
		panel,
	}
}

// `length` m split into whole bays: how many, each one's length, and the bay's z scaled to it
function baysAlong(length, bay) {
	const count = Math.max(1, Math.round(length / bay.size.z))
	const step = length / count
	return { count, step, kz: step / bay.size.z }
}

// the doors in a room's wall across `axis` on `side`, as spans along the wall widened by the jamb
const doorsIn = (room, axis, side) =>
	OPENINGS.filter(
		o =>
			o.axis === axis && o.rooms.includes(room) && o.mid < middle(room[axis]) === (side === 0)
	).map(o => [o.from - jamb, o.to + jamb])

// a point and normal in a room's frame, `w` across `axis` and `t` along the other, `y` up the bay: in the world
const toRoom = (room, axis, ky, [w, y, t], [nw, ny, nt]) => {
	const [x, z] = axis === 'x' ? [w, t] : [t, w]
	return {
		p: [x, floorOf(room, z) + inset + y * ky, z],
		n: axis === 'x' ? [nw, ny, nt] : [nt, ny, nw],
	}
}

// a passage: the whole bay down it, its walls squeezed where it is narrow, its middle stretched
function dressPassage(room, bay, emit) {
	if (longAxis(room) !== 'z') throw new Error(`passage ${room.id} must run along z`)
	const { size, half, parts, glass, port, panel } = bay
	const [x0, x1] = room.x
	const mid = middle(room.x)
	const { count, step, kz } = baysAlong(room.z[1] - room.z[0], bay)
	const ky = (heightOf(room) - 2 * inset) / size.y
	const deep = Math.min(relief, Math.max(0, (x1 - x0 - clear) / 2))
	const edge = (x1 - x0) / 2 - inset
	const wallZone = u => Math.abs(u) >= half - relief
	const across = u =>
		wallZone(u)
			? Math.sign(u) * (edge - ((half - Math.abs(u)) * deep) / relief)
			: (u * (edge - deep)) / (half - relief)
	const acrossRate = u => (wallZone(u) ? deep / relief : (edge - deep) / (half - relief))
	const windowsOn = side => room.windows?.filter(w => w.wall === `x${side}`) ?? []
	const doors = [0, 1].map(side => doorsIn(room, 'x', side))
	for (let i = 0; i < count; i++) {
		const z0 = room.z[0] + i * step
		const map = corner => {
			const { p, n } = stretch(corner, [acrossRate(corner[0]), ky, kz])
			return toRoom(room, 'x', ky, [mid + across(p[0]), p[1], z0 + p[2] * kz], n)
		}
		const gaps = doors.map(spans => spans.map(([a, b]) => [(a - z0) / kz, (b - z0) / kz]))
		// a porthole wholly on a window of the hull sees out
		const sees = [0, 1].map(side =>
			windowsOn(side).some(
				w =>
					within(
						port.z.map(v => z0 + v * kz),
						[w.at - w.width / 2, w.at + w.width / 2]
					) &&
					within(
						port.y.map(y => inset + y * ky),
						[w.sill, w.head]
					)
			)
		)
		for (const { material, tris } of parts)
			for (const { tri, mid: c } of tris) {
				const side = Number(c[0] > 0)
				if (c[1] > band[1] && underSky(room, map([...c, 0, 1, 0]).p)) continue
				const wall = wallZone(c[0]) && c[1] > band[0] && c[1] < band[1]
				const pieces = wall ? gaps[side].reduce(outside, [tri]) : [tri]
				emit(material === glass && !sees[side] ? panel : material, pieces, map, false)
			}
	}
}

// a room: the bay's wall along each of its four walls, the bay's ceiling middle in rows along it, its deck plates
// over the floor
function dressRoom(room, bay, emit) {
	const { size, half, parts, glass, panel } = bay
	const ky = (heightOf(room) - 2 * inset) / size.y
	// the walls: one side of the bay out to its cove, the bay's u = -half on the wall
	for (const axis of ['x', 'z'])
		for (const side of [0, 1]) {
			const along = OTHER[axis]
			const s = side ? -1 : 1
			const { count, step, kz } = baysAlong(room[along][1] - room[along][0], bay)
			const doors = doorsIn(room, axis, side)
			// across the wall to `axis`, along it to the other: mirrored, the triangles turn over
			const flip = (axis === 'x' ? s : -s) < 0
			for (let i = 0; i < count; i++) {
				const t0 = room[along][0] + i * step
				const map = corner => {
					const { p, n } = stretch(corner, [1, ky, kz])
					const w = room[axis][side] + s * (inset + p[0] + half)
					return toRoom(room, axis, ky, [w, p[1], t0 + p[2] * kz], [s * n[0], n[1], n[2]])
				}
				const gaps = doors.map(([a, b]) => [(a - t0) / kz, (b - t0) / kz])
				for (const { material, tris } of parts)
					for (const { tri, mid: c } of tris) {
						if (c[1] < band[0]) continue
						if (c[1] > band[1] && underSky(room, map([...c, 0, 1, 0]).p)) continue
						// cut clean at the cove, where the ceiling's rows take over
						const kept = cut(tri, -cove, -1, 0)
						if (kept.length < 3) continue
						const wall = c[0] < relief - half && c[1] < band[1]
						const pieces = wall ? gaps.reduce(outside, [kept]) : [kept]
						emit(material === glass ? panel : material, pieces, map, flip)
					}
			}
		}
	// the ceiling's light box, `lamp` m either side of its middle, in rows along the room between the coves
	const long = longAxis(room)
	const across = OTHER[long]
	const flip = long === 'x'
	const span = room[across][1] - room[across][0] - 2 * (half - cove)
	const rowCount = Math.max(1, Math.round(span / rows))
	const { count, step, kz } = baysAlong(room[long][1] - room[long][0], bay)
	for (let j = 0; j < rowCount; j++) {
		const r = room[across][0] + half - cove + (span * (j + 0.5)) / rowCount
		for (let i = 0; i < count; i++) {
			const t0 = room[long][0] + i * step
			const map = corner => {
				const { p, n } = stretch(corner, [1, ky, kz])
				return toRoom(room, across, ky, [r + p[0], p[1], t0 + p[2] * kz], n)
			}
			for (const { material, tris } of parts)
				for (const { tri, mid: c } of tris) {
					// over the deck in the bay's middle there is only its ceiling, hanging lower than a door
					if (c[1] <= band[0] || underSky(room, map([...c, 0, 1, 0]).p)) continue
					const kept = cut(cut(tri, -lamp, 1, 0), lamp, -1, 0)
					if (kept.length > 2) emit(material, [kept], map, flip)
				}
		}
	}
	// the deck: the bay's floor between its foot bars, tiled plate for plate, cut to the room
	const tile = 2 * (half - relief)
	for (let a = room[across][0]; a < room[across][1]; a += tile)
		for (let t = room[long][0]; t < room[long][1]; t += size.z) {
			const map = corner => {
				const { p, n } = stretch(corner, [1, ky, 1])
				return toRoom(room, across, ky, [a + p[0] + tile / 2, p[1], t + p[2]], n)
			}
			const ends = [room[across][1] - a - tile / 2, room[long][1] - t]
			for (const { material, tris } of parts)
				for (const { tri, mid: c } of tris)
					if (c[1] < band[0] && Math.abs(c[0]) < tile / 2) {
						const kept = cut(cut(tri, ends[0], -1, 0), ends[1], -1, 2)
						if (kept.length > 2) emit(material, [kept], map, flip)
					}
		}
}

// the passages and rooms dressed, one mesh a material
export async function dressShip() {
	const bay = await loadBay()
	const out = new Map()
	// each polygon fanned into triangles placed by `map`, turned over if `flip`
	const emit = (material, polygons, map, flip) => {
		if (!out.has(material)) out.set(material, { position: [], normal: [] })
		const into = out.get(material)
		for (const poly of polygons)
			for (let k = 1; k + 1 < poly.length; k++)
				for (const q of flip
					? [poly[0], poly[k + 1], poly[k]]
					: [poly[0], poly[k], poly[k + 1]]) {
					const { p, n } = map(q)
					const length = Math.hypot(...n) || 1
					into.position.push(...p)
					into.normal.push(...n.map(c => c / length))
				}
	}
	for (const room of PASSAGES) dressPassage(room, bay, emit)
	for (const room of ROOMS) dressRoom(room, bay, emit)
	const dressed = new Group()
	for (const [material, { position, normal }] of out) {
		const geometry = new BufferGeometry()
		geometry.setAttribute('position', new Float32BufferAttribute(position, 3))
		geometry.setAttribute('normal', new Float32BufferAttribute(normal, 3))
		dressed.add(new Mesh(geometry, material))
	}
	return dressed
}
