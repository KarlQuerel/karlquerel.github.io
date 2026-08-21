<template>
	<section id="top" ref="trackRef" class="journey" :style="[trackStyle, parallaxStyle]">
		<PlanetStage :cam="cam" :spin="spin" :light-yaw="lightYaw" :haze="haze" />
		<JourneyRail :active="activeStop" />

		<!-- Chrome that rides the whole flight once the hero has gone by: the name, a
		     way to the far end of the journey, and how far along it you are. The rail
		     counts the stations on the left; this counts the distance on the right. -->
		<div class="journey__chrome" :style="chromeStyle">
			<RouterLink class="journey__mark" :to="JOURNEY_STOPS[0].to">
				{{ HOME_LANDING.name }}
			</RouterLink>
			<RouterLink class="journey__cta" :style="ctaStyle" :to="JOURNEY_STOPS.at(-1).to">
				{{ JOURNEY_STOPS.at(-1).label }}
			</RouterLink>
			<div class="journey__progress" aria-hidden="true">
				<span class="journey__progress-run" :style="progressStyle" />
			</div>
		</div>

		<!-- Departure: deep space, the destination a distant dot below the name. The
		     camera's axis runs through the gap between the two words, and the first
		     stretch of scroll flies it through. -->
		<header class="journey__hero">
			<!-- the flight: the mote field runs past behind the name, both projected
			     from the same camera, both vanishing at the frame's centre -->
			<div class="journey__flight" :style="flightStyle">
				<FlightDust :travel="travel" :fade="dust" />
				<!-- the ground we leave from, dropping away as the flight lifts over it -->
				<DepartureRidge :travel="travel" :pass="pass" />
				<div class="journey__lockup" :style="flybyStyle">
					<HeroTitle
						:name="HOME_LANDING.name"
						:first-words="firstWords"
						:last-word="lastWord"
						:role="HOME_LANDING.label"
						:cue="HOME_LANDING.scrollHint"
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
			<div class="journey__station-body"><AboutWork /></div>
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
			<div class="journey__station-body"><AboutLife /></div>
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
	import { RouterLink } from 'vue-router'
	import { ARRIVAL, CAMERA, CAMERA_PORTRAIT, HERO_FLYBY, JOURNEY } from '@/constants/journey'
	import { JOURNEY_STOPS } from '@/constants/navigation'
	import { ABOUT_HEADINGS } from '@/data/about'
	import { HOME_LANDING } from '@/data/heroLines'
	import { clamp01, hermite, monotoneSlopes, smoothstep } from '@/js/math'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { useScrollSections } from '@/composables/useScrollSections'
	import AboutLife from './AboutLife.vue'
	import AboutWork from './AboutWork.vue'
	import DepartureRidge from './DepartureRidge.vue'
	import FlightDust from './FlightDust.vue'
	import HeroTitle from './HeroTitle.vue'
	import JourneyArrival from './JourneyArrival.vue'
	import JourneyRail from './JourneyRail.vue'
	import PageTitle from './PageTitle.vue'
	import PlanetStage from './PlanetStage.vue'

	// named so App.vue's <KeepAlive> keeps the built page (planet canvas, photo
	// decks, reveal state) across navigation
	defineOptions({ name: 'HomeJourney' })

	const trackRef = ref(null)
	const workRef = ref(null)
	const lifeRef = ref(null)
	const arrivalRef = ref(null)

	const { parallaxStyle } = usePointerParallax()
	const { progress, sync } = useScrollSections(trackRef)
	const { progress: arrivalProgress, sync: syncArrival } = useScrollSections(arrivalRef)

	// layout constants exposed to the stylesheet, so SCSS carries no hardcoded twins
	const trackStyle = {
		'--leg': `${JOURNEY.legVh}vh`,
		'--leg-hero': `${JOURNEY.heroLegVh}vh`,
		'--leg-dive': `${JOURNEY.diveLegVh}vh`,
		'--arrival-runway': `${ARRIVAL.runwayVh}vh`,
	}

	// A station announces itself the way the rail counts it — its number and the label
	// the rail already carries, so the beat is named without inventing a name for it.
	const kicker = i => `${String(i).padStart(2, '0')} · ${JOURNEY_STOPS[i].label}`

	// The two words the camera flies between: everything but the last, then the
	// last. The corridor is the gap between them, and the lockup hangs from it.
	const nameWords = HOME_LANDING.name.split(' ')
	const firstWords = nameWords.slice(0, -1).join(' ')
	const lastWord = nameWords.at(-1)
	// Where the corridor sits relative to the lockup's centre, in px, both axes —
	// HeroTitle measures it off its own laid-out text and hands it up, so the numbers
	// hold whatever the breakpoints and any wrapping did. The pass scales about that
	// point and shifts it onto the frame's centre, which is where the mote field's
	// vanishing point is and where the planet comes up.
	// Pushing the camera in for portrait leaves the globe filling the frame rather than
	// sitting to one side of it, and a heading behind that is not crossed by a limb —
	// it is simply hidden (measured: up to 86% of it). So the words come in front there.
	// Landscape keeps them in the scene, which is the whole point of the treatment.
	const portrait = ref(false)

	// they answer the cursor either way — less than the planet (see JOURNEY.parallax)
	const headingStyle = computed(() => ({
		'--depth': JOURNEY.parallax.heading,
		zIndex: portrait.value ? 1 : -1,
	}))

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
		// the departure flies out empty, the planet comes up dead ahead, the camera
		// comes around it, then stations dock as they enter; inside the pinned runway
		// the limb blows out and hands off to the entry
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
			// the skim bottoms out mid-way through the long WORK → LIFE leg, then holds
			// at the deck while the ground streams past before climbing away
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

	// The camera: one cubic per channel through the measured keyframes. A keyframe
	// that leaves a channel out holds at the default here rather than reading NaN,
	// which keeps `light` and `reveal` to the beats that actually use them.
	const CAM_CHANNELS = { x: 0, y: 0, scale: 1, fade: 1, roll: 0, tilt: 0, light: 0, reveal: 1 }

	// Slopes for those cubics, rebuilt only when the track is re-measured. Easing
	// each segment on its own (a smoothstep per leg) parked the camera at every one
	// of the fifteen keyframes and pushed it off again, which is what made the middle
	// of the flight read as fifteen separate moves. Monotone slopes carry the speed
	// through a knot wherever a channel keeps heading the same way, and stop only
	// where it genuinely turns around — without ever overshooting the keyframes,
	// which `reveal`, `fade` and `scale` all depend on.
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

	const cam = computed(() => {
		const pts = camTrack.value
		const slopes = camSlopes.value
		if (!slopes) return { ...CAM_CHANNELS, ...CAMERA.rest }
		const s = scrolled.value
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

	// held back through the hero, then along for the rest of the trip
	const chromeStyle = computed(() => {
		const t = smoothstep(
			clamp01(
				(pass.value - HERO_FLYBY.chromeFrom) / (HERO_FLYBY.chromeTo - HERO_FLYBY.chromeFrom)
			)
		)
		return { opacity: t.toFixed(3), visibility: t > 0.01 ? null : 'hidden' }
	})

	const progressStyle = computed(() => ({ height: `${(progress.value * 100).toFixed(1)}%` }))

	// The way out goes away once the descent starts rather than once it ends: it is
	// gone by the time the first clouds are in frame, so the last stretch is the
	// atmosphere and nothing else. The portals it pointed at surface further down.
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

	// The flight's chrome: fixed to the frame, the wrapper carrying the fade so the
	// name, the way out and the distance all arrive together.
	.journey__chrome {
		position: fixed;
		inset: 0;
		z-index: 20;
		pointer-events: none;
	}

	// the site's own chip chrome — backless, keyline-carried, see pinned-chip — moved
	// from its usual bottom corner to the top ones
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

	.journey__mark {
		left: 0.6rem;
		right: auto;
	}

	// Distance run, against the rail's count of stations — a plain column rather than
	// a gradient, so it quantises the way everything else here does.
	.journey__progress {
		position: absolute;
		top: 50%;
		right: 1.4rem;
		width: 3px;
		height: 26vh;
		transform: translateY(-50%);
		background: rgba($white, 0.12);
	}

	.journey__progress-run {
		display: block;
		width: 100%;
		background: $yellow;
		box-shadow: 0 0 10px rgba($yellow, 0.4);
	}

	// Isolated so a station heading can sit at a negative z-index and land behind the
	// planet stage rather than behind the page itself.
	.journey {
		position: relative;
		width: 100%;
		isolation: isolate;
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
		// the name's own size — HeroTitle's own type inherits it
		font-size: px8(4);
		text-align: center;
	}

	// A hero should dominate on a big screen; whole steps, so it stays on-pixel. The
	// stations take the same size as the name — one display size for the whole flight.
	@media (min-width: #{$breakpoint-desktop}) {
		.journey__lockup,
		.journey__station-head :deep(.page-heading) {
			font-size: px8(8);
		}
	}

	// the leg margins are the empty travel between stations; the head and the body
	// take their own depths, one behind the planet stage and one in front of it
	.journey__station {
		position: relative;
		margin-top: var(--leg);
		// anchored jumps (#work, #life) land the heading at the usual title height,
		// well clear of the star chrome
		scroll-margin-top: $page-pad-top;
	}

	// In the scene rather than over it: behind the stage, so the planet's limb crosses
	// the words — landscape only, and the depth is set in JS with the portrait test the
	// camera table shares. No scrim either: a dark box behind type sitting on a lit limb
	// reads as a panel floating in space, which is why the arrival heading carries none.
	.journey__station-head {
		position: relative;
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		max-width: min(64rem, 92vw);
		margin: 0 auto 2.5rem;
		padding: 1.75rem 1.5rem 2rem;
		text-align: center;
	}

	// the reading matter stays in front of the world
	.journey__station-body {
		position: relative;
		z-index: 1;
	}

	// crossing a lit limb, the letters need holding off it from every side
	.journey__station-head :deep(.page-heading) {
		font-size: px8(4);
		@include pixel-keyline;
	}

	// The accent word carries its own text-shadow, and a child's replaces what it would
	// have inherited — so the yellow word needs the border stating again, with its glow
	// as the halo behind it.
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
		// A phone has room for one chip up there, and the way out is worth more than
		// the name — the rail's own HOME stop already anchors the top of the journey.
		.journey__mark {
			display: none;
		}

		// The stations run full-width here, so the chip rides straight over their copy.
		// Small and dim it covers a fraction of what it did and reads as a quiet label;
		// with no backing left it is the keyline that separates it from the prose behind.
		.journey__cta {
			padding: 0.45rem 0.65rem;
			font-size: px8(1);
			color: rgba($white, 0.62);
		}

		// the glyphs shrank, the tap target must not — grown past the chip the way the
		// rail grows its stops
		.journey__cta::after {
			content: '';
			position: absolute;
			inset: -0.55rem -0.6rem;
		}

		.journey__station--work {
			// tighter gutter for the smaller mobile badge
			--about-gutter: #{$about-gutter-mobile};
		}
	}
</style>
