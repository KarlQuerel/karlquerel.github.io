// The pilot's models: each glTF fetched once and cloned for every use. A rigged body comes on its own
// skeleton scaled to its height; a helmet takes the place of a body's head.

import {
	Box3,
	BufferGeometry,
	DoubleSide,
	Float32BufferAttribute,
	Matrix4,
	MeshStandardMaterial,
	SkinnedMesh,
	Uint16BufferAttribute,
	Vector3,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { paletteHex } from '../../constants/palette.js'

const loader = new GLTFLoader()
const loading = new Map()

function fetchOnce(url) {
	if (!loading.has(url)) loading.set(url, loader.loadAsync(url))
	return loading.get(url)
}

// spec: { url, height }; the clips come back by name
export async function loadRigged({ url, height }) {
	const gltf = await fetchOnce(url)
	const body = clone(gltf.scene)
	const size = new Box3().setFromObject(body).getSize(new Vector3())
	body.scale.setScalar(height / size.y)
	const clips = Object.fromEntries(gltf.animations.map(clip => [clip.name, clip]))
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

// the skin less every triangle with a corner riding mostly on a bone `drop` matches
export function dropSkin(body, drop) {
	body.traverse(mesh => {
		if (!mesh.isSkinnedMesh) return
		const rides = ridesOn(mesh, drop)
		const index = mesh.geometry.index.array
		const kept = []
		for (let t = 0; t < index.length; t += 3)
			if (!rides(index[t]) && !rides(index[t + 1]) && !rides(index[t + 2]))
				kept.push(index[t], index[t + 1], index[t + 2])
		mesh.geometry = mesh.geometry.clone()
		mesh.geometry.setIndex(kept)
	})
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
}

// spec: { url, bone, drop, fit, seat, ahead, tipBack, seal }: the helmet sized to the head whose skin it
// replaces, `fit` times its width, the rim `seat` of its height under the chin, the middle `ahead` of
// its depth forward of the head's; hung on its bone and tipped back `tipBack` rad, the `seal` under it
export async function wearHelmet(body, spec) {
	const helmet = (await fetchOnce(spec.url)).scene.clone()
	const head = skinBox(body, spec.drop)
	dropSkin(body, spec.drop)
	addNeckSeal(body, head, spec)
	const size = head.getSize(new Vector3())
	const mid = head.getCenter(new Vector3())
	helmet.scale.setScalar(
		(spec.fit * size.x) / new Box3().setFromObject(helmet).getSize(new Vector3()).x
	)
	helmet.position.set(mid.x, head.min.y - spec.seat * size.y, mid.z + spec.ahead * size.z)
	helmet.rotation.x = -spec.tipBack
	helmet.updateMatrixWorld()
	body.getObjectByName(spec.bone).attach(helmet)
}
