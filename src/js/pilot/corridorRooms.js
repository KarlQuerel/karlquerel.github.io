// The rooms' own pieces beyond plain parts: the medical cradle's glass canopy, the arch of light stepping
// along it and the sleeper's scan lying in light over it; the seed vault's drawer pulled out with its vials.

import { AnimationMixer, CylinderGeometry, DoubleSide, Mesh, TorusGeometry } from 'three'
import { BAYS, bayPoint } from './corridorShell.js'
import { surfaceMaterial, thingMaterial } from './corridorMaterial.js'
import { loadRigged, wearHelmet } from './models.js'
import { box } from './parts.js'
import { PILOT_PROP_MODELS, PILOT_VAULT } from '../../constants/game/pilot.js'

// a half ring standing over the bed, square to it, `r` round and `tube` thick
function arc(at, r, tube, material) {
	const mesh = new Mesh(new TorusGeometry(r, tube, 6, 20, Math.PI), material)
	mesh.position.copy(at)
	return mesh
}

// the cradle's canopy, arch and scan; the tick steps the arch to and fro
export async function cradle(k, { canopy, arch, scan }) {
	const [rx, y] = canopy.at
	const [z0, z1] = canopy.z
	const glass = surfaceMaterial('shell')
	glass.side = DoubleSide
	const shell = new Mesh(
		new CylinderGeometry(canopy.r, canopy.r, z1 - z0, 20, 1, true, -Math.PI / 2, Math.PI),
		glass
	)
	shell.rotation.x = -Math.PI / 2
	shell.position.copy(bayPoint(k, [rx, y, (z0 + z1) / 2]))
	const frames = [z0, z1].map(z =>
		arc(bayPoint(k, [rx, y, z]), canopy.r, canopy.frame, thingMaterial('fitting'))
	)
	const ring = arc(bayPoint(k, [rx, y, arch.z[0]]), arch.r, arch.tube, thingMaterial('light'))
	// the sleeper's scan: the recording's model, helmeted, in its light, posed by its idle's first frame,
	// laid on its back with its head toward -z
	const spec = PILOT_PROP_MODELS.recording
	const { body, clips } = await loadRigged({ ...spec, scale: scan.scale })
	await wearHelmet(body, spec.helmet)
	const light = surfaceMaterial('recording')
	body.traverse(o => {
		if (o.isMesh) o.material = light
	})
	const mixer = new AnimationMixer(body)
	mixer.clipAction(clips.Idle).play()
	mixer.update(0)
	body.rotation.x = -Math.PI / 2
	body.position.copy(bayPoint(k, scan.at))
	const [a0, a1] = arch.z
	const tick = (dt, clock) => {
		const step = Math.floor(clock * arch.stepsPerS) % (2 * arch.steps)
		const t = (step < arch.steps ? step : 2 * arch.steps - step) / arch.steps
		ring.position.z = BAYS[k].z + a0 + (a1 - a0) * t
	}
	return { things: [shell, ...frames, body], ring, tick }
}

// the vault's drawer pulled out of its wall, open, its vials standing in it glowing
export function vaultDrawer(k) {
	const { cell, seam, rows, along, pulled } = PILOT_VAULT
	const z = -along + (pulled.col + 0.5) * cell[0]
	const y = rows[0] + (pulled.row + 0.5) * cell[1]
	const { depth } = BAYS[k]
	const half = [pulled.out / 2, cell[1] / 2 - seam, cell[0] / 2 - seam]
	const drawer = box(bayPoint(k, [depth - half[0], y, z]), half, thingMaterial('fitting'))
	const [nAlong, nAcross] = pulled.vials
	const [r, h] = pulled.vial
	// evenly over the drawer, each sunk half its height into it
	const vials = []
	for (let i = 1; i <= nAcross; i++)
		for (let j = 1; j <= nAlong; j++) {
			const vial = new Mesh(new CylinderGeometry(r, r, h, 6), thingMaterial('vial'))
			vial.position.copy(
				bayPoint(k, [
					depth - (pulled.out * i) / (nAcross + 1),
					y + half[1],
					z - half[2] + (2 * half[2] * j) / (nAlong + 1),
				])
			)
			vials.push(vial)
		}
	return [drawer, ...vials]
}
