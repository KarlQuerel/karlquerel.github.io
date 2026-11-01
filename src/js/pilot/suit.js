// The astronaut: the Vanguard rig repainted as a white EVA suit (its tan plates white, its green
// cloth grey, its red stripes the accent), a gold visor, and a life-support pack on its back.

import { BoxGeometry, Color, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { PALETTE, paletteHex } from '../../constants/palette.js'
import { PILOT_SUIT } from '../../constants/game/pilot.js'

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)

// hue in degrees, saturation and value 0..1
function hsv(r, g, b) {
	const max = Math.max(r, g, b)
	const d = max - Math.min(r, g, b)
	if (!d) return [0, 0, max / 255]
	const h = max === r ? ((g - b) / d + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
	return [h * 60, d / max, max / 255]
}

// each texel by what it was: a plate, cloth, a stripe; the dark straps and metal kept
function repaint(image) {
	const { plate, cloth, stripe } = PILOT_SUIT
	const { red, tan, green } = PILOT_SUIT.bands
	const canvas = document.createElement('canvas')
	canvas.width = image.width
	canvas.height = image.height
	const ctx = canvas.getContext('2d')
	ctx.drawImage(image, 0, 0)
	const px = ctx.getImageData(0, 0, canvas.width, canvas.height)
	const d = px.data
	for (let i = 0; i < d.length; i += 4) {
		const [h, s, v] = hsv(d[i], d[i + 1], d[i + 2])
		let out = null
		if (s > red.s && (h < red.below || h > red.above)) out = PALETTE[stripe]
		else if (h >= tan.from && h < tan.to && s > tan.s && v > tan.v)
			out = mix(PALETTE[plate[0]], PALETTE[plate[1]], (v - tan.v) / (1 - tan.v))
		else if (h >= green.from && h < green.to && s > green.s)
			out = mix(PALETTE[cloth[0]], PALETTE[cloth[1]], Math.min(1, v * green.gain))
		if (out) [d[i], d[i + 1], d[i + 2]] = out
	}
	ctx.putImageData(px, 0, 0)
	return canvas
}

// a box of `size` metres hung on a bone `offset` metres from it, whatever the rig's own scale
function hang(bone, size, offset, material) {
	bone.updateWorldMatrix(true, false)
	const s = bone.getWorldScale(new Vector3())
	const mesh = new Mesh(new BoxGeometry(...size), material)
	mesh.scale.set(1 / s.x, 1 / s.y, 1 / s.z)
	mesh.position.set(offset[0] / s.x, offset[1] / s.y, offset[2] / s.z)
	bone.add(mesh)
}

export function dressSuit(body) {
	const { visor, pack } = PILOT_SUIT
	body.traverse(node => {
		if (!node.isMesh) return
		if (node.name.includes('visor')) {
			node.material = new MeshStandardMaterial({
				color: new Color(paletteHex(visor.color)),
				emissive: new Color(paletteHex(visor.glow)),
				emissiveIntensity: visor.intensity,
				roughness: 0.3,
			})
			return
		}
		const map = node.material.map.clone()
		map.image = repaint(node.material.map.image)
		map.needsUpdate = true
		node.material = node.material.clone()
		node.material.map = map
		node.material.color.setScalar(PILOT_SUIT.gain)
	})
	const spine = body.getObjectByName(pack.bone)
	hang(
		spine,
		pack.size,
		pack.offset,
		new MeshStandardMaterial({ color: new Color(paletteHex(pack.color)), flatShading: true })
	)
	hang(
		spine,
		pack.light.size,
		pack.light.offset,
		new MeshStandardMaterial({
			color: new Color(paletteHex(pack.light.color)),
			emissive: new Color(paletteHex(pack.light.color)),
		})
	)
}
