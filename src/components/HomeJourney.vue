<template>
	<section id="top" ref="trackRef" class="journey" :style="[trackStyle, parallaxStyle]">
		<PlanetStage :cam="cam" :spin="spin" :light-yaw="lightYaw" :haze="haze" />
		<!-- the journey's line: takes the camera sampler, not the camera, to aim its dive where the planet will be -->
		<JourneyRoute :cam-at="camAt" />
		<JourneyRail :active="activeStop" />

		<!-- Chrome that rides the whole flight once the hero has gone by: the name and a
		     way to the far end of the journey. How far along you are is the rail's, on the left. -->
		<div class="journey__chrome" :style="chromeStyle">
			<RouterLink class="journey__mark" :to="JOURNEY_STOPS[0].to">
				<span>{{ firstWords }}</span>
				<span>{{ lastWord }}</span>
			</RouterLink>
			<RouterLink class="journey__cta" :style="ctaStyle" :to="JOURNEY_STOPS.at(-1).to">
				{{ JOURNEY_STOPS.at(-1).label }}
			</RouterLink>
			<RouterLink
				class="journey__cta journey__cta--game"
				:style="ctaStyle"
				:to="GAME_LINK.to"
			>
				{{ GAME_LINK.label }}
			</RouterLink>
		</div>

		<!-- Departure: the destination a distant dot below the name, the first stretch of scroll flying at it. -->
		<header class="journey__hero">
			<!-- the flight: the mote field runs past behind the name, both projected
			     from the same camera, both vanishing at the frame's centre -->
			<div class="journey__flight" :style="flightStyle">
				<FlightDust :travel="travel" :fade="dust" :lean="pointer" />
				<!-- the ground we leave from, dropping away as the flight lifts over it -->
				<DepartureRidge
					:travel="travel"
					:pass="pass"
					@progress="boot.report"
					@ready="boot.finish"
				/>
				<div class="journey__lockup" :style="flybyStyle">
					<HeroTitle
						:name="HOME_LANDING.name"
						:first-words="firstWords"
						:last-word="lastWord"
						:role="HOME_LANDING.label"
						:cue="HOME_LANDING.scrollHint"
						:bare="plateBare"
						@axis="onAxis"
					/>
				</div>
			</div>
		</header>

		<section id="work" ref="workRef" class="journey__station journey__station--work">
			<!-- the heading sits in the scene: the planet's limb crosses it -->
			<header class="journey__station-head" :style="headingStyle">
				<p class="journey__kicker">{{ kicker(1) }}</p>
				<PageTitle
					tag="h2"
					:lead="ABOUT_HEADINGS.work.lead"
					:accent="ABOUT_HEADINGS.work.accent"
				/>
			</header>
			<div class="journey__station-body" :style="bodyStyle"><AboutWork /></div>
		</section>

		<section id="life" ref="lifeRef" class="journey__station journey__station--life">
			<header class="journey__station-head" :style="headingStyle">
				<p class="journey__kicker">{{ kicker(2) }}</p>
				<PageTitle
					tag="h2"
					:lead="ABOUT_HEADINGS.life.lead"
					:accent="ABOUT_HEADINGS.life.accent"
				/>
			</header>
			<div class="journey__station-body" :style="bodyStyle"><AboutLife /></div>
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
	import {
		computed,
		onActivated,
		onBeforeUnmount,
		onDeactivated,
		onMounted,
		ref,
		watch,
	} from 'vue'
	import { RouterLink } from 'vue-router'
	import { ARRIVAL, CAMERA, CAMERA_PORTRAIT, HERO_FLYBY, JOURNEY } from '@/constants/journey'
	import { GAME_LINK, JOURNEY_STOPS } from '@/constants/navigation'
	import { ABOUT_HEADINGS } from '@/data/about'
	import { HOME_LANDING } from '@/data/heroLines'
	import { clamp01, hermite, monotoneSlopes, riseFall, smoothstep } from '@/js/math'
	import { useBackdropCover } from '@/composables/useBackdropCover'
	import { useBoot } from '@/composables/useBoot'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { useScrollSections } from '@/composables/useScrollSections'
	import AboutLife from './AboutLife.vue'
	import AboutWork from './AboutWork.vue'
	import DepartureRidge from './DepartureRidge.vue'
	import FlightDust from './FlightDust.vue'
	import HeroTitle from './HeroTitle.vue'
	import JourneyArrival from './JourneyArrival.vue'
	import JourneyRail from './JourneyRail.vue'
	import JourneyRoute from './JourneyRoute.vue'
	import PageTitle from './PageTitle.vue'
	import PlanetStage from './PlanetStage.vue'

	// named so App.vue's <KeepAlive> keeps the built page across navigation
	defineOptions({ name: 'HomeJourney' })

	const trackRef = ref(null)

	// the shell's boot (App.vue) waits on the departure's cut; the landing reports it
	const boot = useBoot()
	const workRef = ref(null)
	const lifeRef = ref(null)
	const arrivalRef = ref(null)

	const { parallaxStyle, pointer } = usePointerParallax()
	const { progress, sync } = useScrollSections(trackRef)
	const { progress: arrivalProgress, sync: syncArrival } = useScrollSections(arrivalRef)

	// layout constants exposed to the stylesheet, so SCSS carries no hardcoded twins
	const trackStyle = {
		'--leg': `${JOURNEY.legVh}vh`,
		'--leg-hero': `${JOURNEY.heroLegVh}vh`,
		'--leg-dive': `${JOURNEY.diveLegVh}vh`,
		'--arrival-runway': `${ARRIVAL.runwayVh}vh`,
	}

	// A station is named the way the rail counts it: its number and the label the rail already carries.
	const kicker = i => `${String(i).padStart(2, '0')} · ${JOURNEY_STOPS[i].label}`

	// The two words the camera flies between: everything but the last, then the last.
	const nameWords = HOME_LANDING.name.split(' ')
	const firstWords = nameWords.slice(0, -1).join(' ')
	const lastWord = nameWords.at(-1)
	// Where the corridor sits from the lockup's centre (px) — HeroTitle measures it and hands it up.
	const portrait = ref(false)

	// the headings answer the cursor too — less than the planet (see JOURNEY.parallax)
	const headingStyle = { '--depth': JOURNEY.parallax.heading }

	// the prose leans too, as the nearest layer bar the title plate
	const bodyStyle = { '--depth': JOURNEY.parallax.body }

	const axis = ref({ x: 0, y: 0 })
	const onAxis = next => (axis.value = next)

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
		portrait.value = vh > track.clientWidth
		const cameras = portrait.value ? CAMERA_PORTRAIT : CAMERA
		dims.value = { trackH: track.offsetHeight, vh }
		// the departure flies through the name at the planet, then stations dock as they enter
		const arrivalTop = topOf(arrivalRef.value)
		const runwayPx = (ARRIVAL.runwayVh / 100) * vh
		// the run from the top of the page to the WORK dock: the whole flight out
		const dock = topOf(workRef.value) - vh
		const lifeFoot = bottomOf(lifeRef.value) - vh / 2
		const diveAt = (bottomOf(workRef.value) + topOf(lifeRef.value) - vh * 1.5) / 2
		const lifeDock = topOf(lifeRef.value) - vh
		const workHold = bottomOf(workRef.value) - vh / 2
		const beat = JOURNEY.departure
		camTrack.value = [
			{ s: 0, ...cameras.rest },
			{ s: dock * beat.void, ...cameras.void },
			{ s: dock * beat.dot, ...cameras.dot },
			{ s: dock * beat.close, ...cameras.close },
			{ s: dock * beat.orbitIn, ...cameras.orbitIn },
			{ s: dock * beat.orbitOut, ...cameras.orbitOut },
			{ s: dock, ...cameras.work },
			{ s: workHold, ...cameras.workEnd },
			// the skim bottoms out mid-way through the WORK -> LIFE leg, then holds at the deck
			{ s: diveAt, ...cameras.dive },
			{ s: diveAt + (lifeDock - diveAt) * JOURNEY.skimHoldAt, ...cameras.skim },
			{ s: lifeDock, ...cameras.life },
			{ s: bottomOf(lifeRef.value) - vh / 2, ...cameras.lifeEnd },
			// the turn onto the approach axis, well before the runway starts
			{
				s: lifeFoot + (arrivalTop - lifeFoot) * JOURNEY.lineUpAt,
				...cameras.lineUp,
			},
			{ s: arrivalTop, ...cameras.approach },
			{ s: arrivalTop + runwayPx * ARRIVAL.entryAt, ...cameras.entry },
			{ s: arrivalTop + runwayPx * ARRIVAL.goneAt, ...cameras.gone },
		]
		// rail thresholds: a stop lights once its station crosses mid-viewport
		stops.value = [0, topOf(workRef.value), topOf(lifeRef.value), topOf(arrivalRef.value)]
	}

	const scrolled = computed(() => progress.value * Math.max(0, dims.value.trackH - dims.value.vh))

	// One cubic per channel through the measured keyframes; a missing channel holds at the default.
	const CAM_CHANNELS = { x: 0, y: 0, scale: 1, fade: 1, roll: 0, tilt: 0, light: 0 }

	// Slopes for those cubics. Easing each segment on its own parked the camera at all fifteen keyframes.
	const camSlopes = computed(() => {
		const pts = camTrack.value
		if (pts.length < 2) return null
		const xs = pts.map(p => p.s)
		const slopes = {}
		for (const [key, base] of Object.entries(CAM_CHANNELS)) {
			slopes[key] = monotoneSlopes(
				xs,
				pts.map(p => p[key] ?? base)
			)
		}
		return slopes
	})

	// Sampled at an arbitrary scroll: the route needs where the planet will be, not where it is.
	function camAt(s) {
		const pts = camTrack.value
		const slopes = camSlopes.value
		if (!slopes) return { ...CAM_CHANNELS, ...CAMERA.rest }
		if (s <= pts[0].s) return { ...CAM_CHANNELS, ...pts[0] }
		for (let i = 0; i < pts.length - 1; i++) {
			const a = pts[i]
			const b = pts[i + 1]
			if (s <= b.s) {
				const h = b.s - a.s || 1
				const t = (s - a.s) / h
				const frame = {}
				for (const [key, base] of Object.entries(CAM_CHANNELS)) {
					const m = slopes[key]
					frame[key] = hermite(a[key] ?? base, b[key] ?? base, m[i], m[i + 1], h, t)
				}
				return frame
			}
		}
		return pts[pts.length - 1]
	}

	const cam = computed(() => camAt(scrolled.value))

	// the planet keeps rolling for the whole trip; the camera's roll piles ground rush on top
	const spin = computed(() => (progress.value * JOURNEY.turns + cam.value.roll) * Math.PI * 2)

	// The sun holds still in the world while you orbit — the terminator advances.
	const lightYaw = computed(
		() => (progress.value * JOURNEY.sunTurns + cam.value.light) * Math.PI * 2
	)

	// how far through the pass we are; past 1 the words are gone but the flight carries on
	const pass = computed(() => scrolled.value / ((dims.value.vh || 1) * HERO_FLYBY.runVh))

	// The name stands on a plane `titleZ` ahead, so its scale is what closing that gap does.
	const passScale = computed(() => 1 / (1 - flown(clamp01(pass.value)) / HERO_FLYBY.titleZ))
	// bare plate through the gate - see HERO_FLYBY.bareFromScale
	const plateBare = computed(() => passScale.value >= HERO_FLYBY.bareFromScale)

	const flybyStyle = computed(() => {
		const scale = passScale.value
		const gone = clamp01(
			(scale - HERO_FLYBY.fadeFromScale) / (HERO_FLYBY.nearScale - HERO_FLYBY.fadeFromScale)
		)
		return {
			// its share of the cursor's lean, for the sprite inside
			'--depth': HERO_FLYBY.plateDepth,
			// the origin is the corridor, and the shift puts it on the frame's centre
			transformOrigin: `calc(50% + ${axis.value.x.toFixed(1)}px) calc(50% + ${axis.value.y.toFixed(1)}px)`,
			transform: `translate(${(-axis.value.x).toFixed(1)}px, ${(-axis.value.y).toFixed(1)}px) scale(${scale.toFixed(3)})`,
			opacity: (1 - smoothstep(gone)).toFixed(3),
			// past the pass it is a frame-filling layer with nothing in it
			visibility: gone < 1 ? null : 'hidden',
		}
	})

	// How far down the corridor the camera has run, in world units — the one number the flight comes from.
	function flown(p) {
		const h = HERO_FLYBY.spoolUp
		const d = p < h ? (p * p) / (2 * h) : p - h / 2
		const t = d / (1 - h / 2)
		const run = HERO_FLYBY.titleZ * (1 - 1 / HERO_FLYBY.nearScale)
		return t <= 1 ? HERO_FLYBY.titleZ * (1 - HERO_FLYBY.nearScale ** -t) : run * t
	}

	// the motes ride this; past the end of the pass it carries on into the void
	const travel = computed(() => flown(Math.max(0, pass.value)))

	// the camera's own drift across the corridor, carrying motes and words together
	const flightStyle = computed(() => {
		const t = smoothstep(clamp01(pass.value))
		const x = (t * HERO_FLYBY.driftVw).toFixed(2)
		const y = (t * HERO_FLYBY.driftVh).toFixed(2)
		return { transform: `translate3d(${x}vw, ${y}vh, 0)` }
	})

	// The mote field: up as the flight starts, on through the pass, out again as the planet comes up.
	const dust = computed(() =>
		smoothstep(riseFall(pass.value, HERO_FLYBY.dustIn, HERO_FLYBY.dustFull, HERO_FLYBY.dustOut))
	)

	// atmosphere thickens across the entry window
	const haze = computed(
		() =>
			ARRIVAL.hazeMax *
			clamp01(
				(arrivalProgress.value - ARRIVAL.hazeStart) / (ARRIVAL.hazeEnd - ARRIVAL.hazeStart)
			)
	)

	// once the veil is opaque the starfield is invisible — flag it so the backdrop stops paying for drift
	const covered = useBackdropCover()
	watch(haze, h => (covered.value = h >= 1), { immediate: true })

	const activeStop = computed(() => {
		let active = 0
		for (let i = 1; i < stops.value.length; i++) {
			if (scrolled.value >= stops.value[i] - dims.value.vh / 2) active = i
		}
		return active
	})

	// held back through the hero, then along for the rest of the trip
	const chromeStyle = computed(() => {
		const t = smoothstep(
			clamp01(
				(pass.value - HERO_FLYBY.chromeFrom) / (HERO_FLYBY.chromeTo - HERO_FLYBY.chromeFrom)
			)
		)
		return { opacity: t.toFixed(3), visibility: t > 0.01 ? null : 'hidden' }
	})

	// The way out goes once the descent starts, so the last stretch is the atmosphere and nothing else.
	const ctaStyle = computed(() => {
		const there = smoothstep(
			clamp01(
				(arrivalProgress.value - ARRIVAL.ctaFadeStart) /
					(ARRIVAL.ctaFadeEnd - ARRIVAL.ctaFadeStart)
			)
		)
		return {
			opacity: (1 - there).toFixed(3),
			visibility: there < 1 ? null : 'hidden',
		}
	})

	onMounted(() => {
		measure()
		window.addEventListener('resize', measure, { passive: true })
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(measure)
			resizeObserver.observe(trackRef.value)
		}
	})

	// re-shown from KeepAlive: scroll and measurements may be stale, and `covered` must be re-asserted
	onActivated(() => {
		measure()
		sync()
		syncArrival()
		covered.value = haze.value >= 1
	})

	// away from the journey, the sky is somebody else's frame
	onDeactivated(() => (covered.value = false))

	onBeforeUnmount(() => {
		window.removeEventListener('resize', measure)
		if (resizeObserver) resizeObserver.disconnect()
		covered.value = false
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// The flight's chrome: fixed to the frame, the wrapper carrying the fade so it all arrives together.
	.journey__chrome {
		position: fixed;
		inset: 0;
		z-index: 20;
		pointer-events: none;
	}

	// the site's own chip chrome (backless, keyline-carried) moved to the top corners
	.journey__mark,
	.journey__cta {
		@include pinned-chip;

		& {
			position: absolute;
			top: 0.6rem;
			bottom: auto;
			pointer-events: auto;
		}
	}

	// the hero lockup in miniature: the same two words, stacked flag-left
	.journey__mark {
		left: 0.6rem;
		right: auto;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5em;
	}

	// the game rides one rung under the way out — same chip, and it leaves with it
	.journey__cta--game {
		top: 2.9rem;
	}

	.journey {
		position: relative;
		width: 100%;
	}

	// Departure viewport: the destination planet (PlanetStage) waits in the lower half.
	.journey__hero {
		min-height: 100vh;
	}

	// The flight rides the viewport, not the page: the corridor holds still while the world moves past.
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

	// its box is the name row alone, which puts the corridor on the box's own centre line
	.journey__lockup {
		position: relative;
		z-index: 2;
		padding: 0 1rem;
		// the name's own size — HeroTitle's own type inherits it
		font-size: px8(4);
		text-align: center;
	}

	// A hero should dominate on a big screen; whole steps, so it stays on-pixel.
	@media (min-width: #{$breakpoint-desktop}) {
		.journey__lockup,
		.journey__station-head :deep(.page-heading) {
			font-size: px8(8);
		}
	}

	// the leg margins are the empty travel between stations; head and body take their own depths
	.journey__station {
		position: relative;
		margin-top: var(--leg);
		// anchored jumps (#work, #life) land the heading at the usual title height, clear of the chrome
		scroll-margin-top: $page-pad-top;
	}

	// Over the stage, not behind it: a title the limb swallows is unread, so the keyline holds it off.
	.journey__station-head {
		position: relative;
		z-index: 1;
		@include lean;
		max-width: min(64rem, 92vw);
		margin: 0 auto 2.5rem;
		padding: 1.75rem 1.5rem 2rem;
		text-align: center;
	}

	// the reading matter stays in front of the world
	.journey__station-body {
		position: relative;
		z-index: 1;
		@include lean;
	}

	// crossing a lit limb, the letters need holding off it from every side
	.journey__station-head :deep(.page-heading) {
		font-size: px8(4);
		@include pixel-keyline;
	}

	// A child's text-shadow replaces the inherited one, so the yellow word restates the border itself.
	.journey__station-head :deep(.page-heading__accent) {
		@include pixel-keyline($halo: 0.5em, $halo-colour: rgba($yellow, 0.5));
	}

	// the beat's number and name, small against the display size above it
	.journey__kicker {
		margin: 0 0 1.2rem;
		font-family: $font-pixel;
		font-size: px8(1);
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: $yellow;
		// px, not em: a fraction of an em at this size rounds away to nothing
		@include pixel-keyline($unit: 1px, $halo: 6px);
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
		// A phone has room for one chip, and the way out is worth more than the name.
		.journey__mark {
			display: none;
		}

		// The stations run full-width here, so the chip trades padding, not glyphs, for the room:
		// Press Start 2P is crisp at 8/16/24 only, and one step down is a label, not a control.
		.journey__cta {
			padding: 0.4rem 0.6rem;
			color: rgba($white, 0.62);
		}

		// a thumb wants 44px; the chip's box is 31px, so the hit area grows past it on every side
		.journey__cta::after {
			content: '';
			position: absolute;
			inset: -0.4rem -0.5rem;
		}

		// clear of the way-out chip's grown hit area, which would otherwise swallow this rung's top
		.journey__cta--game {
			top: 3.5rem;
		}

		.journey__station--work {
			// tighter gutter for the smaller mobile badge
			--about-gutter: #{$about-gutter-mobile};
		}
	}
</style>
