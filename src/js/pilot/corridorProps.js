// What stands in the corridor's bays: furniture built from simple parts, the rooms' own pieces
// (corridorRooms.js) and what they project (corridorHolo.js), and the spare suits (the crew's own models,
// headless, hung by the neck) in the lockers with their helmets on the shelves. Returns the tick for what
// moves and the footprints on the deck of what stands in the bays below head height, for the player to
// walk round.

import {
	AnimationMixer,
	Box3,
	CylinderGeometry,
	DoubleSide,
	ExtrudeGeometry,
	Mesh,
	PlaneGeometry,
	RingGeometry,
	Shape,
	SphereGeometry,
	Vector2,
	Vector3,
} from 'three'
import { addHolo, addRoute, addSeedling } from './corridorHolo.js'
import { cradle, vaultDrawer } from './corridorRooms.js'
import { BAYS, bayPoint, facingIn, lockerSpans } from './corridorShell.js'
import { surfaceMaterial, thingMaterial } from './corridorMaterial.js'
import { dropSkin, loadProp, loadRigged } from './models.js'
import { box, rod } from './parts.js'
import {
	PILOT_BAYS,
	PILOT_LOCKER_SUITS,
	PILOT_PANE,
	PILOT_PROP_MODELS,
	PILOT_ROOM,
	PILOT_SET,
} from '../../constants/game/pilot.js'

const { halfWidth: W, door } = PILOT_SET

// a profile of [rx, y] corners run along the bay from z0 to z1, mirrored onto the bay's side
function prism(k, { profile, z: [z0, z1] }, material) {
	const shape = new Shape(profile.map(([x, y]) => new Vector2(x, y)))
	const mesh = new Mesh(
		new ExtrudeGeometry(shape, { depth: z1 - z0, bevelEnabled: false }),
		material
	)
	const { side, z } = BAYS[k]
	mesh.scale.x = side
	mesh.position.set(side * W, 0, z + z0)
	return mesh
}

// floating glass, its screen on every other row (or a `face` shader of its own about its middle), turned
// `yaw` toward +z over the light bar it rises from
let paneGlass = null
function pane(k, { at, half, yaw, face }) {
	if (!paneGlass) {
		paneGlass = surfaceMaterial('pane')
		paneGlass.side = DoubleSide
	}
	const { side } = BAYS[k]
	const centre = bayPoint(k, at)
	const shows = face
		? surfaceMaterial(face, {
				uCenter: { value: centre },
				uHalf: { value: new Vector2(...half) },
			})
		: paneGlass
	const glass = new Mesh(new PlaneGeometry(2 * half[0], 2 * half[1]), shows)
	glass.position.copy(centre)
	const { bar, gap } = PILOT_PANE
	const under = box(
		bayPoint(k, [at[0], at[1] - half[1] - gap, at[2]]),
		[half[0], bar / 2, bar / 2],
		thingMaterial('light')
	)
	glass.rotation.y = under.rotation.y = facingIn(side) + side * yaw
	return [glass, under]
}

function part(k, spec) {
	const { mat } = spec
	if (spec.octagon) {
		const { at, r, h } = spec.octagon
		const mesh = new Mesh(new CylinderGeometry(r[0], r[1], h, 8), thingMaterial(mat))
		mesh.position.copy(bayPoint(k, at))
		mesh.rotation.y = Math.PI / 8
		return [mesh]
	}
	if (spec.prism) return [prism(k, spec.prism, thingMaterial(mat))]
	if (spec.pane) return pane(k, spec.pane)
	if (spec.box) return [box(bayPoint(k, spec.box.at), spec.box.half, thingMaterial(mat))]
	if (spec.rod) {
		const { from, to, r } = spec.rod
		return [rod(bayPoint(k, from), bayPoint(k, to), r, thingMaterial(mat))]
	}
	if (spec.sphere) {
		const centre = bayPoint(k, spec.sphere.at)
		const mesh = new Mesh(
			new SphereGeometry(spec.sphere.r, 16, 12),
			surfaceMaterial(mat, { uCenter: { value: centre } })
		)
		mesh.position.copy(centre)
		return [mesh]
	}
	const { at, r } = spec.disc ?? spec.ring
	const mesh = spec.disc
		? new Mesh(new CylinderGeometry(r, r, spec.disc.h, 24), thingMaterial(mat))
		: new Mesh(new RingGeometry(r - spec.ring.w, r + spec.ring.w, 32), thingMaterial(mat))
	if (spec.ring) mesh.rotation.x = -Math.PI / 2
	mesh.position.copy(bayPoint(k, at))
	return [mesh]
}

