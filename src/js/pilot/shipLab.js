// The ship lab (dev only): HERMES-8 and its drive ring alone under the game's sky, lit by a sun. Outside, the
// mouse swings the camera round them, W/S move it in and out, A/D and the side arrows swing it round. E steps
// aboard at the stern, to walk a greybox of the inside to the cockpit in first person, the suit's gauge on the
// helmet's glass (visor.js); E again steps back out.

import {
	Box3,
	BufferGeometry,
	DirectionalLight,
	EquirectangularReflectionMapping,
	FrontSide,
	Group,
	HemisphereLight,
	Mesh,
	NearestFilter,
	PerspectiveCamera,
	PMREMGenerator,
	Scene,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
	WebGLRenderer,
} from 'three'
import { SHIP_HERMES } from '../../constants/game/shipCrew.js'
import { SHIP_LAB } from '../../constants/game/shipLab.js'
import { SKY_LAB } from '../../constants/game/skyLab.js'
import { WALK, WALK_KEYS } from '../../constants/intro/walk.js'
import { PALETTE, paletteHex } from '../../constants/palette.js'
import { breathe, createWalk, lookWalk, stepWalk } from '../intro/walk.js'
import { clamp } from '../math.js'
import { loadProp } from './models.js'
import { createPixelPost } from './pixelPost.js'
import { addPlayerBody } from './playerBody.js'
import { addShipCrew } from './shipCrew.js'
import { DRESSED, dressShip } from './shipHallway.js'
import { onProp, placeProps } from './shipProps.js'
import { BOUNDS, buildInterior, floorAt, standable } from './shipInterior.js'
import { createVisor, drainedMeters } from './visor.js'

const { orbit, light, aboard } = SHIP_LAB
const RIGHT = [...WALK_KEYS.strafeRight, ...WALK_KEYS.turnRight]
const LEFT = [...WALK_KEYS.strafeLeft, ...WALK_KEYS.turnLeft]

const pressed = (keys, codes) => codes.some(k => keys.has(k))
// 1 while a `plus` key is held, -1 a `minus` one, 0 for both or neither
const held = (keys, plus, minus) => Number(pressed(keys, plus)) - Number(pressed(keys, minus))

// the model's triangles whose middle lies in the box `{ x, y, z }` (ranges), the glass apart, moved to meshes
// of their own with their own materials, marked `inside`
function keepInside(model, { x, y, z }) {
	const within = (v, [lo, hi]) => v >= lo && v <= hi
	const corner = new Vector3()
	const middle = new Vector3()
	model.updateMatrixWorld(true)
	const meshes = []
	model.traverse(o => {
		if (o.isMesh && !SHIP_LAB.aboard.glass.names.includes(o.material.name)) meshes.push(o)
	})
	for (const mesh of meshes) {
		const { attributes, index } = mesh.geometry
		const ids = index?.array ?? Array.from({ length: attributes.position.count }, (_, i) => i)
		const parts = [[], []]
		for (let t = 0; t < ids.length; t += 3) {
			middle.set(0, 0, 0)
			for (let k = 0; k < 3; k++)
				middle.add(corner.fromBufferAttribute(attributes.position, ids[t + k]))
			middle.divideScalar(3).applyMatrix4(mesh.matrixWorld)
			const kept = within(middle.x, x) && within(middle.y, y) && within(middle.z, z)
			parts[Number(kept)].push(ids[t], ids[t + 1], ids[t + 2])
		}
		if (!parts[1].length) continue
		const [outer, inner] = parts.map(part => {
			const geometry = new BufferGeometry()
			for (const [name, attribute] of Object.entries(attributes))
				geometry.setAttribute(name, attribute)
			geometry.setIndex(part)
			return geometry
		})
		mesh.geometry = outer
		const own = new Mesh(inner, mesh.material.clone())
		own.userData.inside = true
		mesh.add(own)
	}
}

