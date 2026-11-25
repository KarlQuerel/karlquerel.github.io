// The intro cinematic (constants/game/intro.js): the camera down one shot on the Earth, beat by beat; the page
// types the cards. A rough cut: the title's globe and Moon on cards facing the camera, flashes on the night side,
// launches off the limb, the fleet as blocks.

import {
	CylinderGeometry,
	DataTexture,
	DirectionalLight,
	EquirectangularReflectionMapping,
	Group,
	HemisphereLight,
	LinearFilter,
	LinearMipmapLinearFilter,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	NearestFilter,
	PerspectiveCamera,
	PlaneGeometry,
	RGBAFormat,
	Scene,
	SphereGeometry,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
	WebGLRenderer,
} from 'three'
import { prefersReducedMotion } from '../../composables/usePrefersReducedMotion.js'
import { INTRO } from '../../constants/game/intro.js'
import { PILOT } from '../../constants/game/pilot.js'
import { PALETTE, paletteHex } from '../../constants/palette.js'
import { PLANET } from '../../constants/planet.js'
import HoldingWorker from '../holding.worker.js?worker'
import { clamp01, riseFall, smootherstep } from '../math.js'
import { box } from './parts.js'
import { createPixelPost } from './pixelPost.js'

const { earth, moon, beats, flashes, trails, fleet, light } = INTRO
const DEG = Math.PI / 180
const even = v => 2 * Math.ceil(v / 2)
const vec = ([x, y, z]) => new Vector3(x, y, z)

// when each beat starts, the last entry the cut's end
const starts = beats.reduce((at, { holdS }) => [...at, at.at(-1) + holdS], [0])
const length = starts.at(-1)
const keys = [INTRO.start, ...beats].map(({ at, look }) => ({ at: vec(at), look: vec(look) }))
const beatAt = t => Math.max(0, starts.findLastIndex(s => s <= t) - (t >= length ? 1 : 0))

// the globe's light in the world, the painter's y turned up
const [lx, ly, lz] = earth.light
const SUN = new Vector3(lx, -ly, lz).normalize()

// the globe and the Moon on the holding screen's worker, each `rows` frame heights across on this grid
function paintArt() {
	const rows = window.innerHeight / PILOT.cellPx
	const earthRes = even((earth.rows * rows) / (2 * PLANET.discRadius))
	const moonRes = even(moon.rows * rows)
	return new Promise((resolve, reject) => {
		const worker = new HoldingWorker()
		const end = settle => arg => {
			worker.terminate()
			settle(arg)
		}
		worker.onmessage = end(({ data }) => resolve({ ...data, earthRes, moonRes }))
		worker.onerror = end(reject)
		worker.postMessage({
			key: earthRes,
			earth: {
				res: earthRes,
				light: earth.light,
				view: earth.view,
				win: { x0: 0, y0: 0, w: earthRes, h: earthRes },
			},
			moon: { res: moonRes, art: moon.art, light: moon.light },
		})
	})
}

// a painted disc on a card `side` across, sampled smoothly so the pixel pass snaps it at the grid's own cell
function discCard(data, res, side) {
	const map = new DataTexture(new Uint8Array(data.buffer), res, res, RGBAFormat)
	map.colorSpace = SRGBColorSpace
	map.generateMipmaps = true
	map.minFilter = LinearMipmapLinearFilter
	map.magFilter = LinearFilter
	// the painting's rows run down, a texture's up
	map.repeat.set(1, -1)
	map.offset.set(0, 1)
	map.needsUpdate = true
	return new Mesh(new PlaneGeometry(side, side), new MeshBasicMaterial({ map, alphaTest: 0.5 }))
}

// the flashes on the globe's card, each on its night side with its moment
function addFlashes(card) {
	const material = new MeshBasicMaterial({ color: paletteHex(flashes.color) })
	const geometry = new SphereGeometry(1, 8, 6)
	const from = starts[flashes.beat] + flashes.leadS
	const span = beats[flashes.beat].holdS - flashes.leadS - flashes.tailS
	const out = []
	while (out.length < flashes.count) {
		const x = (Math.random() * 2 - 1) * flashes.spread
		const y = (Math.random() * 2 - 1) * flashes.spread
		const d2 = x * x + y * y
		if (d2 > flashes.spread ** 2) continue
		if (new Vector3(x, y, Math.sqrt(1 - d2)).dot(SUN) > -flashes.dark) continue
		const mesh = new Mesh(geometry, material)
		mesh.position.set(x * earth.radius, y * earth.radius, flashes.radius)
		mesh.visible = false
		card.add(mesh)
		out.push({ mesh, at: from + (span * (out.length + 0.5)) / flashes.count })
	}
	return out
}

// the launches off the globe's limb, between the fleet's first and last bearings, climbing to its orbit
function addTrails(card) {
	const material = new MeshBasicMaterial({ color: paletteHex(trails.color) })
	const geometry = new CylinderGeometry(trails.radius, trails.radius, 1, 6).translate(0, 0.5, 0)
	const spanDeg = (fleet.count - 1) * fleet.stepDeg
	return Array.from({ length: trails.count }, (_, k) => {
		const bearing = (fleet.firstDeg + (spanDeg * (k + 0.5)) / trails.count) * DEG
		const mesh = new Mesh(geometry, material)
		mesh.position.set(Math.cos(bearing) * earth.radius, Math.sin(bearing) * earth.radius, 0)
		mesh.rotation.z = bearing - Math.PI / 2
		mesh.visible = false
		card.add(mesh)
		return { mesh, at: starts[trails.beat] + trails.leadS + k * trails.everyS }
	})
}

