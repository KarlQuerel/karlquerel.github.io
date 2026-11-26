// The pilot's models: each glTF fetched once and cloned for every use. A rigged body comes on its own
// skeleton scaled to its height; a helmet takes the place of a body's head.

import {
	Box3,
	BufferGeometry,
	DoubleSide,
	Float32BufferAttribute,
	Matrix4,
	MeshStandardMaterial,
	Quaternion,
	SkinnedMesh,
	TextureSource,
	Uint16BufferAttribute,
	Vector3,
} from 'three'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { PALETTE, paletteHex } from '../../constants/palette.js'
import { PILOT_GLOW, PILOT_PANELS } from '../../constants/game/pilot.js'

// every model is meshopt-compressed (scripts/models/shrink.mjs)
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
const loading = new Map()

function fetchOnce(url) {
	if (!loading.has(url)) loading.set(url, loader.loadAsync(url))
	return loading.get(url)
}

// a Mixamo bone's name without its export's numbered prefix (mixamorig1Hips → Hips)
const mixamoBone = name => name.replace(/^mixamorig\d*/, '')

// a rig's bones by Mixamo name; by name, not isBone, since a clips-only file has no skin to make them bones
export function mixamoBones(scene) {
	const bones = {}
	scene.traverse(o => {
		if (/^mixamorig/.test(o.name)) bones[mixamoBone(o.name)] ??= o
	})
	return bones
}

// each bone's rest turn in the world, and its parent's, as the file left them
function restTurns(scene, bones) {
	scene.updateMatrixWorld(true)
	const turns = {}
	for (const [name, bone] of Object.entries(bones))
		turns[name] = {
			own: bone.getWorldQuaternion(new Quaternion()),
			parent: bone.parent.getWorldQuaternion(new Quaternion()),
		}
	return turns
}

// another Mixamo rig's clips (those named in `only`, if given) retargeted onto this one: each bone turns
// in the world as the donor's does from its own rest, so rigs whose bones' axes differ still pose alike;
// the hips' travel scaled by how much longer this rig's legs are
function borrowClips(scene, donor, only) {
	const bones = mixamoBones(scene)
	const from = mixamoBones(donor.scene)
	const ours = restTurns(scene, bones)
	const theirs = restTurns(donor.scene, from)
	const legs = bones.Hips.position.y / from.Hips.position.y
	const q = new Quaternion()
	const wanted = donor.animations.filter(clip => !only || only.includes(clip.name))
	return wanted.map(source => {
		const clip = source.clone()
		clip.tracks = clip.tracks.filter(track => {
			const [bone, property] = track.name.split('.')
			const name = mixamoBone(bone)
			if (!(name in bones) || !(name in from)) return false
			track.name = `${bones[name].name}.${property}`
			if (property === 'position') track.values = track.values.map(v => v * legs)
			if (property !== 'quaternion') return true
			// ours⁻¹·theirs at the parent, the donor's turn, theirs⁻¹·ours at the bone
			const before = ours[name].parent.clone().invert().multiply(theirs[name].parent)
			const after = theirs[name].own.clone().invert().multiply(ours[name].own)
			// a copy: a cloned track can share the donor's arrays, and other rigs borrow them too
			const v = (track.values = track.values.slice())
			for (let i = 0; i < v.length; i += 4) {
				q.fromArray(v, i).premultiply(before).multiply(after).toArray(v, i)
			}
			return true
		})
		return clip
	})
}

// spec: { url, height, scale?, clipsFrom?, borrow?, glow?, panels? }: stood `scale` times its height, lit
// by `glow`, its oxblood in the `panels` colour; the clips by name: its own, and those borrowed from the
// `clipsFrom` rig or rigs (only the `borrow` names, if listed), a borrowed clip taking the place of its own of the
// same name
export async function loadRigged({ url, height, scale = 1, clipsFrom, borrow, glow, panels }) {
	const gltf = await fetchOnce(url)
	const body = clone(gltf.scene)
	// a skinned box is measured on its bones, which need their world matrices first
	body.updateMatrixWorld(true)
	const size = new Box3().setFromObject(body).getSize(new Vector3())
	body.scale.setScalar((height * scale) / size.y)
	if (glow) addGlow(body, glow)
	if (panels) paintPanels(body, panels)
	const donors = await Promise.all([clipsFrom ?? []].flat().map(fetchOnce))
	const borrowed = donors.flatMap(donor => borrowClips(gltf.scene, donor, borrow))
	const clips = Object.fromEntries(
		[...gltf.animations, ...borrowed].map(clip => [clip.name, clip])
	)
	return { body, clips }
}