export function createShipLab() {
	// where the walk may stand (its x mirrored, as in the corridor pilot): in a room or a doorway, `body` m clear
	// of the walls and of every prop's footprint
	let footprints = []
	const deck = {
		halfWidth: Math.max(...BOUNDS.x.map(Math.abs)),
		back: BOUNDS.z[0],
		front: BOUNDS.z[1],
		open: (x, z) => standable(-x, z, aboard.body) && !onProp(footprints, -x, z, aboard.body),
	}
	let renderer = null
	// the pixel pass outside, and aboard with softer glints
	let posts = null
	let sky = null
	let body = null
	// the crew at their posts, speaking when the player comes near
	let crew = null
	let inside = false
	let using = false
	let calling = false
	let time = 0
	// the orbit's centre, the ship's middle, and its scale, the diagonal of the box both models fill
	const middle = new Vector3()
	let size = 1
	const scene = new Scene()
	const camera = new PerspectiveCamera(SHIP_LAB.fovDeg, 1, SHIP_LAB.near, SHIP_LAB.far)
	camera.rotation.order = 'YXZ'
	// the camera on its orbit, its distance in sizes
	const view = { yaw: orbit.yaw, pitch: orbit.pitch, distance: orbit.frame }
	// aboard: the walk in the ship's own frame (its x mirrored, as in the corridor pilot), the player's body on
	// a stand that rides the floor under it
	const walk = createWalk({ x: -aboard.start[0], z: aboard.start[1] })
	const stand = new Group()
	// the suit's gauge, aboard only
	const visor = createVisor()
	// the glass's materials, each with how it looks from outside
	const glass = new Map()
	// aboard the hull draws only its outer faces, so no window shows the inside of a wing or an engine
	const hull = new Map()

	async function build(gl, step) {
		renderer = new WebGLRenderer({ canvas: gl.canvas, context: gl, antialias: false })
		renderer.setPixelRatio(1)
		// already on the palette: one texel to a cell, read as it is
		sky = await new TextureLoader().loadAsync(SKY_LAB.sky)
		sky.mapping = EquirectangularReflectionMapping
		sky.colorSpace = SRGBColorSpace
		sky.magFilter = sky.minFilter = NearestFilter
		sky.generateMipmaps = false
		const pass = (edges, overlay) =>
			createPixelPost(renderer, camera, {
				palette: Object.keys(PALETTE),
				sky,
				edges,
				distant: SHIP_LAB.distant,
				overlay,
			})
		posts = { outside: pass(SHIP_LAB.edges), aboard: pass(aboard.edges, visor.overlay) }
		await step('context')
		const [hall, dressing, cast, ship, ...rest] = await Promise.all([
			dressShip(),
			placeProps(),
			addShipCrew(),
			...SHIP_LAB.models.map(url => loadProp({ url, paint: SHIP_LAB.paint })),
		])
		crew = cast
		scene.clear()
		scene.add(ship, ...rest)
		keepInside(ship, aboard.hullInside)
		new Box3().setFromObject(ship).getCenter(middle)
		size = new Box3().setFromObject(scene).getSize(new Vector3()).length()
		footprints = [...dressing.footprints, ...cast.footprints]
		scene.add(buildInterior({ dressed: DRESSED }), hall, dressing.props, cast.group, stand)
		glass.clear()
		scene.traverse(o => {
			for (const material of [o.material ?? []].flat())
				if (aboard.glass.names.includes(material.name))
					glass.set(material, {
						transparent: material.transparent,
						opacity: material.opacity,
					})
		})
		// the hull's materials, the glass and the cockpit's tub apart, each with the side it draws from outside
		hull.clear()
		for (const model of [ship, ...rest])
			model.traverse(o => {
				if (o.isMesh && !o.userData.inside && !aboard.glass.names.includes(o.material.name))
					hull.set(o.material, o.material.side)
			})
		const sun = new DirectionalLight(paletteHex(light.sun.color), light.sun.intensity)
		sun.position.set(...light.sun.from)
		const { sky: above, ground, intensity } = light.fill
		scene.add(sun, new HemisphereLight(paletteHex(above), paletteHex(ground), intensity))
		const pmrem = new PMREMGenerator(renderer)
		scene.environment = pmrem.fromEquirectangular(sky).texture
		scene.environmentIntensity = light.sky
		pmrem.dispose()
		// distant cells blend into the sky they stand on
		scene.background = sky
		await step('models')
		body ??= await addPlayerBody(stand)
		body.body.visible = inside
		await step('body')
		renderer.compile(scene, camera)
	}

	function board(on) {
		inside = on
		camera.fov = on ? aboard.fovDeg : SHIP_LAB.fovDeg
		camera.near = on ? aboard.near : SHIP_LAB.near
		camera.updateProjectionMatrix()
		body.body.visible = on
		for (const [material, outside] of glass) {
			material.transparent = on || outside.transparent
			material.opacity = on ? aboard.glass.opacity : outside.opacity
			material.needsUpdate = true
		}
		for (const [material, side] of hull) {
			material.side = on ? FrontSide : side
			material.needsUpdate = true
		}
	}

	function resize({ width, height }) {
		renderer.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		for (const post of Object.values(posts)) post.resize(width, height)
	}

	function swing(dt, [dx, dy], keys) {
		const round = held(keys, RIGHT, LEFT)
		const zoom = held(keys, WALK_KEYS.back, WALK_KEYS.forward)
		if (dx || dy || round || zoom) walk.moved = true
		view.yaw += dx * WALK.lookRad + round * orbit.swing * dt
		view.pitch = clamp(view.pitch + dy * WALK.lookRad, -orbit.tilt, orbit.tilt)
		view.distance = clamp(view.distance * Math.exp(zoom * orbit.zoom * dt), ...orbit.reach)
		camera.position
			.setFromSphericalCoords(view.distance * size, Math.PI / 2 - view.pitch, view.yaw)
			.add(middle)
		camera.lookAt(middle)
	}

	function stroll(dt, turn, keys) {
		lookWalk(walk, turn, aboard.tilt)
		if (dt > 0) stepWalk(walk, keys, dt, deck)
		stand.position.y = floorAt(-walk.x, walk.z)
		camera.position.set(-walk.x, stand.position.y + aboard.eye + breathe(time), walk.z)
		camera.rotation.set(walk.pitch, Math.PI - walk.heading, 0)
		body.update(dt, walk)
	}

	function frame(dt, input) {
		time += dt
		// E steps aboard or back out, once a press
		const use = pressed(input.keys, WALK_KEYS.use)
		if (use && !using) board(!inside)
		using = use
		// H has Hermes say its next line, once a press
		const call = pressed(input.keys, SHIP_HERMES.keys)
		if (call && !calling) crew.hermes()
		calling = call
		if (inside) {
			stroll(dt, input.turn, input.keys)
			visor.show(time, drainedMeters(time))
		} else swing(dt, input.turn, input.keys)
		// the crew hear the player aboard only, where they stand in the ship's own frame
		crew.update(dt, inside ? { x: -walk.x, z: walk.z } : null)
		input.turn[0] = input.turn[1] = 0
		const post = inside ? posts.aboard : posts.outside
		post.render(scene)
		return true
	}

	function release() {
		crew?.hush()
		scene.environment?.dispose()
		sky?.dispose()
		for (const post of Object.values(posts ?? {})) post.dispose()
		visor.dispose()
		renderer?.dispose()
	}

	// Hermes's key on top of the walk's, for the page to pass on
	return { boot: SHIP_LAB.boot, build, resize, frame, release, walk, keys: SHIP_HERMES.keys }
}
