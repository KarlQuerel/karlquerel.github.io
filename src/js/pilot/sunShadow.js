// The sun's shadows: the crew's and the player's depth seen down the sun's rays, drawn each frame over the
// stretch of corridor its light comes into through the glass span, for the corridor's light to look up;
// and where each of them stands, for the dark round their feet under the lamps.

import {
	Box3,
	DepthTexture,
	DoubleSide,
	Matrix4,
	MeshDepthMaterial,
	OrthographicCamera,
	Vector3,
	WebGLRenderTarget,
} from 'three'
import { shadeCorridor, standCorridor } from './corridorMaterial.js'
import { PILOT_OUTSIDE, PILOT_SET, PILOT_SHADOW } from '../../constants/game/pilot.js'

// what the sun can light through the span: the corridor's width and height, from the span back (or on)
// as far as a ray travels along the walk while falling the corridor's height
function sunlitBox() {
	const [, up, along] = PILOT_OUTSIDE.sun
	const { halfWidth, height, span } = PILOT_SET
	const fall = (height * along) / up
	return new Box3(
		new Vector3(-halfWidth, 0, span.from - Math.max(0, fall)),
		new Vector3(halfWidth, height, span.to - Math.min(0, fall))
	)
}

// an orthographic camera looking down the sun's rays, its view fitted round the box
function sunCamera(box) {
	const centre = box.getCenter(new Vector3())
	const camera = new OrthographicCamera()
	camera.position
		.copy(centre)
		.addScaledVector(
			new Vector3(...PILOT_OUTSIDE.sun).normalize(),
			box.getSize(new Vector3()).length()
		)
	camera.lookAt(centre)
	camera.updateMatrixWorld()
	const { min, max } = box.clone().applyMatrix4(camera.matrixWorldInverse)
	Object.assign(camera, {
		left: min.x,
		right: max.x,
		bottom: min.y,
		top: max.y,
		near: -max.z,
		far: -min.z,
	})
	camera.updateProjectionMatrix()
	camera.layers.set(PILOT_SHADOW.layer)
	return camera
}

export function createSunShadow(renderer) {
	const { size, layer } = PILOT_SHADOW
	const target = new WebGLRenderTarget(size, size)
	target.depthTexture = new DepthTexture(size, size)
	const camera = sunCamera(sunlitBox())
	// both sides: a helmet's open visor or a cut neck must still block the light
	const depth = new MeshDepthMaterial({ side: DoubleSide })
	const casters = []
	shadeCorridor(
		target.depthTexture,
		new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
	)
	return {
		// a character casts: its every mesh seen from the sun as well, and the deck dark round its feet
		cast(root) {
			root.traverse(o => {
				if (o.isMesh) o.layers.enable(layer)
			})
			casters.push(root)
		},
		render(scene) {
			standCorridor(casters.map(root => root.position))
			scene.overrideMaterial = depth
			renderer.setRenderTarget(target)
			renderer.render(scene, camera)
			scene.overrideMaterial = null
		},
		dispose() {
			target.dispose()
			depth.dispose()
		},
	}
}
