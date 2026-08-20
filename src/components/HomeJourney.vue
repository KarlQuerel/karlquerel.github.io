<template>
	<section id="top" ref="trackRef" class="journey" :style="trackStyle">
		<PlanetStage :cam="cam" :spin="spin" :light-yaw="lightYaw" :haze="haze" />
		<JourneyRail :active="activeStop" />

		<!-- Departure: deep space, the destination a distant dot below the name. -->
		<header class="journey__hero">
			<!-- the lockup pulls away faster than the page — left behind at departure -->
			<div class="journey__lockup" :style="lockupStyle">
				<h1 class="journey__name">{{ HOME_LANDING.name }}</h1>
				<p class="journey__label">{{ HOME_LANDING.label }}</p>
			</div>
			<div class="journey__hint" :style="hintStyle" aria-hidden="true">
				<span>{{ HOME_LANDING.scrollHint }}</span>
				<PixelArrow />
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
	import { ARRIVAL, CAMERA, CAMERA_PORTRAIT, JOURNEY } from '@/constants/journey'
	import { ABOUT_HEADINGS } from '@/data/about'
	import { HOME_LANDING } from '@/data/heroLines'
	import { clamp01, smoothstep } from '@/js/math'
	import { useScrollSections } from '@/composables/useScrollSections'
	import AboutLife from './AboutLife.vue'
	import AboutWork from './AboutWork.vue'
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
		'--leg-dive': `${JOURNEY.diveLegVh}vh`,
		'--arrival-runway': `${ARRIVAL.runwayVh}vh`,
	}

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
		// dock before a station enters, hold while it reads, swing during the legs;
		// inside the pinned runway the limb blows out and hands off to the entry
		const arrivalTop = topOf(arrivalRef.value)
		const runwayPx = (ARRIVAL.runwayVh / 100) * vh
		camTrack.value = [
			{ s: 0, ...cameras.rest },
			// mid-way through the hero → WORK run, so the approach arcs in
			{ s: (topOf(workRef.value) - vh) / 2, ...cameras.swing },
			{ s: topOf(workRef.value) - vh, ...cameras.work },
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

	// the camera: eased per-channel between the measured keyframes
	const CAM_CHANNELS = ['x', 'y', 'scale', 'fade', 'roll', 'tilt']
	const cam = computed(() => {
		const pts = camTrack.value
		if (!pts.length) return CAMERA.rest
		const s = scrolled.value
		if (s <= pts[0].s) return pts[0]
		for (let i = 0; i < pts.length - 1; i++) {
			const a = pts[i]
			const b = pts[i + 1]
			if (s <= b.s) {
				const t = smoothstep((s - a.s) / (b.s - a.s || 1))
				const frame = {}
				for (const key of CAM_CHANNELS) frame[key] = a[key] + (b[key] - a[key]) * t
				return frame
			}
		}
		return pts[pts.length - 1]
	})

	// the planet keeps rolling under you for the whole trip; the camera's roll
	// channel piles ground rush on top through the skim and the entry
	const spin = computed(() => (progress.value * JOURNEY.turns + cam.value.roll) * Math.PI * 2)

	// the sun holds still in the world while you orbit — the terminator advances
	const lightYaw = computed(() => progress.value * JOURNEY.sunTurns * Math.PI * 2)

	// departure: the name drifts away faster than the scroll, then fades
	const lockupStyle = computed(() => {
		const t = clamp01(scrolled.value / (dims.value.vh || 1))
		return {
			transform: `translate3d(0, ${(-t * 18).toFixed(2)}vh, 0)`,
			opacity: (1 - smoothstep(t)).toFixed(3),
		}
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

	// Departure viewport: content rides the upper half; the destination planet
	// (PlanetStage) waits in the lower half.
	.journey__hero {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: $chrome-clearance 1rem 46vh;
		text-align: center;
	}

	.journey__name {
		margin: 0;
		font-family: $font-pixel;
		font-size: px8(4);
		line-height: 1.3;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: $white;
		text-shadow:
			0 2px 12px rgba(0, 0, 0, 0.85),
			0 0 28px rgba($yellow, 0.3);
	}

	.journey__label {
		margin: 1.3rem 0 0;
		font-family: $font-pixel;
		font-size: px8(2);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85);
	}

	// a hero should dominate on a big screen; whole steps, so it stays on-pixel
	@media (min-width: #{$breakpoint-desktop}) {
		.journey__name {
			font-size: px8(8);
		}

		.journey__label {
			font-size: px8(5);
		}
	}

	.journey__hint {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 3rem;
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

	.journey__station--work {
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
		.journey__hero {
			padding-bottom: 42vh;
		}

		.journey__station--work {
			// tighter gutter for the smaller mobile badge
			--about-gutter: #{$about-gutter-mobile};
		}
	}
</style>
