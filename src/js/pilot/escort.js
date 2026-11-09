// The spacewalker's escort: a drone (drone.js) on the space layer, lit by the sun, keeping station at her side
// as she makes her round, its eye on her chest and lighting her.

import { Matrix4, Quaternion, Vector3 } from 'three'
import { lampSpace, spaceThingMaterial } from './corridorMaterial.js'
import { buildDrone } from './drone.js'
import { PILOT_SPACE } from '../../constants/game/pilot.js'

const UP = new Vector3(0, 1, 0)

// spec: PILOT_SPACEWALKER.escort
export function addEscort(scene, { scale, offset, followS, chest, lamp }) {
	const escort = buildDrone(spaceThingMaterial)
	const { drone } = escort
	drone.scale.setScalar(scale)
	drone.traverse(o => o.layers.set(PILOT_SPACE.layer))
	scene.add(drone)
	const spot = new Vector3()
	const heart = new Vector3()
	const look = new Matrix4()
	const facing = new Quaternion()
	const eye = new Vector3()
	let placed = false

	// body: the spacewalker, placed for this frame (her left, up and ahead are her own x, y and z)
	return (dt, clock, body) => {
		spot.set(...offset)
			.applyQuaternion(body.quaternion)
			.add(body.position)
		heart.set(0, chest, 0).applyQuaternion(body.quaternion).add(body.position)
		// its eye, +z in its own frame, turned onto her chest
		look.lookAt(heart, spot, UP)
		facing.setFromRotationMatrix(look)
		const close = placed ? 1 - Math.exp(-dt / followS) : 1
		drone.position.lerp(spot, close)
		drone.quaternion.slerp(facing, close)
		placed = true
		escort.tick(clock)
		drone.updateMatrixWorld()
		lampSpace(drone.localToWorld(eye.copy(escort.eye)), lamp)
	}
}
