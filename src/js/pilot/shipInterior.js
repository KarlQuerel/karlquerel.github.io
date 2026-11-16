// HERMES-8's inside as a greybox (SHIP_LAYOUT): each room a box, its doors cut through the walls it shares, its
// windows, skylights and ports reaching out to glass under the skin, floors coloured by what the room is for. Built as
// faces by kind, for the game's meshes and for the Blender cutaway that reads the same faces; and, for the walk,
// where a body may stand and the floor under it.

import {
	BufferGeometry,
	DoubleSide,
	Float32BufferAttribute,
	Group,
	Mesh,
	MeshStandardMaterial,
	Path,
	Shape,
	ShapeGeometry,
	Vector2,
} from 'three'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { paletteHex } from '../../constants/palette.js'
import { ramp } from '../math.js'

const { rooms, doors, wall, door, ribs, lines, colors, roles, glass } = SHIP_LAYOUT
const ROOM = Object.fromEntries(rooms.map(room => [room.id, room]))
const GLOWS = new Set(['light', 'floorLine'])
export const OTHER = { x: 'z', z: 'x' }

const mix = ([a, b], t) => a + (b - a) * t
export const heightOf = room => room.height ?? SHIP_LAYOUT.height
// the room's long axis, and its extent across it
export const longAxis = room => (room.z[1] - room.z[0] >= room.x[1] - room.x[0] ? 'z' : 'x')

// a room's floor at z: a pair rises from its aft end to its fore end
export function floorOf(room, z) {
	const f = room.floor ?? SHIP_LAYOUT.floor
	return Array.isArray(f) ? mix(f, ramp(z, ...room.z)) : f
}

// the wall two rooms share: the axis across it and its middle on that axis
function seam(p, q) {
	for (const axis of ['x', 'z'])
		for (const [lo, hi] of [
			[p, q],
			[q, p],
		])
			if (Math.abs(hi[axis][0] - lo[axis][1] - wall) < 1e-6)
				return { axis, mid: lo[axis][1] + wall / 2 }
	throw new Error(`rooms ${p.id} and ${q.id} share no wall`)
}

// each door: its wall, the opening along it, its rooms, and the floor and top of the opening
export const OPENINGS = doors.map(d => {
	const [a, b] = [ROOM[d.a], ROOM[d.b]]
	const { axis, mid } = seam(a, b)
	const floor = floorOf(a, axis === 'z' ? mid : d.at)
	// as tall as a door, if the rooms with ceilings allow it
	const top = floor + Math.min(door.height, ...[a, b].filter(r => !r.open).map(heightOf))
	return {
		axis,
		mid,
		from: d.at - d.width / 2,
		to: d.at + d.width / 2,
		rooms: [a, b],
		floor,
		top,
	}
})

export const BOUNDS = {
	x: [Math.min(...rooms.map(r => r.x[0])), Math.max(...rooms.map(r => r.x[1]))],
	z: [Math.min(...rooms.map(r => r.z[0])), Math.max(...rooms.map(r => r.z[1]))],
}

// where a body `r` m round may stand: well inside a room, or through a door
export function standable(x, z, r) {
	const p = { x, z }
	return (
		rooms.some(
			room =>
				x >= room.x[0] + r && x <= room.x[1] - r && z >= room.z[0] + r && z <= room.z[1] - r
		) ||
		OPENINGS.some(
			o =>
				Math.abs(p[o.axis] - o.mid) <= wall / 2 + r &&
				p[OTHER[o.axis]] >= o.from + r &&
				p[OTHER[o.axis]] <= o.to - r
		)
	)
}

// the floor under a point, the room's it stands in or beside
export function floorAt(x, z) {
	const room = rooms.find(
		r => x >= r.x[0] - wall && x <= r.x[1] + wall && z >= r.z[0] - wall && z <= r.z[1] + wall
	)
	return room ? floorOf(room, z) : SHIP_LAYOUT.floor
}

