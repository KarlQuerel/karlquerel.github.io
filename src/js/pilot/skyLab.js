// The skybox lab (dev only): the pilot's walk on a plain of rocks under the open world's sky. The sky is a
// panorama already on the palette, so the pixel pass draws it per cell where nothing else was, at infinity:
// it turns with the head and never comes nearer however far you walk. It is also the scene's background,
// so the far mean blends distant rock into it, and its light, through scene.environment.

import {
	CircleGeometry,
	ConeGeometry,
	DirectionalLight,
	DodecahedronGeometry,
	EquirectangularReflectionMapping,
	Mesh,
	MeshStandardMaterial,
	NearestFilter,
	PerspectiveCamera,
	PMREMGenerator,
	Scene,
	SRGBColorSpace,
	TextureLoader,
	WebGLRenderer,
} from 'three'
import { SKY_LAB } from '../../constants/game/skyLab.js'
import { PALETTE, paletteHex } from '../../constants/palette.js'
import { breathe, createWalk, lookWalk, stepWalk } from '../intro/walk.js'
import { randIn } from '../math.js'
import { createPixelPost } from './pixelPost.js'

const { light, ground, rocks } = SKY_LAB

const rough = color =>
	new MeshStandardMaterial({ color: paletteHex(color), roughness: 1, flatShading: true })

// a spot on the plain, spread evenly over the ring from `clear` to `reach`
function scatter(mesh) {
	const r = rocks.reach * Math.sqrt(randIn([(rocks.clear / rocks.reach) ** 2, 1]))
	const a = randIn([0, 2 * Math.PI])
	mesh.position.set(r * Math.cos(a), 0, r * Math.sin(a))
	return mesh
}

function addPlain(scene) {
	const floor = new Mesh(new CircleGeometry(ground.radius, 64), rough(ground.color))
	floor.rotation.x = -Math.PI / 2
	scene.add(floor)
	const stone = rough(rocks.color)
	const boulder = new DodecahedronGeometry(1)
	for (let i = 0; i < rocks.count; i++) {
		const rock = scatter(new Mesh(boulder, stone))
		const size = randIn(rocks.size)
		rock.scale.set(size, size * rocks.squat, size * randIn([rocks.squat, 1]))
		rock.rotation.y = randIn([0, Math.PI])
		scene.add(rock)
	}
	const { radius, height, sides } = rocks.spire
	const cone = new ConeGeometry(1, 1, sides)
	cone.translate(0, 0.5, 0)
	for (let i = 0; i < rocks.spires; i++) {
		const spire = scatter(new Mesh(cone, stone))
		const r = randIn(radius)
		spire.scale.set(r, randIn(height), r)
		scene.add(spire)
	}
	const key = new DirectionalLight(paletteHex(light.color), light.key)
	key.position.set(...light.from)
	scene.add(key)
}

export function createSkyLab() {
	let renderer = null
	let post = null
	let sky = null
	let time = 0
	const scene = new Scene()
	const camera = new PerspectiveCamera(SKY_LAB.fovDeg, 1, SKY_LAB.near, SKY_LAB.far)
	camera.rotation.order = 'YXZ'
	const walk = createWalk(SKY_LAB.walk)

	async function build(gl, step) {
		renderer = new WebGLRenderer({ canvas: gl.canvas, context: gl, antialias: false })
		renderer.setPixelRatio(1)
		await step('context')
		sky = await new TextureLoader().loadAsync(SKY_LAB.sky)
		sky.mapping = EquirectangularReflectionMapping
		sky.colorSpace = SRGBColorSpace
		// already on the palette: a texel to a cell, read as it is
		sky.magFilter = sky.minFilter = NearestFilter
		sky.generateMipmaps = false
		post = createPixelPost(renderer, camera, { palette: Object.keys(PALETTE), sky })
		const pmrem = new PMREMGenerator(renderer)
		scene.clear()
		scene.background = sky
		scene.environment = pmrem.fromEquirectangular(sky).texture
		scene.environmentIntensity = light.sky
		pmrem.dispose()
		addPlain(scene)
		await step('sky')
		renderer.compile(scene, camera)
	}

	function resize({ width, height }) {
		renderer.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		post.resize(width, height)
	}

	function frame(dt, input) {
		time += dt
		lookWalk(walk, input.turn, SKY_LAB.tilt)
		input.turn[0] = input.turn[1] = 0
		if (dt > 0) stepWalk(walk, input.keys, dt, SKY_LAB.box)
		// the walk's x runs the other way, as in the corridor pilot
		camera.position.set(-walk.x, SKY_LAB.eye + breathe(time), walk.z)
		camera.rotation.set(walk.pitch, Math.PI - walk.heading, 0)
		post.render(scene)
		return true
	}

	function release() {
		scene.environment?.dispose()
		sky?.dispose()
		post?.dispose()
		renderer?.dispose()
	}

	return { boot: SKY_LAB.boot, build, resize, frame, release, walk }
}
