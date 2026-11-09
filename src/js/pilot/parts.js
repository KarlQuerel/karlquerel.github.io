// The pilot's simple parts: a box about its middle and a rod from one point to another, in any material.

import { BoxGeometry, CylinderGeometry, Mesh, Vector3 } from 'three'

const UP = new Vector3(0, 1, 0)

export function box(at, half, material) {
	const mesh = new Mesh(new BoxGeometry(...half.map(h => 2 * h)), material)
	mesh.position.copy(at)
	return mesh
}

// `sides` round: 8 makes it the corridor's own octagon
export function rod(from, to, r, material, sides = 10) {
	const d = to.clone().sub(from)
	const mesh = new Mesh(new CylinderGeometry(r, r, d.length(), sides), material)
	mesh.position.copy(from).addScaledVector(d, 0.5)
	mesh.quaternion.setFromUnitVectors(UP, d.normalize())
	return mesh
}