// whether a vertex of the mesh rides mostly on a bone `drop` matches
function ridesOn(mesh, drop) {
	const dropped = mesh.skeleton.bones.map(bone => drop.test(bone.name))
	const { skinIndex, skinWeight } = mesh.geometry.attributes
	return v => {
		let best = 0
		for (let k = 1; k < 4; k++)
			if (skinWeight.getComponent(v, k) > skinWeight.getComponent(v, best)) best = k
		return dropped[skinIndex.getComponent(v, best)]
	}
}

// the box the skin riding the `drop` bones fills, as the body stands now
function skinBox(body, drop) {
	const box = new Box3()
	const v = new Vector3()
	body.updateMatrixWorld(true)
	body.traverse(mesh => {
		if (!mesh.isSkinnedMesh) return
		const rides = ridesOn(mesh, drop)
		const { position } = mesh.geometry.attributes
		for (let i = 0; i < position.count; i++) {
			if (!rides(i)) continue
			mesh.applyBoneTransform(i, v.fromBufferAttribute(position, i))
			box.expandByPoint(v.applyMatrix4(mesh.matrixWorld))
		}
	})
	return box
}

// the skin less every triangle with a corner riding mostly on a bone `drop` matches; those kept for showSkin
export function dropSkin(body, drop) {
	body.traverse(mesh => {
		if (!mesh.isSkinnedMesh) return
		const rides = ridesOn(mesh, drop)
		const index = mesh.geometry.index.array
		const parts = [[], []]
		for (let t = 0; t < index.length; t += 3) {
			const gone = rides(index[t]) || rides(index[t + 1]) || rides(index[t + 2])
			parts[Number(gone)].push(index[t], index[t + 1], index[t + 2])
		}
		mesh.userData.dropped = parts[1]
		mesh.geometry = mesh.geometry.clone()
		mesh.geometry.setIndex(parts[0])
	})
}

// the skin dropSkin cut away shown again (a head with its helmet off) or hidden: a mesh of its own on the same
// skeleton, made the first time, in the skin's own colours (the role's paint takes skin for a panel)
export function showSkin(body, shown) {
	const meshes = []
	body.traverse(mesh => {
		if (mesh.userData.dropped) meshes.push(mesh)
	})
	for (const mesh of meshes) {
		if (!mesh.userData.bare) {
			const geometry = mesh.geometry.clone()
			geometry.setIndex(mesh.userData.dropped)
			const bare = new SkinnedMesh(geometry, unpainted.get(mesh.material) ?? mesh.material)
			bare.bind(mesh.skeleton, mesh.bindMatrix)
			bare.frustumCulled = false
			mesh.parent.add(bare)
			mesh.userData.bare = bare
		}
		mesh.userData.bare.visible = shown
	}
}

// A fabric seal from the base of the neck up into the helmet, skinned neck to head so it bends with the
// head and no gap opens under the helmet's slanted back; sized from the head box like the helmet.
function addNeckSeal(body, head, spec) {
	const { from, color, reach, base, top, flare, rings, sides } = spec.seal
	let skin
	body.traverse(o => {
		if (o.isSkinnedMesh && !skin) skin = o
	})
	const { bones, boneInverses } = skin.skeleton
	const neck = bones.findIndex(b => b.name === from)
	const crown = bones.findIndex(b => b.name === spec.bone)
	// the body still stands as loaded, so one matrix takes any world point back to the skin's bind space
	const toBind = new Matrix4()
		.multiplyMatrices(bones[neck].matrixWorld, boneInverses[neck])
		.multiply(skin.bindMatrix)
		.invert()
	const size = head.getSize(new Vector3())
	const mid = head.getCenter(new Vector3())
	const low = bones[neck].getWorldPosition(new Vector3())
	const high = new Vector3(mid.x, head.min.y + reach * size.y, mid.z)
	const position = []
	const skinIndex = []
	const skinWeight = []
	const index = []
	const v = new Vector3()
	for (let r = 0; r <= rings; r++) {
		const t = r / rings
		const centre = new Vector3().lerpVectors(low, high, t)
		const wide = t ** flare
		const across = (base[0] + (top[0] - base[0]) * wide) * size.x
		const deep = (base[1] + (top[1] - base[1]) * wide) * size.z
		for (let s = 0; s < sides; s++) {
			const a = (s / sides) * Math.PI * 2
			v.set(Math.cos(a) * across, 0, Math.sin(a) * deep)
			v.add(centre).applyMatrix4(toBind)
			position.push(v.x, v.y, v.z)
			skinIndex.push(crown, neck, 0, 0)
			skinWeight.push(t, 1 - t, 0, 0)
			const next = (s + 1) % sides
			if (r < rings) index.push(r * sides + s, r * sides + next, (r + 1) * sides + s)
			if (r < rings) index.push(r * sides + next, (r + 1) * sides + next, (r + 1) * sides + s)
		}
	}
	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new Float32BufferAttribute(position, 3))
	geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndex, 4))
	geometry.setAttribute('skinWeight', new Float32BufferAttribute(skinWeight, 4))
	geometry.setIndex(index)
	geometry.computeVertexNormals()
	const material = new MeshStandardMaterial({ color: paletteHex(color), side: DoubleSide })
	const seal = new SkinnedMesh(geometry, material)
	seal.bind(skin.skeleton, skin.bindMatrix)
	// skinned past its rest bounds, and too small to be worth a culling test
	seal.frustumCulled = false
	body.add(seal)
	return seal
}

