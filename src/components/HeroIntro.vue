<template>
	<section ref="trackRef" class="hero-track" :style="{ height: trackHeight }">
		<div class="hero-pin">
			<!-- --crawl-progress (0 → 1) drives the deck's travel toward the vanishing point -->
			<div
				class="hero-crawl"
				:class="{ 'hero-crawl--flat': !crawlActive }"
				:style="crawlStyle"
				aria-hidden="true"
			>
				<div class="hero-crawl__plane">
					<div ref="deckRef" class="hero-crawl__deck" :style="deckStyle">
						<p class="hero-crawl__episode">{{ HERO_CRAWL.episode }}</p>
						<h1 class="hero-crawl__title">{{ HERO_CRAWL.title }}</h1>
						<p
							v-for="(paragraph, i) in HERO_CRAWL.paragraphs"
							:key="i"
							class="hero-crawl__paragraph"
						>
							{{ paragraph }}
						</p>
					</div>
				</div>
			</div>

			<!-- Accessible plain-text version of the crawl for assistive tech. -->
			<div class="sr-only">
				<h1>{{ HERO_CRAWL.title }}</h1>
				<p v-for="(paragraph, i) in HERO_CRAWL.paragraphs" :key="i">{{ paragraph }}</p>
			</div>

			<!-- Nudge to start scrolling; fades out in step with the crawl. -->
			<div class="hero-hint" :style="hintStyle" aria-hidden="true">
				<span class="hero-hint__name">{{ HERO_CRAWL.name }}</span>
				<span class="hero-hint__label">{{ HERO_CRAWL.scrollHint }}</span>
				<span class="hero-hint__arrow" />
			</div>

			<!-- Departure beat: the ship pulls away from a dying Earth. -->
			<ShipLaunch v-if="launchVisible" :t="launchT" />

			<!-- Pod beat: inside the cryo pod while the lid (the mask below) seals. -->
			<CryoPod v-if="podVisible" :t="podT" />

			<!-- Wake beat: the HUD sits behind the eyelid overlay, sharpening as the eyes open. -->
			<div v-if="hudVisible" class="hero-hud" :style="hudStyle">
				<ShipHud @launch="launchGame" />
			</div>

			<!-- Lid and eyelids in one: a black sheet whose elliptical aperture seals
			     shut for the sleep, then blinks open onto the HUD. -->
			<div class="hero-dark" :style="darkStyle" aria-hidden="true" />

			<!-- centuries pass in the dark; the scroll fade wraps the CSS flicker -->
			<p class="hero-days" :style="daysStyle" aria-hidden="true">
				<span class="hero-days__text">{{ HERO_WAKE.dayCounter }}</span>
			</p>

			<div class="hero-crt" aria-hidden="true" />

			<button v-show="skipVisible" class="hero-skip" type="button" @click="skipToWake">
				{{ HERO_WAKE.skip }}
			</button>
		</div>
	</section>
</template>

