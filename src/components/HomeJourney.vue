<template>
	<section id="top" ref="trackRef" class="journey" :style="trackStyle">
		<PlanetStage :cam="cam" :spin="spin" :light-yaw="lightYaw" :haze="haze" />
		<JourneyRail :active="activeStop" />

		<!-- Departure: deep space, the destination a distant dot below the name. The
		     camera's axis runs through the gap between the two words, and the first
		     stretch of scroll flies it through. -->
		<header class="journey__hero">
			<!-- the flight: the mote field runs past behind the name, both projected
			     from the same camera, both vanishing at the frame's centre -->
			<div class="journey__flight" :style="flightStyle">
				<FlightDust :travel="travel" :fade="dust" />
				<div class="journey__lockup" :style="flybyStyle">
					<h1 class="journey__name">
						<span>{{ firstWords }}</span>
						<!-- a real space, so the heading still reads as the name: the
						     template's own whitespace is condensed away, and flex skips a
						     blank text run -->
						{{ ' ' }}
						<span>{{ lastWord }}</span>
					</h1>
					<!-- under the corridor, so the same pass carries it out of frame -->
					<div class="journey__cue">
						<p class="journey__label">{{ HOME_LANDING.label }}</p>
						<div class="journey__hint" :style="hintStyle" aria-hidden="true">
							<span>{{ HOME_LANDING.scrollHint }}</span>
							<PixelArrow />
						</div>
					</div>
				</div>
			</div>
		</header>

		<section id="work" ref="workRef" class="journey__station journey__station--work">
			<header class="journey__station-head">
				<PageTitle
					tag="h2"
					:lead="ABOUT_HEADINGS.work.lead"
					:accent="ABOUT_HEADINGS.work.accent"
				/>
			</header>
			<AboutWork />
		</section>

		<section id="life" ref="lifeRef" class="journey__station journey__station--life">
			<header class="journey__station-head">
				<PageTitle
					tag="h2"
					:lead="ABOUT_HEADINGS.life.lead"
					:accent="ABOUT_HEADINGS.life.accent"
				/>
			</header>
			<AboutLife />
		</section>

		<!-- Arrival: entry over the horizon carries the contact portals. -->
		<div ref="arrivalRef" class="journey__arrival">
			<JourneyArrival :progress="arrivalProgress" />
			<!-- nav target at the end of the approach, where the portals are live -->
			<div id="contact" class="journey__contact-anchor" />
		</div>
	</section>
</template>