// one mip level down by vote: a texel stays lit, as bright as its brightest, only where at least `votes`
// of the four under it are lit; otherwise it goes dark. A light far off then shrinks and drops out, the
// way a lamp mesh does, and never dims to an orange or swells over the suit.
function halve({ width, height, data }, floor, votes) {
	const w = Math.max(1, width >> 1)
	const h = Math.max(1, height >> 1)
	const out = new ImageData(w, h)
	for (let y = 0; y < h; y++)
		for (let x = 0; x < w; x++) {
			let lit = 0
			let best = 0
			for (let k = 0; k < 4; k++) {
				const sx = Math.min(width - 1, 2 * x + (k & 1))
				const sy = Math.min(height - 1, 2 * y + (k >> 1))
				const i = (sy * width + sx) * 4
				const v = Math.max(data[i], data[i + 1], data[i + 2])
				if (v >= floor) lit++
				if (v > Math.max(data[best], data[best + 1], data[best + 2])) best = i
			}
			const o = (y * w + x) * 4
			for (let c = 0; c < 3; c++) out.data[o + c] = lit >= votes ? data[best + c] : 0
			out.data[o + 3] = 255
		}
	return out
}

// an emissive map with its own mips: only texels brighter than `floor` count as light (a faint wash
// stays dark), and each level halves by vote: the first `keep` levels hold any lit texel, so a light
// holds up close, and the rest need two, so it fades out far off; built once per map
const keptLit = new Map()
function keepLit(map) {
	if (!keptLit.has(map)) {
		const { pixels: full } = texels(map)
		const floor = PILOT_GLOW.floor * 255
		const { data } = full
		for (let i = 0; i < data.length; i += 4)
			if (Math.max(data[i], data[i + 1], data[i + 2]) < floor)
				data[i] = data[i + 1] = data[i + 2] = 0
		const mipmaps = [full]
		while (mipmaps.at(-1).width > 1 || mipmaps.at(-1).height > 1)
			mipmaps.push(halve(mipmaps.at(-1), floor, mipmaps.length > PILOT_GLOW.keep ? 2 : 1))
		const lit = map.clone()
		lit.mipmaps = mipmaps
		lit.generateMipmaps = false
		lit.needsUpdate = true
		keptLit.set(map, lit)
	}
	return keptLit.get(map)
}

// each of a model's materials swapped for what `change` makes of it
function swapMaterials(root, change) {
	root.traverse(mesh => {
		if (!mesh.isMesh) return
		const made = [mesh.material].flat().map(change)
		mesh.material = made.length === 1 ? made[0] : made
	})
}

// spec: { materials, color, intensity }: every material whose name `materials` matches lit from within
function addGlow(body, { materials, color, intensity }) {
	swapMaterials(body, material => {
		if (!materials.test(material.name)) return material
		const lit = material.clone()
		lit.emissive.set(paletteHex(color))
		lit.emissiveIntensity = intensity
		if (lit.emissiveMap) lit.emissiveMap = keepLit(lit.emissiveMap)
		return lit
	})
}

// a map's texels, drawn on a canvas of its own
export function texels(map) {
	const { width, height } = map.image
	const canvas = new OffscreenCanvas(width, height)
	const ctx = canvas.getContext('2d')
	ctx.drawImage(map.image, 0, 0)
	return { canvas, ctx, pixels: ctx.getImageData(0, 0, width, height) }
}

