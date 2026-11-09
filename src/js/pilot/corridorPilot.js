// The corridor pilot in three.js: the walk the shader corridor uses, a first-person camera on it and
// the player's body under it, the corridor's meshes, the crew, their shadows, the spacewalker outside the
// glass on her own pass, and the pixel pass over it all.

import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { PILOT } from '../../constants/game/pilot.js'
import { breathe, createWalk, lookWalk, stepWalk } from '../intro/walk.js'
import { clamp } from '../math.js'
import { addCorridor, lightModels, sizeCorridor } from './corridorSet.js'
import { addCrew } from './crew.js'
import { createPixelPost } from './pixelPost.js'
import { addPlayerBody } from './playerBody.js'
import { createSpaceLayer } from './spaceLayer.js'
import { addSpacewalker } from './spacewalker.js'
import { createSunShadow } from './sunShadow.js'

export function createCorridorPilot() {
	let renderer = null
	let post = null
	let shadow = null
	let space = null
	let walker = null
	let set = null
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
		post = createPixelPost(renderer, camera)
		shadow = createSunShadow(renderer)
		space = createSpaceLayer(renderer, camera)
		await step('context')
		set = await addCorridor(scene)
		crew = await addCrew(scene, part => step('models', part))
		body = await addPlayerBody(scene)
		for (const caster of [...crew.bodies, body.body]) shadow.cast(caster)
		walker = await addSpacewalker(scene)
		lightModels(scene)
		// compile every program now, not on the first frame the player sees
		renderer.compile(scene, camera)
	}

	function resize({ width, height }) {
		renderer.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		post.resize(width, height)
		space.resize(width, height)
		sizeCorridor(width, height)
	}

	// input: { keys, turn }, the walk keys held and the mouse travel since the last frame
	function frame(dt, input) {
		time += dt
		lookWalk(walk, input.turn)
		walk.pitch = clamp(walk.pitch, -PILOT.tilt.down, PILOT.tilt.up)
		input.turn[0] = input.turn[1] = 0
		if (dt > 0) stepWalk(walk, input.keys, dt, set.box)
		// the shader corridor's x runs the other way: its right is three's left
		// one smooth rise per step, highest passing over the planted boot
		stride += (Math.hypot(walk.vx, walk.vz) * dt) / PILOT.bob.stepM
		const bob = PILOT.bob.height * walk.pace * Math.sin(Math.PI * stride) ** 2
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
		set.tick(dt, time, walk)
		crew.update(dt, { x: -walk.x, z: walk.z })
		body.update(dt, walk)
		walker(dt, time, { x: -walk.x, z: walk.z })
		shadow.render(scene)
		space.render(scene)
		post.render(scene)
		return true
	}

	function release() {
		shadow?.dispose()
		space?.dispose()
		post?.dispose()
		renderer?.dispose()
	}

	return { build, resize, frame, release, walk }
}