// an empty suit: the crew model without its head, posed by its clip, hung so its neck is at `neck`
async function hungSuit(model, neck, facing, scale = 1) {
	const { body, clips } = await loadRigged({ ...model, scale })
	dropSkin(body, /Head|Eye/)
	const mixer = new AnimationMixer(body)
	mixer.clipAction(clips[model.pose]).play()
	mixer.update(0)
	body.rotation.y = facing
	body.updateMatrixWorld(true)
	let bone
	body.traverse(o => {
		if (o.isBone && /Neck$/.test(o.name)) bone ??= o
	})
	body.position.add(neck.clone().sub(bone.getWorldPosition(new Vector3())))
	return body
}

// a helmet set down, its rim's middle at `at`, facing as given
async function helmet(at, facing) {
	const { width } = PILOT_PROP_MODELS.helmet
	const prop = await loadProp(PILOT_PROP_MODELS.helmet)
	prop.scale.setScalar(width / new Box3().setFromObject(prop).getSize(new Vector3()).x)
	prop.position.copy(at)
	prop.rotation.y = facing
	return prop
}

async function lockerSuits() {
	const { scale, neck, back, shelf } = PILOT_LOCKER_SUITS
	const { suits } = PILOT_PROP_MODELS
	const out = []
	for (const [i, [x0, x1]] of lockerSpans().entries()) {
		const x = (x0 + x1) / 2
		const z = door + back
		out.push(await hungSuit(suits[i % suits.length], new Vector3(x, neck, z), Math.PI, scale))
		out.push(box(new Vector3(x, shelf.y, z), shelf.half, thingMaterial('fitting')))
		out.push(
			rod(
				new Vector3(x, neck, z),
				new Vector3(x, shelf.y, z),
				0.012,
				thingMaterial('fitting')
			)
		)
		out.push(await helmet(new Vector3(x, shelf.y + shelf.half[1], z), Math.PI))
	}
	return out
}

export async function addProps(scene) {
	const blocks = []
	// into the scene, and its footprint on the deck unless it is all overhead
	const stand = things => {
		scene.add(...things)
		for (const thing of things) {
			thing.updateMatrixWorld(true)
			const box = new Box3().setFromObject(thing, true)
			if (box.min.y < PILOT_ROOM.overhead)
				blocks.push([box.min.x, box.max.x, box.min.z, box.max.z])
		}
	}
	const ticks = []
	for (const [k, bay] of PILOT_BAYS.entries()) {
		for (const spec of bay.parts) stand(part(k, spec))
		if (bay.vault) stand(vaultDrawer(k))
		if (bay.cradle) {
			const bed = await cradle(k, bay.cradle)
			stand(bed.things)
			scene.add(bed.ring)
			ticks.push(bed.tick)
		}
		if (bay.holo) ticks.push(await addHolo(scene, k, bay.holo))
		if (bay.route) ticks.push(addRoute(scene, k, bay.route))
		if (bay.seedling) ticks.push(addSeedling(scene, k, bay.seedling))
	}
	scene.add(...(await lockerSuits()))
	const tick = (dt, clock) => ticks.forEach(t => t(dt, clock))
	return { tick, blocks }
}