// the fleet on its arc in front of the globe, each block along its orbit, ours with its lamp
function buildFleet() {
	const group = new Group()
	const hull = new MeshStandardMaterial({
		color: paletteHex(fleet.hull.color),
		roughness: fleet.hull.roughness,
	})
	const lamp = new Mesh(
		new SphereGeometry(fleet.lamp.radius, 8, 6),
		new MeshBasicMaterial({ color: paletteHex(fleet.lamp.color) })
	)
	lamp.position.x = fleet.half[0]
	for (let i = 0; i < fleet.count; i++) {
		const bearing = (fleet.firstDeg + i * fleet.stepDeg) * DEG
		const at = new Vector3(Math.cos(bearing), Math.sin(bearing), 0)
			.multiplyScalar(fleet.orbit)
			.setZ(fleet.z)
		const ship = box(at, fleet.half, hull)
		ship.rotation.z = bearing + Math.PI / 2
		if (i === fleet.ours) ship.add(lamp)
		group.add(ship)
	}
	group.visible = false
	return group
}

export function createIntroCinematic() {
	const still = prefersReducedMotion()
	const scene = new Scene()
	const camera = new PerspectiveCamera(INTRO.fovDeg, 1, INTRO.near, INTRO.far)
	const look = new Vector3()
	const clock = { time: 0 }
	let renderer = null
	let post = null
	let sky = null
	let cards = []
	let shots = []
	let launches = []
	let ships = null

	async function build(gl, step) {
		renderer = new WebGLRenderer({ canvas: gl.canvas, context: gl, antialias: false })
		renderer.setPixelRatio(1)
		// already on the palette: one texel to a cell, read as it is
		sky = await new TextureLoader().loadAsync(INTRO.sky)
		sky.mapping = EquirectangularReflectionMapping
		sky.colorSpace = SRGBColorSpace
		sky.magFilter = sky.minFilter = NearestFilter
		sky.generateMipmaps = false
		post = createPixelPost(renderer, camera, {
			palette: Object.keys(PALETTE),
			sky,
			edges: INTRO.edges,
		})
		await step('context')
		const art = await paintArt()
		const globe = discCard(art.globe, art.earthRes, earth.radius / PLANET.discRadius)
		// paintMoon fills its sprite to a cell short of the edge
		const lunar = discCard(
			art.disc,
			art.moonRes,
			(2 * moon.radius * art.moonRes) / (art.moonRes - 2)
		)
		lunar.position.set(...moon.at)
		cards = [globe, lunar]
		shots = still ? [] : addFlashes(globe)
		launches = addTrails(globe)
		ships = buildFleet()
		const sun = new DirectionalLight(paletteHex(light.sun.color), light.sun.intensity)
		sun.position.copy(SUN)
		const { sky: above, ground, intensity } = light.fill
		scene.clear()
		scene.add(
			globe,
			lunar,
			ships,
			sun,
			new HemisphereLight(paletteHex(above), paletteHex(ground), intensity)
		)
		// the sky behind: the pass draws it only where nothing stands
		scene.background = sky
		await step('art')
		renderer.compile(scene, camera)
	}

	function resize({ width, height }) {
		renderer.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		post.resize(width, height)
	}

	// the camera from the last beat's key to this one's over the beat; reduced motion cuts to it
	function place(t, beat) {
		const [a, b] = [keys[beat], keys[beat + 1]]
		const u = still ? 1 : smootherstep(clamp01((t - starts[beat]) / beats[beat].holdS))
		camera.position.lerpVectors(a.at, b.at, u)
		camera.lookAt(look.lerpVectors(a.look, b.look, u))
		for (const card of cards) card.quaternion.copy(camera.quaternion)
	}

	function frame(dt) {
		const t = (clock.time += dt)
		const beat = beatAt(t)
		place(t, beat)
		for (const { mesh, at } of shots) {
			const k = riseFall(t - at, 0, flashes.peakS, flashes.goneS)
			mesh.visible = k > 0
			mesh.scale.setScalar(flashes.radius * k)
		}
		// each launch in its own beat only: the fleet's shots turn the globe's card away from the orbit
		const climb = fleet.orbit - earth.radius
		for (const { mesh, at } of launches) {
			const u = still ? Number(t >= at) : clamp01((t - at) / trails.climbS)
			mesh.visible = u > 0 && beat === trails.beat
			mesh.scale.y = climb * u
		}
		ships.visible = beat >= fleet.beat
		post.render(scene)
		return true
	}

	// the beat on screen, the seconds left in it, and how far past the cut's end the clock has run
	function cue() {
		const beat = beatAt(clock.time)
		return { beat, left: starts[beat + 1] - clock.time, past: clock.time - length }
	}

	function release() {
		for (const card of cards) {
			card.material.map.dispose()
			card.material.dispose()
			card.geometry.dispose()
		}
		sky?.dispose()
		post?.dispose()
		renderer?.dispose()
	}

	return { boot: INTRO.boot, build, resize, frame, release, cue, clock }
}