<script setup>
	import { computed, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { HERO_CRAWL, HERO_WAKE } from '../data/heroLines.js'
	import { useScrollSections } from '../composables/useScrollSections.js'
	import ShipHud from './ShipHud.vue'
	import ShipLaunch from './ShipLaunch.vue'
	import CryoPod from './CryoPod.vue'

	// named so App.vue's <KeepAlive> reuses this heavy component's build
	defineOptions({ name: 'HeroIntro' })

	// progress at which the scroll hint has fully faded — it dissolves with the crawl
	const HINT_FADE_END = 0.08

	// runway sized from the deck's real height so the crawl always finishes before the wake
	const DECK_ENTER_VH = 160 // deck starts well below the fold — a lead-in of empty scroll before the crawl rises into view
	const CRAWL_EXIT_VH = 15 // extra travel so the last line is clearly gone
	const READ_SPEED = 0.83 // deck vh travelled per 1vh of scroll (reading pace)
	const WAKE_VH = 520 // scroll length of the wake story (launch, pod, sleep, eyes, HUD hold)

	// beat boundaries as fractions of the wake window
	const LAUNCH_END = 0.3 // the ship has left Earth behind
	const POD_END = 0.46 // cryo lid fully sealed
	const EYES_START = 0.64 // eyelids crack open (the sleep gap shows the day counter)
	const EYES_END = 0.88 // fully awake; the rest is the HUD hold

	// Aperture keyframes over the eyes window: crack open, droop shut, then wake.
	const EYE_BLINK = [
		[0, 0],
		[0.34, 0.32],
		[0.5, 0.08],
		[1, 1],
	]

	const trackRef = ref(null)
	const deckRef = ref(null)
	const router = useRouter()
	const { progress, sync } = useScrollSections(trackRef)

	// deck height as a viewport fraction, measured live; sane default before first measure
	const deckHeightVh = ref(160)
	let resizeObserver = null
	const measureDeck = () => {
		const el = deckRef.value
		if (el) deckHeightVh.value = (el.offsetHeight / window.innerHeight) * 100
	}

	// Scroll needed for the deck to travel from entry to fully receded.
	const crawlScrollVh = computed(
		() => (DECK_ENTER_VH + deckHeightVh.value + CRAWL_EXIT_VH) / READ_SPEED
	)
	const totalScrollVh = computed(() => crawlScrollVh.value + WAKE_VH)
	const trackHeight = computed(() => `${totalScrollVh.value + 100}vh`)
	// Progress value at which the crawl has fully receded (the wake begins here).
	const crawlEnd = computed(() => crawlScrollVh.value / totalScrollVh.value)
	// Map a fraction of the wake window onto absolute scroll progress.
	const phase = f => crawlEnd.value + f * (1 - crawlEnd.value)

	const crawlStyle = computed(() => ({
		'--crawl-progress': progress.value,
		// Where the deck sits at progress 0 — its lead-in offset below the fold.
		'--crawl-enter': `${DECK_ENTER_VH}vh`,
		// Deck travel per unit progress, so reading pace stays constant.
		'--crawl-travel': `${READ_SPEED * totalScrollVh.value}vh`,
	}))
	const hintStyle = computed(() => ({
		'--hint-opacity': Math.max(0, 1 - progress.value / HINT_FADE_END),
	}))

	// at rest the promoted 3D layers still recomposite every idle frame — flatten until scroll
	const crawlActive = computed(() => progress.value > 0)
	const deckStyle = computed(() => ({
		willChange: crawlActive.value ? 'transform' : 'auto',
	}))

	const clamp01 = v => Math.min(1, Math.max(0, v))
	const smooth = t => t * t * (3 - 2 * t)

	// Aperture of the shared black sheet (1 open → 0 sealed): stays open through
	// the launch, seals as the cryo lid, holds shut for the sleep, then blinks
	// awake through the EYE_BLINK keyframes.
	const eyeAperture = computed(() => {
		const p = progress.value
		if (p <= phase(LAUNCH_END)) return 1
		if (p <= phase(POD_END)) {
			// the cryo lid: the eyes mask, run in reverse
			return 1 - smooth((p - phase(LAUNCH_END)) / (phase(POD_END) - phase(LAUNCH_END)))
		}
		if (p <= phase(EYES_START)) return 0
		const t = clamp01((p - phase(EYES_START)) / (phase(EYES_END) - phase(EYES_START)))
		for (let i = 1; i < EYE_BLINK.length; i++) {
			const [t1, v1] = EYE_BLINK[i]
			if (t <= t1) {
				const [t0, v0] = EYE_BLINK[i - 1]
				return v0 + (v1 - v0) * smooth((t - t0) / (t1 - t0))
			}
		}
		return 1
	})

	// The black sheet: lid and eyelids in one, carved by the aperture mask.
	const darkStyle = computed(() => {
		const a = eyeAperture.value
		const w = (Math.max(a, 0.001) * 130).toFixed(1)
		const h = (Math.max(a, 0.001) * 85).toFixed(1)
		// mask alpha only — #000 = lid kept, transparent = lid cut away
		const mask = `radial-gradient(ellipse ${w}vmax ${h}vmax at 50% 46%, transparent 0 74%, #000 100%)`
		return {
			// fully open: drop the sheet from the compositor
			display: a < 1 ? null : 'none',
			maskImage: mask,
			WebkitMaskImage: mask,
		}
	})

	// Launch beat lives between the crawl's end and the pod; scrubbed by scroll.
	const launchVisible = computed(
		() => progress.value > crawlEnd.value && progress.value < phase(LAUNCH_END)
	)
	const launchT = computed(() =>
		clamp01((progress.value - crawlEnd.value) / (phase(LAUNCH_END) - crawlEnd.value))
	)

	// Pod beat runs while the lid seals; once shut the sheet covers everything.
	const podVisible = computed(
		() => progress.value >= phase(LAUNCH_END) && progress.value < phase(POD_END)
	)
	const podT = computed(() =>
		clamp01((progress.value - phase(LAUNCH_END)) / (phase(POD_END) - phase(LAUNCH_END)))
	)

	// Day counter over the sealed stretch, fading at both edges of the sleep.
	const daysStyle = computed(() => {
		const t = clamp01((progress.value - phase(POD_END)) / (phase(EYES_START) - phase(POD_END)))
		return {
			opacity: Math.min(clamp01(t / 0.25), clamp01((1 - t) / 0.25)),
			display: t > 0 && t < 1 ? null : 'none',
		}
	})

	// Mount the HUD only once the lid is fully shut, so it never pops in raw.
	const hudVisible = computed(() => progress.value >= phase(POD_END))
	const hudStyle = computed(() => ({
		// waking focus: blur and slight zoom resolve as the aperture opens
		'--hud-blur': `${((1 - eyeAperture.value) * 8).toFixed(2)}px`,
		'--hud-scale': (1.06 - 0.06 * eyeAperture.value).toFixed(4),
	}))

	const skipVisible = computed(() => progress.value > 0.01 && eyeAperture.value < 1)
	function skipToWake() {
		const track = trackRef.value
		if (!track) return
		window.scrollTo(0, track.offsetTop + track.offsetHeight - window.innerHeight)
	}

	function launchGame() {
		router.push('/game')
	}

	// Warm the game chunk while the visitor is still reading, so RESPOND is instant.
	let gamePreloaded = false
	watch(progress, p => {
		if (!gamePreloaded && p > crawlEnd.value * 0.8) {
			gamePreloaded = true
			import('./game/GamePage.vue')
		}
	})

	onMounted(() => {
		measureDeck()
		window.addEventListener('resize', measureDeck, { passive: true })
		if (typeof ResizeObserver !== 'undefined' && deckRef.value) {
			resizeObserver = new ResizeObserver(measureDeck)
			resizeObserver.observe(deckRef.value)
		}
	})
	// re-shown from KeepAlive: scroll/measure state can be stale, so re-sync before paint
	onActivated(() => {
		window.scrollTo(0, 0)
		measureDeck()
		sync()
	})

	onBeforeUnmount(() => {
		window.removeEventListener('resize', measureDeck)
		if (resizeObserver) resizeObserver.disconnect()
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.hero-track {
		position: relative;
		width: 100%;
	}

	.hero-pin {
		position: sticky;
		// full-bleed pin so the wake beat runs behind the transparent navbar (links stay at z 40)
		top: 0;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		padding: 1.5rem;
		overflow: hidden;
	}

	// the viewer looks "up" the tilted deck, so text recedes toward a vanishing point
	.hero-crawl {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		perspective: 360px;
		perspective-origin: 50% 0%;
		// dissolve into the vanishing point up top; feather the entry edge below
		mask-image: linear-gradient(
			to top,
			transparent 0%,
			$black 14%,
			$black 52%,
			transparent 94%
		);
		-webkit-mask-image: linear-gradient(
			to top,
			transparent 0%,
			$black 14%,
			$black 52%,
			transparent 94%
		);
	}

	.hero-crawl__plane {
		position: absolute;
		inset: 0;
		transform: rotateX(32deg);
		transform-origin: 50% 100%;
	}

	// idle: crawl sits below the fold, so flatten and drop the 3D layer; crawlActive restores it
	.hero-crawl--flat {
		perspective: none;
	}

	.hero-crawl--flat .hero-crawl__plane {
		transform: none;
	}

	.hero-crawl__deck {
		position: absolute;
		left: 50%;
		top: 0;
		width: min(90%, 42rem);
		// travels from below the stage up past the vanishing point as the visitor scrolls
		transform: translateX(-50%)
			translateY(
				calc(
					var(--crawl-enter, 100vh) - var(--crawl-progress, 0) *
						var(--crawl-travel, 250vh)
				)
			);
		// GPU promotion is applied via deckStyle only while the crawl moves, never at idle
		color: $yellow;
		text-align: justify;
		text-transform: uppercase;
		// Press Start 2P runs wide and tall — scale down with extra line breathing room
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 1.2rem);
		line-height: 1.8;
	}

	// re-assert inheritance: the global p/h1 white (_layout.scss) beats the deck's yellow
	.hero-crawl__episode,
	.hero-crawl__title,
	.hero-crawl__paragraph {
		color: inherit;
	}

	.hero-crawl__episode {
		margin: 0 0 0.4em;
		text-align: center;
		font-family: $font-pixel;
		font-size: 0.42em;
		letter-spacing: 0.3em;
	}

	.hero-crawl__title {
		margin: 0 0 1em;
		text-align: center;
		font-family: $font-pixel;
		font-size: 0.7em;
		line-height: 1.4;
	}

	.hero-crawl__paragraph {
		margin: 0 0 1em;
	}

	// pinned to the lower edge, above the crawl but under the CRT scanlines
	.hero-hint {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		z-index: 2;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.4rem;
		padding: 0 1rem;
		color: $yellow;
		// scroll-driven fade (set in JS); decorative, never intercepts input
		opacity: var(--hint-opacity, 1);
		pointer-events: none;
	}

	.hero-hint__name {
		font-family: $font-pixel;
		font-size: clamp(1.9rem, 7.5vw, 4rem);
		line-height: 1.3;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-align: center;
		color: $white;
		text-shadow:
			0 2px 12px rgba(0, 0, 0, 0.85),
			0 0 28px rgba($yellow, 0.3);
	}

	.hero-hint__label {
		font-family: $font-pixel;
		font-size: clamp(1.1rem, 4.5vw, 2.4rem);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-align: center;
	}

	// pixel-art arrow: this base pixel is the top-centre; box-shadow copies fan out a 5x3 triangle
	$arrow-pixel: 9px;
	.hero-hint__arrow {
		width: $arrow-pixel;
		height: $arrow-pixel;
		background: currentColor;
		box-shadow:
			#{$arrow-pixel * -2} 0,
			#{$arrow-pixel * -1} 0,
			#{$arrow-pixel} 0,
			#{$arrow-pixel * 2} 0,
			#{$arrow-pixel * -1} #{$arrow-pixel},
			0 #{$arrow-pixel},
			#{$arrow-pixel} #{$arrow-pixel},
			0 #{$arrow-pixel * 2};
		animation: heroHintBob 1s steps(3, end) infinite;
	}

	@keyframes heroHintBob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(0.35rem);
		}
	}

	// the HUD layer the eyes open onto; blur/scale resolve via scroll-driven props
	.hero-hud {
		position: absolute;
		inset: 0;
		z-index: 2;
		filter: blur(var(--hud-blur, 0));
		transform: scale(var(--hud-scale, 1));
	}

	// blackout sheet + eyelids; the JS mask carves the growing aperture out of it
	.hero-dark {
		position: absolute;
		inset: 0;
		z-index: 3;
		background: $black;
		pointer-events: none;
	}

	// the timeskip readout, flickering over the sealed lid, under the CRT scanlines
	.hero-days {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 4;
		transform: translate(-50%, -50%);
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.8rem, 2.6vw, 1.4rem);
		letter-spacing: 0.22em;
		color: $light-blue;
		text-shadow: 0 0 16px rgba($light-blue, 0.4);
		white-space: nowrap;
		pointer-events: none;
	}

	.hero-days__text {
		animation: heroDaysFlicker 0.9s steps(3, end) infinite;
	}

	@keyframes heroDaysFlicker {
		0%,
		100% {
			opacity: 1;
		}
		40% {
			opacity: 0.45;
		}
		60% {
			opacity: 0.85;
		}
	}

	// CRT scanlines + tube vignette; translateZ keeps it on its own layer so it rasterises once
	.hero-crt {
		position: absolute;
		inset: 0;
		z-index: 4;
		pointer-events: none;
		transform: translateZ(0);
	}

	.hero-crt::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			to bottom,
			rgba($black, 0.18) 0,
			rgba($black, 0.18) 1px,
			transparent 1px,
			transparent 3px
		);
	}

	.hero-crt::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 55%, rgba($black, 0.45) 100%);
	}

	.hero-skip {
		position: absolute;
		right: 1.5rem;
		bottom: 1.5rem;
		z-index: 5;
		padding: 0.7rem 1.1rem;
		font-family: $font-pixel;
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		// last: the mixin emits nested states, so trailing declarations would warn
		@include void-button($lift: -2px);
	}

	@media (max-width: $breakpoint-mobile) {
		.hero-pin {
			gap: 1.8rem;
		}

		.hero-crawl__deck {
			width: 94%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-hint__arrow {
			animation: none;
		}

		// Drop the tilt so the crawl reads as plain, comfortable scrolling text.
		.hero-crawl {
			perspective: none;
		}

		.hero-crawl__plane {
			transform: none;
		}

		// The aperture stays scroll-scrubbed (user-driven), but skip the focus zoom.
		.hero-hud {
			filter: none;
			transform: none;
		}

		.hero-days__text {
			animation: none;
		}
	}
</style>
