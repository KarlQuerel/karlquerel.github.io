// A thruster's puffs of cold gas: small blocks of it lit white by the sun, flying off the way they were
// blown, swelling in steps and gone at the end of their life. One instanced mesh on the space layer, each puff
// scaled to nothing until it is blown.

import { BoxGeometry, InstancedMesh, Object3D, Vector3 } from 'three'
import { spaceThingMaterial } from './corridorMaterial.js'
import { PILOT_SPACE } from '../../constants/game/pilot.js'

// how far a puff strays from the way it was blown
const SPREAD = 0.35

export function createPuffs({ count, speed, size, grow, steps, lifeS }) {
	const mesh = new InstancedMesh(
		new BoxGeometry(size, size, size),
		spaceThingMaterial('puff'),
		count
	)
	mesh.layers.set(PILOT_SPACE.layer)
	// the puffs fly wherever the spacewalker goes, past any bounds worth testing
	mesh.frustumCulled = false
	const puffs = Array.from({ length: count }, () => ({
		p: new Vector3(),
		v: new Vector3(),
		age: 0,
		alive: false,
	}))
	const stray = new Vector3()
	const place = new Object3D()
	let next = 0
	return {
		mesh,
		// a puff from `from` blown along `dir` (unit), carried on at `drift`, the thruster's own velocity
		blow(from, dir, drift) {
			const k = puffs[next]
			next = (next + 1) % count
			stray.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
			k.p.copy(from)
			k.v
				.copy(dir)
				.addScaledVector(stray, SPREAD)
				.normalize()
				.multiplyScalar(speed)
				.add(drift)
			k.age = 0
			k.alive = true
		},
		tick(dt) {
			for (const [i, k] of puffs.entries()) {
				if (k.alive) {
					k.age += dt
					k.p.addScaledVector(k.v, dt)
					k.alive = k.age < lifeS
				}
				const step = Math.ceil((k.age / lifeS) * steps) / steps
				place.position.copy(k.p)
				place.scale.setScalar(k.alive ? 1 + (grow - 1) * step : 0)
				place.updateMatrix()
				mesh.setMatrixAt(i, place.matrix)
			}
			mesh.instanceMatrix.needsUpdate = true
		},
	}
}
