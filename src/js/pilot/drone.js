// A station drone in its own frame (PILOT_DRONE: its eye along +z, up +y): a white body under an orange
// livery cap, split at the waist by a dark band, a glowing halo ring orbiting it; a lens eye on its nose, a
// glowing vent at its tail, two thruster pods with glowing nozzles, antenna fins and a beacon. `paint(key)`
// gives each part's material (a PILOT_MATS key), so the corridor and the space outside each light it their
// own way. Its tick precesses the halo, pulses the pupil and blinks the beacon, each on a stepped clock.

import {
	CapsuleGeometry,
	CylinderGeometry,
	Group,
	Mesh,
	SphereGeometry,
	TorusGeometry,
	Vector3,
} from 'three'
import { box } from './parts.js'
import { PILOT_DRONE } from '../../constants/game/pilot.js'

const D = PILOT_DRONE
const [BX, BY, BZ] = D.body
// the livery cap sits a hair proud of the body, so the two never fight over a cell
const PROUD = 1.015

// three's cylinders, capsules and tori: a cylinder or capsule stood along z, a torus laid flat round y
function turned(mesh, x, y, z) {
	mesh.rotation.x = Math.PI / 2
	mesh.position.set(x, y, z)
	return mesh
}

function body(paint) {
	const shell = new Mesh(new SphereGeometry(1, 24, 16), paint('white'))
	shell.scale.set(BX, BY, BZ)
	const cap = new Mesh(
		new SphereGeometry(PROUD, 24, 8, 0, 2 * Math.PI, 0, D.cap),
		paint('livery')
	)
	cap.scale.set(BX, BY, BZ)
	// the waist band, stretched to the body's ellipse
	const band = turned(new Mesh(new TorusGeometry(BX, D.band.tube, 6, 32), paint('seam')), 0, 0, 0)
	band.scale.y = BZ / BX
	return [shell, cap, band]
}

export function buildDrone(paint) {
	const { halo: h, eye, collar, vent, pods, fins, beacon: b } = D
	const drone = new Group()
	const orbit = new Group()
	orbit.rotation.order = 'YXZ'
	orbit.rotation.x = h.tilt
	orbit.add(turned(new Mesh(new TorusGeometry(h.r, h.tube, 4, 40), paint('halo')), 0, 0, 0))
	const lens = turned(
		new Mesh(new CylinderGeometry(eye.r, eye.r, eye.depth, 20), paint('eye')),
		0,
		0,
		BZ - eye.depth / 2
	)
	const ring = new Mesh(new TorusGeometry(eye.r, collar.tube, 6, 20), paint('seam'))
	ring.position.z = BZ - eye.depth / 2
	const iris = new Mesh(new TorusGeometry(eye.iris, eye.depth / 2, 4, 20), paint('iris'))
	iris.position.z = BZ
	const pupil = turned(
		new Mesh(new CylinderGeometry(eye.pupil, eye.pupil, eye.depth, 12), paint('pupil')),
		0,
		0,
		BZ + eye.depth / 4
	)
	const exhaust = turned(
		new Mesh(new CylinderGeometry(vent.r, vent.r, vent.depth, 16), paint('light')),
		0,
		0,
		-BZ
	)
	drone.add(...body(paint), orbit, lens, ring, iris, pupil, exhaust)
	for (const side of [-1, 1]) {
		const x = side * pods.x
		drone.add(
			turned(
				new Mesh(new CapsuleGeometry(pods.r, pods.length, 4, 10), paint('white')),
				x,
				pods.y,
				0
			),
			turned(
				new Mesh(new TorusGeometry(pods.nozzle, pods.r / 4, 4, 12), paint('light')),
				x,
				pods.y,
				-(pods.length / 2 + pods.r)
			),
			box(new Vector3(x / 2, pods.y, 0), [Math.abs(x) / 2, pods.r / 3, pods.r], paint('seam'))
		)
		const fin = box(
			new Vector3(side * fins.at[0], fins.at[1], fins.at[2]),
			fins.half,
			paint('white')
		)
		fin.rotation.z = -side * fins.splay
		drone.add(fin)
	}
	const beacon = new Mesh(new SphereGeometry(b.r, 8, 6), paint('beacon'))
	beacon.position.set(
		-fins.at[0] - Math.sin(fins.splay) * fins.half[1],
		fins.at[1] + Math.cos(fins.splay) * fins.half[1],
		fins.at[2]
	)
	drone.add(beacon)
	return {
		drone,
		// where its eye looks out from, in its own frame
		eye: new Vector3(0, 0, BZ),
		tick(clock) {
			orbit.rotation.y = Math.floor(clock * h.stepsPerS) * h.step
			pupil.scale.setScalar(eye.pulse[Math.floor(clock * eye.pulsePerS) % 2])
			beacon.visible = Math.floor(clock * b.blinkPerS) % 2 === 0
		},
	}
}
