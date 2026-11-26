// The intro cinematic (constants/game/intro.js), cut shot by shot; the page types the cards and covers a slate. The
// orbit's shots are built: the Earth in 3D (introEarth.js) dying from shot to shot, war debris tumbling past the
// opening, flashes on its night side, one launch climbing off the limb, the title's Moon on a card facing the
// camera. A ground shot is a set of its own (SETS), seen through the same camera and pixel pass. The rest are
// still slates.

import {
	BoxGeometry,
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
import { PILOT, PILOT_BEAM } from '../../constants/game/pilot.js'
import { EARTH_MAP } from '../../constants/intro/earthMap.js'
import { PALETTE, paletteHex } from '../../constants/palette.js'
import { clamp01, randIn, riseFall, smootherstep } from '../math.js'
import IntroArtWorker from './introArt.worker.js?worker'
import { createDamSet } from './introDam.js'
import { createIntroEarth, earthTurn } from './introEarth.js'
import { createPixelPost } from './pixelPost.js'

const { earth, moon, shots, flashes, launch, debris, light } = INTRO
const DEG = Math.PI / 180
const even = v => 2 * Math.ceil(v / 2)
const vec = ([x, y, z]) => new Vector3(x, y, z)
const key = ({ at, look }) => ({ at: vec(at), look: vec(look) })
const mix = (a, b, u) => a + (b - a) * u

// the ground shots' sets by the name a shot gives as its `set`
const SETS = { dam: createDamSet }
// the orbit's lens; a set brings its own
const ORBIT_LENS = { fovDeg: INTRO.fovDeg, near: INTRO.near, far: INTRO.far }

function lens(camera, { fovDeg, near, far }) {
	if (camera.fov === fovDeg && camera.near === near && camera.far === far) return
	Object.assign(camera, { fov: fovDeg, near, far })
	camera.updateProjectionMatrix()
}

// when each shot starts, the last entry the cut's end; an orbit shot's camera keys
const starts = shots.reduce((at, { holdS }) => [...at, at.at(-1) + holdS], [0])
const length = starts.at(-1)
const moves = shots.map(({ from, to }) => from && { from: key(from), to: key(to) })
const shotAt = t => Math.max(0, starts.findLastIndex(s => s <= t) - (t >= length ? 1 : 0))
// a card holds until its last shot ends
const cardEnd = card => starts[shots.findLastIndex(s => s.card === card) + 1]

// the Earth's world map, with the intro's own share of cities lit, and the Moon, off the main thread
function paintArt() {
	const [cols, rows] = earth.map
	const moonRes = even((moon.rows * window.innerHeight) / PILOT.cellPx)
	const N = EARTH_MAP.night
	const map = { ...EARTH_MAP, night: { ...N, cities: { ...N.cities, lit: earth.citiesLit } } }
	return new Promise((resolve, reject) => {
		const worker = new IntroArtWorker()
		const end = settle => arg => {
			worker.terminate()
			settle(arg)
		}
		worker.onmessage = end(({ data }) => resolve({ ...data, cols, rows, moonRes }))
		worker.onerror = end(reject)
		worker.postMessage({
			cols,
			rows,
			map,
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

// The flashes on the ground in the shot that has them: each where the sun is down and the ground faces that
// shot's camera, found in the world at the shot and carried onto the turning globe.
function addFlashes(globe, sun) {
	const shot = shots.findIndex(s => s.flashes)
	const material = new MeshBasicMaterial({ color: paletteHex(flashes.color) })
	const geometry = new SphereGeometry(1, 8, 6)
	const from = starts[shot] + flashes.leadS
	const span = shots[shot].holdS - flashes.leadS - flashes.tailS
	const toward = moves[shot].to.at.clone().normalize()
	const out = []
	while (out.length < flashes.count) {
		const w = new Vector3().randomDirection()
		if (w.dot(sun) > -flashes.dark || w.dot(toward) < flashes.facing) continue
		const at = from + (span * (out.length + 0.5)) / flashes.count
		const mesh = new Mesh(geometry, material)
		mesh.position
			.copy(w.applyAxisAngle(new Vector3(0, 1, 0), -earthTurn(at)))
			.multiplyScalar(earth.radius)
		mesh.visible = false
		globe.add(mesh)
		out.push({ mesh, at })
	}
	return out
}

// the launch's light on a plane through the globe's middle facing the camera, its trail standing on the limb at
// its bearing, in the shot that has it
function addLaunch() {
	const shot = shots.findIndex(s => s.launch)
	const bearing = launch.bearingDeg * DEG
	const material = new MeshBasicMaterial({ color: paletteHex(launch.color) })
	const mesh = new Mesh(new SphereGeometry(1, 8, 6), material)
	mesh.scale.setScalar(launch.radius)
	const trail = new Mesh(
		new CylinderGeometry(launch.trail, launch.trail, 1, 6).translate(0, 0.5, 0),
		material
	)
	trail.position
		.set(Math.cos(bearing), Math.sin(bearing), 0)
		.multiplyScalar(earth.radius * launch.from)
	trail.rotation.z = bearing - Math.PI / 2
	const light = new Group()
	light.add(mesh, trail)
	light.visible = false
	return { light, mesh, trail, bearing, shot, at: starts[shot] + launch.leadS }
}

// the debris along the opening's path, each a broken plate turning about an axis of its own, under the sun
// and the void's fill
function addDebris(sun) {
	const { from, to } = moves[0]
	const group = new Group()
	const pieces = Array.from({ length: debris.count }, (_, i) => {
		const long = randIn(debris.size)
		const plate = new Mesh(
			new BoxGeometry(long, long * randIn([0.3, 1]), long * debris.thin),
			new MeshStandardMaterial({
				color: paletteHex(debris.colors[i % debris.colors.length]),
				flatShading: true,
			})
		)
		const side = new Vector3().randomDirection().setZ(0).normalize()
		plate.position
			.lerpVectors(from.at, to.at, randIn(debris.along))
			.addScaledVector(side, randIn(debris.aside))
		const turn = [0, 2 * Math.PI]
		plate.rotation.set(randIn(turn), randIn(turn), randIn(turn))
		group.add(plate)
		return {
			plate,
			axis: new Vector3().randomDirection(),
			rate: randIn([0.3, 1]) * debris.tumbleDegS * DEG,
		}
	})
	const lit = new DirectionalLight(paletteHex(light.sun.color), light.sun.intensity)
	lit.position.copy(sun)
	const { sky: above, ground, intensity } = light.fill
	group.add(lit, new HemisphereLight(paletteHex(above), paletteHex(ground), intensity))
	return { group, pieces }
}

export function createIntroCinematic() {
	const still = prefersReducedMotion()
	const scene = new Scene()
	const camera = new PerspectiveCamera(INTRO.fovDeg, 1, INTRO.near, INTRO.far)
	const look = new Vector3()
	const clock = { time: 0 }
	const grid = { width: 1, height: 1 }
	const world = { drain: 0, cover: 0, cities: 0 }
	let renderer = null
	let post = null
	let sky = null
	let planet = null
	let lunar = null
	let strikes = []
	let climb = null
	let wreckage = null
	let sets = {}

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
		planet = createIntroEarth(art.surface, art.cols, art.rows)
		// paintMoon fills its sprite to a cell short of the edge
		lunar = discCard(art.disc, art.moonRes, (2 * moon.radius * art.moonRes) / (art.moonRes - 2))
		lunar.position.set(...moon.at)
		strikes = still ? [] : addFlashes(planet.globe, planet.sun)
		climb = addLaunch()
		wreckage = addDebris(planet.sun)
		scene.clear()
		scene.add(planet.group, lunar, climb.light, wreckage.group)
		// the sky behind: the pass draws it only where nothing stands
		scene.background = sky
		sets = Object.fromEntries(shots.filter(s => s.set).map(({ set }) => [set, SETS[set]()]))
		camera.layers.enable(PILOT_BEAM.layer)
		await step('art')
		renderer.compile(scene, camera)
		for (const set of Object.values(sets)) renderer.compile(set.scene, camera)
	}

	function resize({ width, height }) {
		Object.assign(grid, { width, height })
		renderer.setSize(width, height, false)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		post.resize(width, height)
	}

	// the camera and the planet from the shot's first key to its last over the shot; reduced motion holds the last
	function place(t, shot) {
		const { from, to } = moves[shot]
		const u = still ? 1 : smootherstep(clamp01((t - starts[shot]) / shots[shot].holdS))
		camera.position.lerpVectors(from.at, to.at, u)
		camera.lookAt(look.lerpVectors(from.look, to.look, u))
		camera.updateMatrixWorld()
		lunar.quaternion.copy(camera.quaternion)
		climb.light.quaternion.copy(camera.quaternion)
		const [a, b] = shots[shot].world
		for (const k of Object.keys(world)) world[k] = mix(a[k], b[k], u)
	}

	function frame(dt) {
		const t = (clock.time += dt)
		const shot = shotAt(t)
		const set = sets[shots[shot].set]
		if (set) {
			lens(camera, set.lens)
			set.frame(t - starts[shot], shots[shot].holdS, camera, still)
			post.render(set.scene)
			return true
		}
		// a slate is the page's to cover
		if (!moves[shot]) return true
		lens(camera, ORBIT_LENS)
		place(t, shot)
		planet.update(t, world, camera, grid)
		for (const { mesh, at } of strikes) {
			const k = riseFall(t - at, 0, flashes.peakS, flashes.goneS)
			mesh.visible = k > 0
			mesh.scale.setScalar(flashes.radius * k)
		}
		// the launch speeds up as it climbs; reduced motion shows it where it ends
		const u = still ? 1 : clamp01((t - climb.at) / launch.climbS) ** 2
		const climbed = earth.radius * (launch.to - launch.from) * u
		const r = earth.radius * launch.from + climbed
		climb.light.visible = shot === climb.shot && t >= climb.at
		climb.mesh.position.set(Math.cos(climb.bearing) * r, Math.sin(climb.bearing) * r, 0)
		climb.trail.scale.y = Math.max(climbed, launch.trail)
		if (!still)
			for (const { plate, axis, rate } of wreckage.pieces) plate.rotateOnAxis(axis, rate * dt)
		post.render(scene)
		return true
	}

	// the shot on screen: its card and the seconds that card has left, its slate if it is one, how it came in and
	// how long ago, and how far past the cut's end the clock has run
	function cue() {
		const t = clock.time
		const shot = shotAt(t)
		const { card, slate, cut } = shots[shot]
		return {
			card,
			slate,
			cut,
			into: t - starts[shot],
			cardLeft: cardEnd(card) - t,
			past: t - length,
		}
	}

	function release() {
		for (const set of Object.values(sets)) set.dispose()
		planet?.dispose()
		wreckage?.group.traverse(o => {
			o.geometry?.dispose()
			o.material?.dispose()
		})
		if (lunar) {
			lunar.material.map.dispose()
			lunar.material.dispose()
			lunar.geometry.dispose()
		}
		sky?.dispose()
		post?.dispose()
		renderer?.dispose()
	}

	return { boot: INTRO.boot, build, resize, frame, release, cue, clock }
}
