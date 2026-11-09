// What hangs outside the hull, on its own pass: the space layer drawn from the player's eye into a picture of
// the art grid's size, for the glass to show where it covers it, behind every wall, rib and frame the
// corridor puts in front of it.

import { NearestFilter, PerspectiveCamera, WebGLRenderTarget } from 'three'
import { seeSpace } from './corridorMaterial.js'
import { PILOT_SPACE } from '../../constants/game/pilot.js'

export function createSpaceLayer(renderer, camera) {
	const target = new WebGLRenderTarget(1, 1, {
		minFilter: NearestFilter,
		magFilter: NearestFilter,
	})
	const eye = new PerspectiveCamera(camera.fov, camera.aspect, PILOT_SPACE.near, PILOT_SPACE.far)
	eye.layers.set(PILOT_SPACE.layer)
	seeSpace(target.texture)
	return {
		resize(width, height) {
			target.setSize(width, height)
			eye.aspect = camera.aspect
			eye.updateProjectionMatrix()
		},
		// cleared to nothing, so the glass knows where nothing hangs
		render(scene) {
			eye.position.copy(camera.position)
			eye.quaternion.copy(camera.quaternion)
			const alpha = renderer.getClearAlpha()
			renderer.setClearAlpha(0)
			renderer.setRenderTarget(target)
			renderer.render(scene, eye)
			renderer.setClearAlpha(alpha)
		},
		dispose() {
			target.dispose()
		},
	}
}
