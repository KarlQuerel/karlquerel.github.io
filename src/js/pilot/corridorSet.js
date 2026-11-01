// The corridor as meshes: an octagonal hull with its ends capped (the back wall, the door wall), rib
// rings, the deck's walkway, light strips, lamps, the lit door and the lockers short of it.

import {
	BoxGeometry,
	Color,
	DoubleSide,
	ExtrudeGeometry,
	HemisphereLight,
	InstancedMesh,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Object3D,
	Path,
	PlaneGeometry,
	PointLight,
	Shape,
} from 'three'
import { paletteHex } from '../../constants/palette.js'
import { PILOT } from '../../constants/game/pilot.js'

const color = name => new Color(paletteHex(name))
const metal = name =>
	new MeshStandardMaterial({
		color: color(name),
		flatShading: true,
		roughness: 0.85,
		metalness: 0.2,
	})
const lit = name => new MeshBasicMaterial({ color: color(name) })

// the hull's cross-section, `inset` in from it all round, corner to corner
function octagon(path, inset) {
	const { halfWidth, height, chamfer } = PILOT.hull
	const w = halfWidth - inset
	const c = chamfer
	path.moveTo(-w + c, inset)
	path.lineTo(w - c, inset)
	path.lineTo(w, inset + c)
	path.lineTo(w, height - inset - c)
	path.lineTo(w - c, height - inset)
	path.lineTo(-w + c, height - inset)
	path.lineTo(-w, height - inset - c)
	path.lineTo(-w, inset + c)
	path.closePath()
	return path
}

function hull() {
	const { back, door } = PILOT.hull
	const geo = new ExtrudeGeometry(octagon(new Shape(), 0), {
		depth: door - back,
		bevelEnabled: false,
	})
	const mesh = new Mesh(geo, metal(PILOT.hullColor))
	mesh.material.side = DoubleSide
	mesh.position.z = back
	return mesh
}

function ribs() {
	const { back, door } = PILOT.hull
	const { every, inset, depth } = PILOT.ribs
	const ring = octagon(new Shape(), 0)
	ring.holes.push(octagon(new Path(), inset))
	const geo = new ExtrudeGeometry(ring, { depth, bevelEnabled: false })
	const count = Math.floor((door - back) / every)
	const mesh = new InstancedMesh(geo, metal(PILOT.ribColor), count)
	const at = new Object3D()
	for (let i = 0; i < count; i++) {
		at.position.z = back + every * (i + 0.5)
		at.updateMatrix()
		mesh.setMatrixAt(i, at.matrix)
	}
	return mesh
}

function deck() {
	const { halfWidth, chamfer, back, door } = PILOT.hull
	const mesh = new Mesh(
		new PlaneGeometry(2 * (halfWidth - chamfer), door - back),
		metal(PILOT.deckColor)
	)
	mesh.rotation.x = -Math.PI / 2
	mesh.position.set(0, 0.01, (back + door) / 2)
	return mesh
}

// one strip down each upper chamfer, lying along it
function strips() {
	const { halfWidth, height, chamfer, back, door } = PILOT.hull
	return [-1, 1].map(side => {
		const mesh = new Mesh(
			new BoxGeometry(PILOT.strip.width, 0.02, door - back),
			lit(PILOT.strip.color)
		)
		mesh.position.set(side * (halfWidth - chamfer / 2), height - chamfer / 2, (back + door) / 2)
		mesh.rotation.z = (side * Math.PI) / 4
		return mesh
	})
}

function lamps() {
	const { height, back, door } = PILOT.hull
	const { every, intensity, distance } = PILOT.lamps
	const out = []
	for (let z = back + every / 2; z < door; z += every) {
		const lamp = new PointLight(color(PILOT.lamps.color), intensity, distance)
		lamp.position.set(0, height - 0.3, z)
		out.push(lamp)
	}
	return out
}

function door() {
	const { width, height, x, intensity, distance } = PILOT.door
	const panel = new Mesh(new PlaneGeometry(width, height), lit(PILOT.door.color))
	panel.position.set(x, height / 2, PILOT.hull.door - 0.02)
	panel.rotation.y = Math.PI
	const glow = new PointLight(color(PILOT.door.color), intensity, distance)
	glow.position.set(x, PILOT.eye, PILOT.hull.door - 1)
	return [panel, glow]
}

function lockers() {
	const { count, from, width, depth, height } = PILOT.lockers
	const geo = new BoxGeometry(depth, height, width)
	const mat = metal(PILOT.lockers.color)
	return Array.from({ length: count }, (_, i) => {
		const mesh = new Mesh(geo, mat)
		mesh.position.set(-PILOT.hull.halfWidth + depth / 2, height / 2, from + i * (width + 0.04))
		return mesh
	})
}

export function addCorridor(scene) {
	const { sky, ground, intensity } = PILOT.ambient
	scene.add(
		hull(),
		ribs(),
		deck(),
		...strips(),
		...lamps(),
		...door(),
		...lockers(),
		new HemisphereLight(color(sky), color(ground), intensity)
	)
}
