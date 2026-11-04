// The corridor pilot in three.js: the walk the shader corridor uses, a first-person camera on it and
// the player's body under it, the corridor's meshes, the crew, and the pixel pass over it all.

import { Color, Fog, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { paletteHex } from '../../constants/palette.js'
import { PILOT } from '../../constants/game/pilot.js'
import { breathe, createWalk, lookWalk, stepWalk } from '../intro/walk.js'
import { clamp } from '../math.js'
import { addCorridor } from './corridorSet.js'
import { addCrew } from './crew.js'
import { createPixelPost } from './pixelPost.js'
import { addPlayerBody } from './playerBody.js'

export function createCorridorPilot() {
	let renderer = null
	let post = null
	let crew = null
	let body = null
	let time = 0
	let stride = 0
	const scene = new Scene()
	const camera = new PerspectiveCamera(PILOT.fovDeg, 1, PILOT.near, PILOT.far)
	camera.rotation.order = 'YXZ'
	const walk = createWalk(PILOT.walk)

	async function build(gl, step) {
		renderer = new WebGLRenderer({ canvas: gl.canvas, context: gl, antialias: false })
		renderer.setPixelRatio(1)
		const { color, near, far } = PILOT.fog
		scene.fog = new Fog(new Color(paletteHex(color)), near, far)
		addCorridor(scene)
		post = createPixelPost(renderer, camera)
		await step('context')
		crew = await addCrew(scene, part => step('models', part))
		body = await addPlayerBody(scene)
		// compile every program now, not on the first frame the player sees
		renderer.compile(scene, camera)
	}

	function resize({ width, height }) {
		renderer.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		post.resize(width, height)
	}

	// input: { keys, turn }, the walk keys held and the mouse travel since the last frame
	function frame(dt, input) {
		time += dt
		lookWalk(walk, input.turn)
		walk.pitch = clamp(walk.pitch, -PILOT.tilt.down, PILOT.tilt.up)
		input.turn[0] = input.turn[1] = 0
		if (dt > 0) stepWalk(walk, input.keys, dt, PILOT.walk)
		// the shader corridor's x runs the other way: its right is three's left
		stride += (walk.pace * dt) / PILOT.bob.strideS
		const bob = PILOT.bob.height * walk.pace * Math.abs(Math.sin(Math.PI * stride))
		// looking down, the head tips about the neck: the eye swings out ahead of the chest and drops
		const down = Math.max(0, -walk.pitch)
		const [ahead, up] = PILOT.neck
		const out = ahead * Math.cos(down) + up * Math.sin(down) - ahead
		const drop = up - (up * Math.cos(down) - ahead * Math.sin(down))
		camera.position.set(
			-walk.x - Math.sin(walk.heading) * out,
			PILOT.eye + bob + breathe(time) - drop,
			walk.z + Math.cos(walk.heading) * out
		)
		camera.rotation.set(walk.pitch, Math.PI - walk.heading, 0)
		crew(dt, { x: -walk.x, z: walk.z })
		body(dt, walk)
		post.render(scene)
		return true
	}

	function release() {
		post?.dispose()
		renderer?.dispose()
	}

	return { build, resize, frame, release, walk }
}