// whether a texel is one of the oxblood panels (a helmet's visor among them)
export function isPanel(r, g, b) {
	const { lean, sat, value } = PILOT_PANELS
	const bright = Math.max(r, g, b) / 255
	const spread = r - Math.min(g, b)
	if (r < Math.max(g, b) || spread < sat * r) return false
	if (bright < value[0] || bright > value[1]) return false
	return (g - b) / spread >= lean[0] && (g - b) / spread <= lean[1]
}

// a base map with its oxblood panels in a palette colour, shading kept; built once per map and colour
const repainted = new Map()
function panelsIn(map, color) {
	const key = `${map.uuid}:${color}`
	if (!repainted.has(key)) {
		const { usual, most } = PILOT_PANELS
		const { canvas, ctx, pixels } = texels(map)
		const { data } = pixels
		for (let i = 0; i < data.length; i += 4) {
			const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
			if (!isPanel(r, g, b)) continue
			const bright = Math.max(r, g, b) / 255
			const k = Math.min(most, bright / usual)
			PALETTE[color].forEach((c, j) => (data[i + j] = Math.min(255, c * k)))
		}
		ctx.putImageData(pixels, 0, 0)
		const paint = map.clone()
		// its own source: a clone shares the original's
		paint.source = new TextureSource(canvas)
		paint.needsUpdate = true
		repainted.set(key, paint)
	}
	return repainted.get(key)
}

// each repainted material's original, for a bare head's skin to keep its own colours
const unpainted = new WeakMap()

// a role's colour on every mapped material of a model
function paintPanels(root, color) {
	swapMaterials(root, material => {
		if (!material.map) return material
		const role = material.clone()
		role.map = panelsIn(material.map, color)
		unpainted.set(role, material)
		return role
	})
}

// paint: { [material name]: { base, tint?, ...look } | { glow } }: each named material in a palette colour, lit
// faintly from within in `tint`, its other settings in `look`; or glowing exactly the colour `glow` (a black base, so
// no light pushes it past it)
function repaint(root, paint) {
	swapMaterials(root, material => {
		const to = paint[material.name]
		if (!to) return material
		const { base, glow, tint, ...look } = to
		const own = material.clone()
		if (base) own.color.set(paletteHex(base))
		else {
			own.color.setScalar(0)
			own.emissive.set(paletteHex(glow))
			own.emissiveIntensity = 1
		}
		if (tint) own.emissive.set(paletteHex(tint))
		return Object.assign(own, look)
	})
}

// spec: { url, glow?, panels?, paint? }: an unrigged model, lit by `glow`, its oxblood in the `panels`
// colour, its named materials repainted by `paint`
export async function loadProp({ url, glow, panels, paint }) {
	const prop = (await fetchOnce(url)).scene.clone()
	if (glow) addGlow(prop, glow)
	if (panels) paintPanels(prop, panels)
	if (paint) repaint(prop, paint)
	return prop
}

// a prop scaled to `width` m across
export async function loadWide({ url, width }) {
	const prop = await loadProp({ url })
	prop.scale.setScalar(width / new Box3().setFromObject(prop).getSize(new Vector3()).x)
	return prop
}

// spec: { url, bone, drop, fit, seat, ahead, tipBack, seal, glow? }: the helmet sized to the head whose skin it
// replaces, `fit` times its width, the rim `seat` of its height under the chin, the middle `ahead` of
// its depth forward of the head's; hung on its bone and tipped back `tipBack` rad, the `seal` under it;
// the helmet and the seal, as added
export async function wearHelmet(body, spec) {
	const helmet = await loadProp(spec)
	const head = skinBox(body, spec.drop)
	dropSkin(body, spec.drop)
	const seal = addNeckSeal(body, head, spec)
	const size = head.getSize(new Vector3())
	const mid = head.getCenter(new Vector3())
	helmet.scale.setScalar(
		(spec.fit * size.x) / new Box3().setFromObject(helmet).getSize(new Vector3()).x
	)
	helmet.position.set(mid.x, head.min.y - spec.seat * size.y, mid.z + spec.ahead * size.z)
	helmet.rotation.x = -spec.tipBack
	helmet.updateMatrixWorld()
	body.getObjectByName(spec.bone).attach(helmet)
	return [helmet, seal]
}