// rooms of the role `dressed` get no light strips, ribs or floor lines: a model dresses them (shipHallway)
export function interiorFaces({ dressed } = {}) {
	const faces = {}
	// a flat four-cornered face of one kind, as two triangles
	const quad = (kind, a, b, c, d) => (faces[kind] ??= []).push(...a, ...b, ...c, ...a, ...c, ...d)
	// a box, centre and size
	const box = (kind, [cx, cy, cz], [sx, sy, sz]) => {
		const p = (i, j, k) => [cx + (i - 0.5) * sx, cy + (j - 0.5) * sy, cz + (k - 0.5) * sz]
		for (const [a, b, c, d] of [
			[p(0, 0, 0), p(1, 0, 0), p(1, 1, 0), p(0, 1, 0)],
			[p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)],
			[p(0, 0, 0), p(0, 0, 1), p(0, 1, 1), p(0, 1, 0)],
			[p(1, 0, 0), p(1, 0, 1), p(1, 1, 1), p(1, 1, 0)],
			[p(0, 1, 0), p(1, 1, 0), p(1, 1, 1), p(0, 1, 1)],
		])
			quad(kind, a, b, c, d)
	}
	// a point on a room's wall `axis` = c, `along` the other axis, `lift` over the floor there
	const on = (room, axis, c) => (along, lift) =>
		axis === 'x' ? [c, floorOf(room, along) + lift, along] : [along, floorOf(room, c) + lift, c]
	const panel = (kind, room, axis, c, [from, to], [lo, hi]) => {
		const at = on(room, axis, c)
		quad(kind, at(from, lo), at(to, lo), at(to, hi), at(from, hi))
	}
	// a flat rect over the room, `lift` over its floor
	const sheet = (kind, room, [x0, x1], [z0, z1], lift) =>
		quad(
			kind,
			[x0, floorOf(room, z0) + lift, z0],
			[x1, floorOf(room, z0) + lift, z0],
			[x1, floorOf(room, z1) + lift, z1],
			[x0, floorOf(room, z1) + lift, z1]
		)

	// a room's flat floor or ceiling `lift` over its floor, less the rects `holes` (a ramp has none)
	const slab = (kind, room, lift, holes) => {
		if (!holes.length) return sheet(kind, room, room.x, room.z, lift)
		const outline = ({ x: [x0, x1], z: [z0, z1] }) => [
			new Vector2(x0, z0),
			new Vector2(x1, z0),
			new Vector2(x1, z1),
			new Vector2(x0, z1),
		]
		const shape = new Shape(outline(room))
		shape.holes = holes.map(hole => new Path(outline(hole)))
		const flat = new ShapeGeometry(shape).toNonIndexed().attributes.position.array
		const y = floorOf(room, room.z[0]) + lift
		for (let i = 0; i < flat.length; i += 3) (faces[kind] ??= []).push(flat[i], y, flat[i + 1])
	}
	// a rect's corners, aft-left round to fore-left, at the heights `ys`
	const corners = ({ x: [x0, x1], z: [z0, z1] }, ys) => [
		[x0, ys[0], z0],
		[x1, ys[1], z0],
		[x1, ys[2], z1],
		[x0, ys[3], z1],
	]
	// a shaft or a well: four walls between a rect's corners at the heights `from` and `to`
	const shaft = (rect, from, to) => {
		const [a, b] = [corners(rect, from), corners(rect, to)]
		for (let k = 0; k < 4; k++) quad('wall', a[k], a[(k + 1) % 4], b[(k + 1) % 4], b[k])
	}
	const level = y => [y, y, y, y]

	for (const room of rooms) {
		const h = heightOf(room)
		const floor = floorOf(room, room.z[0])
		const skylights = room.skylights ?? []
		const ports = room.ports ?? []
		// the floor less its ports, each a well down through the belly under glass to walk on
		slab(`floor:${room.role}`, room, 0, ports)
		for (const port of ports) {
			shaft(port, level(floor), port.bottom)
			quad('glass', ...corners(port, level(floor + 0.002)))
		}
		// the four walls, each less its doors and windows: a lintel over a door the ceiling clears, a sill and a
		// head round a window, and the window's reveal out to its glass under the skin
		for (const axis of ['x', 'z'])
			for (const side of [0, 1]) {
				const c = room[axis][side]
				const along = room[OTHER[axis]]
				const windows = (room.windows ?? []).filter(w => w.wall === `${axis}${side}`)
				const cuts = [
					...OPENINGS.filter(
						o => o.axis === axis && o.rooms.includes(room) && o.mid < c === (side === 0)
					).map(o => ({ from: o.from, to: o.to, sill: 0, head: o.top - o.floor })),
					...windows.map(w => ({
						from: w.at - w.width / 2,
						to: w.at + w.width / 2,
						sill: w.sill,
						head: w.head,
					})),
				].sort((p, q) => p.from - q.from)
				let start = along[0]
				for (const o of cuts) {
					if (o.from > start) panel('wall', room, axis, c, [start, o.from], [0, h])
					if (o.sill > 0) panel('wall', room, axis, c, [o.from, o.to], [0, o.sill])
					if (o.head < h) panel('wall', room, axis, c, [o.from, o.to], [o.head, h])
					start = o.to
				}
				if (start < along[1]) panel('wall', room, axis, c, [start, along[1]], [0, h])
				const out = side === 0 ? -1 : 1
				const k0 = axis === 'x' ? 0 : 2
				for (const w of windows) {
					const at = on(room, axis, c)
					const [u0, u1] = [w.at - w.width / 2, w.at + w.width / 2]
					const inner = [at(u0, w.sill), at(u1, w.sill), at(u1, w.head), at(u0, w.head)]
					const outer = inner.map((p, k) =>
						p.map((v, i) => (i === k0 ? v + out * w.depth[k] : v))
					)
					for (let k = 0; k < 4; k++)
						quad('jamb', inner[k], inner[(k + 1) % 4], outer[(k + 1) % 4], outer[k])
					quad('glass', ...outer)
				}
			}
		if (room.open) continue
		// the ceiling less its skylights, each a shaft up to the skin, glazed under it
		slab('ceiling', room, h, skylights)
		for (const sky of skylights) {
			shaft(sky, level(floor + h), sky.top)
			if (sky.glass !== false) quad('glass', ...corners(sky, sky.top))
		}
		if (room.role === dressed) continue
		// light strips under the ceiling along the long walls; down a passage's floor too, and ribs across it
		const long = longAxis(room)
		const across = OTHER[long]
		const strip = (kind, inset, lift) => {
			for (const edge of [room[across][0] + inset, room[across][1] - inset - lines.width]) {
				const band = [edge, edge + lines.width]
				if (long === 'z') sheet(kind, room, band, room.z, lift)
				else sheet(kind, room, room.x, band, lift)
			}
		}
		strip('light', lines.inset.ceiling, h - 0.005)
		if (room.role !== 'passage') continue
		strip('floorLine', lines.inset.floor, 0.005)
		const [a0, a1] = room[across]
		// no rib across a doorway in the long walls
		const doorways = OPENINGS.filter(o => o.axis === across && o.rooms.includes(room))
		for (let t = room[long][0] + ribs.every / 2; t < room[long][1]; t += ribs.every) {
			if (doorways.some(o => t > o.from - ribs.thick && t < o.to + ribs.thick)) continue
			const f = floorOf(room, long === 'z' ? t : room.z[0])
			const at = (u, y) => (long === 'z' ? [u, y, t] : [t, y, u])
			const size = (u, y) => (long === 'z' ? [u, y, ribs.thick] : [ribs.thick, y, u])
			for (const u of [a0 + ribs.depth / 2, a1 - ribs.depth / 2])
				box('rib', at(u, f + h / 2), size(ribs.depth, h))
			box('rib', at((a0 + a1) / 2, f + h - ribs.depth / 2), size(a1 - a0, ribs.depth))
		}
	}
	// each door's frame across the wall: its floor, its two jambs and, under two ceilings, its head
	for (const o of OPENINGS) {
		const [u0, u1] = [o.mid - wall / 2, o.mid + wall / 2]
		const pt = (u, v, y) => (o.axis === 'x' ? [u, y, v] : [v, y, u])
		quad(
			'jamb',
			pt(u0, o.from, o.floor),
			pt(u1, o.from, o.floor),
			pt(u1, o.to, o.floor),
			pt(u0, o.to, o.floor)
		)
		for (const v of [o.from, o.to])
			quad('jamb', pt(u0, v, o.floor), pt(u1, v, o.floor), pt(u1, v, o.top), pt(u0, v, o.top))
		if (!o.rooms.some(r => r.open))
			quad(
				'jamb',
				pt(u0, o.from, o.top),
				pt(u1, o.from, o.top),
				pt(u1, o.to, o.top),
				pt(u0, o.to, o.top)
			)
	}
	return faces
}

function material(kind) {
	const [base, role] = kind.split(':')
	if (base === 'glass')
		return new MeshStandardMaterial({
			color: paletteHex(glass.color),
			transparent: true,
			opacity: glass.opacity,
			roughness: 0.1,
			side: DoubleSide,
		})
	const color = paletteHex(role ? roles[role].floor : colors[base])
	return GLOWS.has(base)
		? new MeshStandardMaterial({ color: 0, emissive: color, side: DoubleSide })
		: new MeshStandardMaterial({ color, roughness: 0.9, side: DoubleSide })
}

export function buildInterior(options) {
	const inside = new Group()
	for (const [kind, positions] of Object.entries(interiorFaces(options))) {
		const geometry = new BufferGeometry()
		geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
		geometry.computeVertexNormals()
		inside.add(new Mesh(geometry, material(kind)))
	}
	return inside
}
