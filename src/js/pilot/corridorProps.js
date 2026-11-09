// What stands in the corridor's bays and at its repair panel: the intro shader's furniture in meshes, the
// spare suits (the crew's own models, headless, hung by the neck) in the suit-up bay and the lockers, a
// helmet set down on the bed, the comms room's holograms, and the drone at work on the open panel.
// Returns the tick for what moves (the drone's bob, the recording's clip and its turn) and the footprints
// on the deck of what stands in the bays below head height, for the player to walk round.

import {
	AnimationMixer,
	Box3,
	BoxGeometry,
	CylinderGeometry,
	Group,
	Mesh,
	PlaneGeometry,
	RingGeometry,
	SphereGeometry,
	Vector3,
} from 'three'
import { BAYS, lockerSpans } from './corridorShell.js'
import { panelPoint, surfaceMaterial, thingMaterial } from './corridorMaterial.js'
import { dropSkin, loadProp, loadRigged, wearHelmet } from './models.js'
import {
	PILOT_BAYS,
	PILOT_LOCKER_SUITS,
	PILOT_PROP_MODELS,
	PILOT_REPAIR,
	PILOT_ROOM,
	PILOT_SET,
} from '../../constants/game/pilot.js'

const { halfWidth: W, door, panel } = PILOT_SET
const UP = new Vector3(0, 1, 0)

// bay k's frame (rx out from the opening, y up, z along from its middle) to three's
const bayPoint = (k, [rx, y, z]) => new Vector3(BAYS[k].side * (W + rx), y, BAYS[k].z + z)
// facing the corridor from a bay on this side
const facingIn = side => (-side * Math.PI) / 2
const plus = (a, b) => a.map((v, i) => v + b[i])
const repairPoint = q => new Vector3(...panelPoint(q))

function box(at, half, material) {
	const mesh = new Mesh(new BoxGeometry(...half.map(h => 2 * h)), material)
	mesh.position.copy(at)
	return mesh
}
function rod(from, to, r, material) {
	const d = to.clone().sub(from)
	const mesh = new Mesh(new CylinderGeometry(r, r, d.length(), 10), material)
	mesh.position.copy(from).addScaledVector(d, 0.5)
	mesh.quaternion.setFromUnitVectors(UP, d.normalize())
	return mesh
}

// a screen on a box's corridor side, drawn by its own shader about its middle
function screenFace(k, { at, half }, kind) {
	const centre = bayPoint(k, [at[0] - half[0] - 0.002, at[1], at[2]])
	const own = { uCenter: { value: centre }, uHalf: { value: [half[2], half[1]] } }
	const mesh = new Mesh(new PlaneGeometry(2 * half[2], 2 * half[1]), surfaceMaterial(kind, own))
	mesh.position.copy(centre)
	mesh.rotation.y = facingIn(BAYS[k].side)
	return mesh
}

function part(k, spec) {
	const { mat, face } = spec
	if (spec.box) {
		const mesh = box(bayPoint(k, spec.box.at), spec.box.half, thingMaterial(mat))
		return face ? [mesh, screenFace(k, spec.box, face)] : [mesh]
	}
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

async function suitUp(k, { at, neck, rail }) {
	const { suits } = PILOT_PROP_MODELS
	const out = []
	for (const [i, [rx, z]] of at.entries()) {
		out.push(
			await hungSuit(
				suits[i % suits.length],
				bayPoint(k, [rx, neck, z]),
				facingIn(BAYS[k].side)
			)
		)
		out.push(
			rod(
				bayPoint(k, [rx, neck, z]),
				bayPoint(k, [rx, rail, z]),
				0.012,
				thingMaterial('fitting')
			)
		)
	}
	return out
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

// a crew member's recording over the comms plate: their model in the hologram's light, turning in steps
async function recording(k, { at, scale }) {
	const spec = PILOT_PROP_MODELS.recording
	const { body, clips } = await loadRigged({ ...spec, scale })
	await wearHelmet(body, spec.helmet)
	const light = surfaceMaterial('recording')
	body.traverse(o => {
		if (o.isMesh) o.material = light
	})
	body.position.copy(bayPoint(k, at))
	const mixer = new AnimationMixer(body)
	mixer.clipAction(clips[spec.clip]).play()
	return { body, mixer }
}

// the repair job, in the panel's frame
function repair() {
	const { cavity, cables, relay, relayLight, drone, band, status, arm } = PILOT_REPAIR
	const lean = PILOT_REPAIR.panel
	const parts = [
		box(repairPoint(cavity.at), cavity.half, thingMaterial('cavity')),
		box(repairPoint(relay.at), relay.half, thingMaterial('fitting')),
		box(repairPoint(relayLight.at), relayLight.half, thingMaterial('lamp')),
	]
	for (let i = 0; i < cables.count; i++) {
		const y = cables.from + i * cables.every
		const from = repairPoint([cables.x, y, -cables.half])
		const to = repairPoint([cables.x, y + cables.sag * Math.sin(i * 1.7), cables.half])
		parts.push(rod(from, to, cables.r, thingMaterial(i === 1 ? 'brushed' : 'seam')))
	}
	// the panel off the wall, its top leaning back on it
	const off = box(repairPoint(lean.at), lean.half, thingMaterial('furniture'))
	off.rotation.z = -Math.sign(panel.at[0]) * lean.lean
	parts.push(off)
	const tip = new Mesh(new SphereGeometry(0.02, 10, 8), surfaceMaterial('spark'))
	tip.position.copy(repairPoint(panel.weld))
	parts.push(tip)
	const bot = new Group()
	bot.add(
		box(repairPoint(drone.at), drone.half, thingMaterial('white')),
		box(repairPoint(plus(drone.at, band.at)), band.half, thingMaterial('seam')),
		box(repairPoint(plus(drone.at, status.at)), status.half, thingMaterial('light')),
		rod(
			repairPoint(plus(drone.at, arm.from)),
			repairPoint(panel.weld),
			arm.r,
			thingMaterial('seam')
		)
	)
	return { parts: [...parts, bot], bot }
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
	for (const [k, bay] of PILOT_BAYS.entries()) {
		for (const spec of bay.parts) stand(part(k, spec))
		if (bay.suits) stand(await suitUp(k, bay.suits))
		for (const at of bay.helmets ?? [])
			stand([await helmet(bayPoint(k, at), facingIn(BAYS[k].side))])
	}
	scene.add(...(await lockerSuits()))
	const k = PILOT_BAYS.findIndex(bay => bay.holo)
	const { holo } = PILOT_BAYS[k]
	const recorded = await recording(k, holo)
	scene.add(recorded.body)
	const job = repair()
	scene.add(...job.parts)
	const { drone } = PILOT_REPAIR
	const tick = (dt, clock) => {
		job.bot.position.y = drone.bob * Math.sin(Math.floor(clock * drone.stepsPerS) * drone.phase)
		recorded.body.rotation.y =
			facingIn(BAYS[k].side) + Math.floor(clock * holo.stepsPerS) * holo.turn
		recorded.mixer.update(dt)
	}
	return { tick, blocks }
}