<script setup>
	import { computed, onActivated, onBeforeUnmount, onMounted, ref } from 'vue'
	import { ARRIVAL, CAMERA, CAMERA_PORTRAIT, HERO_FLYBY, JOURNEY } from '@/constants/journey'
	import { ABOUT_HEADINGS } from '@/data/about'
	import { HOME_LANDING } from '@/data/heroLines'
	import { clamp01, smoothstep } from '@/js/math'
	import { useScrollSections } from '@/composables/useScrollSections'
	import AboutLife from './AboutLife.vue'
	import AboutWork from './AboutWork.vue'
	import FlightDust from './FlightDust.vue'
	import JourneyArrival from './JourneyArrival.vue'
	import JourneyRail from './JourneyRail.vue'
	import PageTitle from './PageTitle.vue'
	import PixelArrow from './PixelArrow.vue'
	import PlanetStage from './PlanetStage.vue'

	// named so App.vue's <KeepAlive> keeps the built page (planet canvas, photo
	// decks, reveal state) across navigation
	defineOptions({ name: 'HomeJourney' })

	const trackRef = ref(null)
	const workRef = ref(null)
	const lifeRef = ref(null)
	const arrivalRef = ref(null)

	const { progress, sync } = useScrollSections(trackRef)
	const { progress: arrivalProgress, sync: syncArrival } = useScrollSections(arrivalRef)

	// layout constants exposed to the stylesheet, so SCSS carries no hardcoded twins
	const trackStyle = {
		'--leg': `${JOURNEY.legVh}vh`,
		'--leg-hero': `${JOURNEY.heroLegVh}vh`,
		'--leg-dive': `${JOURNEY.diveLegVh}vh`,
		'--arrival-runway': `${ARRIVAL.runwayVh}vh`,
	}

	// The two words the camera flies between: everything but the last, then the
	// last. The corridor is the gap between them, and the lockup hangs from it.
	const nameWords = HOME_LANDING.name.split(' ')
	const firstWords = nameWords.slice(0, -1).join(' ')
	const lastWord = nameWords.at(-1)
	// Where the gap's centre sits relative to the row's, in the name's own em: half
	// the difference in the words' lengths, less the trailing spacing the first word
	// carries into the gap. The pass scales about that point, so the corridor is
	// what holds still on the axis while everything else sweeps off it.
	const corridorEm =
		((firstWords.length - lastWord.length) * (1 + HERO_FLYBY.letterSpacingEm) -
			HERO_FLYBY.letterSpacingEm) /
		2

	// camera keyframes in scrolled-px space, measured from the real section layout
	const dims = ref({ trackH: 0, vh: 0 })
	const camTrack = ref([])
	const stops = ref([])
	let resizeObserver = null

	function measure() {
		const track = trackRef.value
		if (!track) return
		const vh = window.innerHeight
		const trackTop = track.getBoundingClientRect().top
		const topOf = el => el.getBoundingClientRect().top - trackTop
		const bottomOf = el => topOf(el) + el.offsetHeight
		// portrait renders the vmin-sized globe far smaller — push the camera in
		const cameras = vh > track.clientWidth ? CAMERA_PORTRAIT : CAMERA
		dims.value = { trackH: track.offsetHeight, vh }
		// the departure flies out empty, the planet comes up dead ahead, the camera
		// comes around it, then stations dock as they enter; inside the pinned runway
		// the limb blows out and hands off to the entry
		const arrivalTop = topOf(arrivalRef.value)
		const runwayPx = (ARRIVAL.runwayVh / 100) * vh
		// the run from the top of the page to the WORK dock: the whole flight out
		const dock = topOf(workRef.value) - vh
		const beat = JOURNEY.departure
		camTrack.value = [
			{ s: 0, ...cameras.rest },
			{ s: dock * beat.void, ...cameras.void },
			{ s: dock * beat.dot, ...cameras.dot },
			{ s: dock * beat.close, ...cameras.close },
			{ s: dock * beat.orbitIn, ...cameras.orbitIn },
			{ s: dock * beat.orbitOut, ...cameras.orbitOut },
			{ s: dock, ...cameras.work },
			{ s: bottomOf(workRef.value) - vh / 2, ...cameras.workEnd },
			// the skim bottoms out mid-way through the long WORK → LIFE leg
			{
				s: (bottomOf(workRef.value) + topOf(lifeRef.value) - vh * 1.5) / 2,
				...cameras.dive,
			},
			{ s: topOf(lifeRef.value) - vh, ...cameras.life },
			{ s: bottomOf(lifeRef.value) - vh / 2, ...cameras.lifeEnd },
			{ s: arrivalTop, ...cameras.approach },
			{ s: arrivalTop + runwayPx * ARRIVAL.entryAt, ...cameras.entry },
			{ s: arrivalTop + runwayPx * ARRIVAL.goneAt, ...cameras.gone },
		]
		// rail thresholds: a stop lights once its station crosses mid-viewport
		stops.value = [0, topOf(workRef.value), topOf(lifeRef.value), topOf(arrivalRef.value)]
	}

	const scrolled = computed(() => progress.value * Math.max(0, dims.value.trackH - dims.value.vh))

	// The camera: eased per-channel between the measured keyframes. A keyframe that
	// leaves a channel out holds at the default here rather than reading NaN, which
	// keeps `light` and `reveal` to the beats that actually use them.
	const CAM_CHANNELS = { x: 0, y: 0, scale: 1, fade: 1, roll: 0, tilt: 0, light: 0, reveal: 1 }
	const cam = computed(() => {
		const pts = camTrack.value
		if (!pts.length) return { ...CAM_CHANNELS, ...CAMERA.rest }
		const s = scrolled.value
		if (s <= pts[0].s) return { ...CAM_CHANNELS, ...pts[0] }
		for (let i = 0; i < pts.length - 1; i++) {
			const a = pts[i]
			const b = pts[i + 1]
			if (s <= b.s) {
				const t = smoothstep((s - a.s) / (b.s - a.s || 1))
				const frame = {}
				for (const [key, base] of Object.entries(CAM_CHANNELS)) {
					const from = a[key] ?? base
					frame[key] = from + ((b[key] ?? base) - from) * t
				}
				return frame
			}
		}
		return pts[pts.length - 1]
	})

	// the planet keeps rolling under you for the whole trip; the camera's roll
	// channel piles ground rush on top through the skim and the entry
	const spin = computed(() => (progress.value * JOURNEY.turns + cam.value.roll) * Math.PI * 2)

	// The sun holds still in the world while you orbit — the terminator advances.
	// The camera's `light` channel swings it faster through the beats where going
	// around the planet is the point, which is what makes the circle read.
	const lightYaw = computed(
		() => (progress.value * JOURNEY.sunTurns + cam.value.light) * Math.PI * 2
	)

	// how far through the pass we are; past 1 the words are gone but the flight
	// carries on into the void
	const pass = computed(() => scrolled.value / ((dims.value.vh || 1) * HERO_FLYBY.runVh))

	// Departure: the pass through the corridor. The name stands on a plane `titleZ`
	// ahead, so its scale is what closing that gap does — the same travel the motes
	// ride, which is what makes the two read as one movement instead of two effects.
	// Since scale and offset-from-the-axis grow together, one scale about the corridor
	// is the whole move. The words go on out past the frame edges; the dissolve is
	// what ends the pass.
	const flybyStyle = computed(() => {
		const scale = 1 / (1 - flown(clamp01(pass.value)) / HERO_FLYBY.titleZ)
		const gone = clamp01(
			(scale - HERO_FLYBY.fadeFromScale) / (HERO_FLYBY.nearScale - HERO_FLYBY.fadeFromScale)
		)
		return {
			// the origin is the corridor: the gap's centre, not the row's
			transformOrigin: `calc(50% + ${corridorEm.toFixed(2)}em) 50%`,
			// and the shift puts that corridor on the frame's centre, where the star
			// tunnel's vanishing point is and where the planet will come up
			transform: `translateX(${(-corridorEm).toFixed(2)}em) scale(${scale.toFixed(3)})`,
			opacity: (1 - smoothstep(gone)).toFixed(3),
			// past the pass it is a frame-filling layer with nothing in it
			visibility: gone < 1 ? null : 'hidden',
		}
	})

	// How far down the corridor the camera has run, in world units — the one number
	// the whole flight comes from. Distance under constant acceleration for the first
	// stretch, then constant speed, normalised so the pass still ends where it did.
	function flown(p) {
		const h = HERO_FLYBY.spoolUp
		const d = p < h ? (p * p) / (2 * h) : p - h / 2
		return (HERO_FLYBY.titleZ * (1 - 1 / HERO_FLYBY.nearScale) * d) / (1 - h / 2)
	}

	// the motes ride this; past the end of the pass it carries on into the void
	const travel = computed(() => flown(Math.max(0, pass.value)))

	// the camera's own drift across the corridor, carrying motes and words together —
	// it is the camera that moves, not them
	const flightStyle = computed(() => {
		const t = smoothstep(clamp01(pass.value))
		const x = (t * HERO_FLYBY.driftVw).toFixed(2)
		const y = (t * HERO_FLYBY.driftVh).toFixed(2)
		return { transform: `translate3d(${x}vw, ${y}vh, 0)` }
	})

	// The mote field: up as the flight starts, on through the pass, out again as the
	// planet comes up. Measured on the pass's clock, past 1, so it outlasts the words
	// and carries the empty stretch before the planet.
	const dust = computed(() => {
		const t = pass.value
		const up = clamp01((t - HERO_FLYBY.dustIn) / (HERO_FLYBY.dustFull - HERO_FLYBY.dustIn))
		const out = clamp01((HERO_FLYBY.dustOut - t) / (HERO_FLYBY.dustOut - HERO_FLYBY.dustFull))
		return smoothstep(Math.min(up, out))
	})

	// atmosphere thickens across the entry window
	const haze = computed(
		() =>
			ARRIVAL.hazeMax *
			clamp01(
				(arrivalProgress.value - ARRIVAL.hazeStart) / (ARRIVAL.hazeEnd - ARRIVAL.hazeStart)
			)
	)

	const activeStop = computed(() => {
		let active = 0
		for (let i = 1; i < stops.value.length; i++) {
			if (scrolled.value >= stops.value[i] - dims.value.vh / 2) active = i
		}
		return active
	})

	const hintStyle = computed(() => ({
		'--hint-opacity': Math.max(0, 1 - progress.value / JOURNEY.hintFadeEnd),
	}))

	onMounted(() => {
		measure()
		window.addEventListener('resize', measure, { passive: true })
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(measure)
			resizeObserver.observe(trackRef.value)
		}
	})

	// re-shown from KeepAlive: scroll and measurements may have gone stale
	onActivated(() => {
		measure()
		sync()
		syncArrival()
	})

	onBeforeUnmount(() => {
		window.removeEventListener('resize', measure)
		if (resizeObserver) resizeObserver.disconnect()
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.journey {
		position: relative;
		width: 100%;
	}

	// Departure viewport: the destination planet (PlanetStage) waits in the lower
	// half. The hero itself is only the scroll the pass is spent over — the lockup
	// rides the viewport, not the page.
	.journey__hero {
		min-height: 100vh;
	}

	// The flight rides the viewport, not the page: the corridor has to hold still on
	// the camera's axis while the world moves past it, and the frame-filling letters
	// of the pass have to clip at the frame edges instead of widening the page. The
	// axis is the frame's centre — where the tunnel's vanishing point is, and where
	// the planet comes up out of the gap once the words have gone.
	.journey__flight {
		position: fixed;
		inset: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		// decorative once it is moving, and never in the way of the chrome
		pointer-events: none;
	}

	// its box is the name row alone (the cue hangs out of flow beneath), which puts
	// the corridor on the box's own centre line
	.journey__lockup {
		position: relative;
		z-index: 2;
		padding: 0 1rem;
		// the name's own size, so the corridor offset (set in JS, in em) measures in
		// character advances
		font-size: px8(4);
		text-align: center;
	}

	// the gap between the words is the corridor: the two of them are what the
	// camera goes between, so the space is load-bearing, not styling
	.journey__name {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		// a real space's advance: the corridor is the gap the name always had
		gap: 1.1em;
		margin: 0;
		font-family: $font-pixel;
		font-size: inherit;
		line-height: 1.3;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: $white;
		text-shadow:
			0 2px 12px rgba(0, 0, 0, 0.85),
			0 0 28px rgba($yellow, 0.3);
	}

	// under the corridor and out of flow: the pass scales it away from the axis
	// along with everything else, and the lockup's box stays the name row
	.journey__cue {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5rem;
		padding-top: 1.3rem;
	}

	.journey__label {
		margin: 0;
		font-family: $font-pixel;
		font-size: px8(2);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85);
	}

	// a hero should dominate on a big screen; whole steps, so it stays on-pixel
	@media (min-width: #{$breakpoint-desktop}) {
		.journey__lockup {
			font-size: px8(8);
		}

		.journey__label {
			font-size: px8(5);
		}
	}

	.journey__hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.4rem;
		font-family: $font-pixel;
		font-size: px8(2);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85);
		// scroll-driven fade (set in JS); decorative, never intercepts input
		opacity: var(--hint-opacity, 1);
		pointer-events: none;
	}

	// stations float over the planet stage (z 0); the leg margins are the empty
	// travel between them
	.journey__station {
		position: relative;
		z-index: 3;
		margin-top: var(--leg);
		// anchored jumps (#work, #life) land the heading at the usual title height,
		// well clear of the star chrome
		scroll-margin-top: $page-pad-top;
	}

	.journey__station-head {
		@include page-head;
		margin-bottom: 2.5rem;
		text-align: center;
	}

	// the long departure leg: the whole approach from distant world to wall
	.journey__station--work {
		margin-top: var(--leg-hero);
		// shared reading column for the timeline (AboutWork reads these vars)
		--about-column: #{$about-column};
		--about-gutter: #{$about-gutter};
	}

	// the longer leg that carries the surface skim
	.journey__station--life {
		margin-top: var(--leg-dive);
	}

	.journey__arrival {
		position: relative;
		// above the planet stage, below nothing — the pin's content stacks inside
		z-index: 1;
		margin-top: var(--leg);
		// the sticky pin needs its viewport plus the whole approach runway
		height: calc(var(--arrival-runway) + 100vh);
	}

	.journey__contact-anchor {
		position: absolute;
		top: var(--arrival-runway);
	}

	@media (max-width: $breakpoint-mobile) {
		.journey__cue {
			gap: 2.5rem;
		}

		.journey__station--work {
			// tighter gutter for the smaller mobile badge
			--about-gutter: #{$about-gutter-mobile};
		}
	}
</style>
