// The gulls' flight (EntrySkyLife.vue): a flock flies a straight line in front of the ranges in true
// perspective, as the journey's drifters do: its place and size on screen divide by its depth, so a
// bird nearing grows, climbs and hurries, one receding shrinks and slows, and a gust carries a near
// bird further across the frame than a far one. A gull flaps a few beats, then glides, and is drawn
// from where the viewer stands to it (gullArt.js), so it turns as it crosses. Places land on whole
// pixels, sizes on whole cells, and the wingbeat steps a whole sprite at a time.

import { ENTRY } from '../constants/journey.js'
import { gullFrame, yawBins } from './gullArt.js'
import { ramp, randIn, randInt } from './math.js'

const RAD = Math.PI / 180

// the sheet's width in cells: every yaw's beat and glide side by side
const sheetWidth = spec => spec.w * yawBins(spec).length * (spec.flap.phases + 1)

// a slab of depth by its odds
function pickTier() {
	let roll = Math.random()
	return ENTRY.flock.tiers.find(tier => (roll -= tier.odds) < 0) ?? ENTRY.flock.tiers.at(-1)
}

// A flock born off one edge: the slab it flies in, where its depth is headed, and its birds strung
// out behind the lead in cells of the sprite, each on its own wingbeat. The slab and the way it flies
// are rolled unless the caller has a plan.
export function spawnFlock({ tier = pickTier(), rightward = Math.random() < 0.5 } = {}) {
	const F = ENTRY.flock
	const [near, far] = tier.z
	const z = randIn(tier.z)
	// where its depth would stand by the end of a level crossing, kept inside the slab
	const goal = Math.min(far, Math.max(near, z - randIn(F.approach) * (far - near)))
	const pace = randIn(F.paceVw)
	let dx = 0
	const birds = Array.from({ length: randInt(F.count) }, () => {
		const flapMs = Math.round(randIn(F.flapMs))
		const bird = {
			dx,
			dh: randInt(F.jitterCells),
			flapMs,
			// this beat's own length; the next rolls again
			period: flapMs,
			beat: Math.random(),
			gliding: false,
			until: 0,
			size: 0,
			key: '',
		}
		// wingtip to wingtip: the bird's own width, then clear air
		dx += ENTRY.bird.w + randInt(F.gapCells)
		return bird
	})
	return {
		tier,
		rightward,
		birds,
		x: rightward ? F.enterVw.rightward : F.enterVw.leftward,
		z,
		z0: z,
		// the depth's drift a second, paced so a level crossing would carry it to `goal`
		sink: ((goal - z) * pace) / (100 + F.exitVw - F.enterVw.rightward),
		pace,
		// its height over the eye line, set so it starts where its slab flies: nearing, it climbs
		alt: (F.horizonVh - randIn(tier.yVh)) * z,
		peak: randIn(F.peak),
	}
}

// `dt` ms on at `strength` of wind, in a `frame` of w by h px. Each bird's place, size and wingbeat
// frame go to `paint(i, style)` once they change (it says whether the bird was there to take them).
// True back once the whole flock has left the frame.
export function flyFlock(flock, strength, dt, now, frame, paint) {
	const F = ENTRY.flock
	const W = F.wind
	const B = ENTRY.bird
	const s = dt / 1000
	const w = ramp(strength, ENTRY.wind.lull, ENTRY.wind.gust)
	const [near, far] = flock.tier.z
	flock.z = Math.min(far, Math.max(near, flock.z + flock.sink * s))
	// the wind at its back hurries it, in its face holds it up; nearer, the same air moves it further
	const wind = flock.rightward ? 1 + W.tail * w : 1 / (1 + W.head * w)
	flock.x += (flock.rightward ? 1 : -1) * flock.pace * (flock.z0 / flock.z) * wind * s
	const size = Math.max(F.sizeMin, Math.round(F.sizeAt1 / flock.z))
	const vw = frame.w / 100
	const lead = flock.x * vw
	const top = (F.horizonVh - flock.alt / flock.z) * (frame.h / 100)
	// Where the viewer stands to the bird, for the yaw it is drawn at: its heading over the ground
	// (lateral at its starting depth, plus its drift in depth) against the line from it to the eye,
	// in world units where the frame's half-width is `fovDeg` of view.
	const eye = 50 / Math.tan(F.fovDeg * RAD)
	const fx = (flock.rightward ? 1 : -1) * ((flock.pace * flock.z0) / eye)
	const fz = -flock.sink
	let left = Infinity
	let right = -Infinity
	flock.birds.forEach((bird, i) => {
		// the wingbeat: a bird comes on beating, then takes turns beating and gliding
		if (!bird.until) bird.until = now + randInt(F.beats) * bird.flapMs
		else if (now >= bird.until) {
			bird.gliding = !bird.gliding
			const lean = flock.rightward ? 1 + W.tailGlide * w : 1 - W.headGlide * w
			bird.until =
				now + (bird.gliding ? randIn(F.glideMs) * lean : randInt(F.beats) * bird.flapMs)
		}
		if (!bird.gliding) {
			bird.beat += (s * 1000) / bird.period
			// each beat its own length, so the wings never tick
			if (bird.beat >= 1) {
				bird.beat %= 1
				bird.period = bird.flapMs * (1 + (Math.random() * 2 - 1) * F.flapVary)
			}
		}
		const x = Math.round(lead + (flock.rightward ? -bird.dx : bird.dx) * size)
		const y = Math.round(top + bird.dh * size)
		left = Math.min(left, x)
		right = Math.max(right, x + B.w * size)
		// the eye from the bird's middle; the sign is which side the viewer is on, and the sheet's mirror
		const dx = -(((x + (B.w * size) / 2) / vw - 50) * flock.z) / eye
		const theta = Math.atan2(-fz * dx + fx * flock.z, fx * dx + fz * flock.z) / RAD
		const frame = gullFrame(
			B,
			theta,
			bird.gliding ? null : Math.floor(bird.beat * B.flap.phases)
		)
		const key = `${x},${y},${frame},${size}`
		if (key === bird.key) return
		const style = {
			translate: `${x}px ${y}px`,
			backgroundPositionX: `${-frame * B.w * size}px`,
		}
		if (bird.size !== size) {
			style.width = `${B.w * size}px`
			style.height = `${B.h * size}px`
			style.backgroundSize = `${sheetWidth(B) * size}px ${B.h * size}px`
		}
		if (!paint(i, style)) return
		bird.key = key
		bird.size = size
	})
	return flock.rightward ? left > frame.w + F.exitVw * vw : right < -F.exitVw * vw
}
