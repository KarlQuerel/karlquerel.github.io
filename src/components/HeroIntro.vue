<template>
	<section ref="trackRef" class="hero-track" :style="{ height: trackHeight }">
		<div class="hero-pin">
			<!-- Once the crawl has receded, continued scrolling engages the
			     lightspeed jump (blue/white streaks accelerating outward), which
			     then drops out in front of the planet you arrive at. -->
			<HyperspaceWarp :intensity="warpIntensity" />
			<PixelPlanet :reveal="planetReveal" />

			<!-- Scroll-driven perspective crawl. --crawl-progress (0 -> 1) drives the
			     deck's vertical travel and recession toward the vanishing point. -->
			<div class="hero-crawl" :style="crawlStyle" aria-hidden="true">
				<div class="hero-crawl__plane">
					<div ref="deckRef" class="hero-crawl__deck">
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
				<span class="hero-hint__label">{{ HERO_CRAWL.scrollHint }}</span>
				<span class="hero-hint__arrow" />
			</div>

			<!-- Lightspeed white-out: blooms as the jump drops out, then fades to
			     reveal the planet. -->
			<div class="hero-flash" :style="flashStyle" aria-hidden="true" />

			<div class="hero-crt" aria-hidden="true" />
		</div>
	</section>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { HERO_CRAWL } from '../data/heroLines.js'
	import { useScrollSections } from '../composables/useScrollSections.js'
	import HyperspaceWarp from './HyperspaceWarp.vue'
	import PixelPlanet from './PixelPlanet.vue'

	// Scroll progress at which the scroll hint has fully faded out — it dissolves
	// in step with the crawl rather than popping away.
	const HINT_FADE_END = 0.08

	// --- crawl runway (content-driven) ----------------------------------------
	// The deck enters one viewport below the fold, then recedes. The runway is
	// sized from the deck's real height so the crawl ALWAYS finishes before the
	// finale begins — long or short, the hyperspace jump only starts once the
	// last line has gone.
	const DECK_ENTER_VH = 100 // deck starts one viewport below the fold
	const CRAWL_EXIT_VH = 15 // extra travel so the last line is clearly gone
	const READ_SPEED = 0.83 // deck vh travelled per 1vh of scroll (reading pace)
	const FINALE_VH = 320 // scroll length of the hyperspace finale (cruise + arrival)

	// --- finale phases, as fractions of the post-crawl window -----------------
	const WARP_RAMP = 0.16 // reach full lightspeed by this fraction of the finale
	const WARP_HOLD = 0.66 // hold full speed until here, then drop out
	const FLASH_RISE = 0.6 // white-out starts rising
	const FLASH_PEAK = 0.82 // white-out fully white, then fades to the end

	const trackRef = ref(null)
	const deckRef = ref(null)
	const { progress } = useScrollSections(trackRef)

	// Deck height as a fraction of the viewport, measured live (re-wraps on
	// resize). Defaults to a sane value for the first paint before measurement.
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
	const totalScrollVh = computed(() => crawlScrollVh.value + FINALE_VH)
	const trackHeight = computed(() => `${totalScrollVh.value + 100}vh`)
	// Progress value at which the crawl has fully receded (finale begins here).
	const crawlEnd = computed(() => crawlScrollVh.value / totalScrollVh.value)
	// Map a fraction of the finale window onto absolute scroll progress.
	const phase = f => crawlEnd.value + f * (1 - crawlEnd.value)

	const crawlStyle = computed(() => ({
		'--crawl-progress': progress.value,
		// Deck travel per unit progress, so reading pace stays constant.
		'--crawl-travel': `${READ_SPEED * totalScrollVh.value}vh`,
	}))
	const hintStyle = computed(() => ({
		'--hint-opacity': Math.max(0, 1 - progress.value / HINT_FADE_END),
	}))

	const clamp01 = v => Math.min(1, Math.max(0, v))
	// Warp builds in, holds at full speed, then fades back out on arrival.
	const warpIntensity = computed(() => {
		const rampIn = clamp01(
			(progress.value - crawlEnd.value) / (phase(WARP_RAMP) - crawlEnd.value)
		)
		const rampOut = clamp01((progress.value - phase(WARP_HOLD)) / (1 - phase(WARP_HOLD)))
		return rampIn * (1 - rampOut)
	})
	// Planet grows in over the arrival window as the warp drops out.
	const planetReveal = computed(() =>
		clamp01((progress.value - phase(WARP_HOLD)) / (1 - phase(WARP_HOLD)))
	)
	// Triangular white-out: quick rise to the peak, slower fade so it lingers.
	const flashStyle = computed(() => {
		const p = progress.value
		const rise = phase(FLASH_RISE)
		const peak = phase(FLASH_PEAK)
		const opacity =
			p <= peak ? clamp01((p - rise) / (peak - rise)) : clamp01(1 - (p - peak) / (1 - peak))
		return { opacity }
	})

	onMounted(() => {
		measureDeck()
		window.addEventListener('resize', measureDeck, { passive: true })
		if (typeof ResizeObserver !== 'undefined' && deckRef.value) {
			resizeObserver = new ResizeObserver(measureDeck)
			resizeObserver.observe(deckRef.value)
		}
	})
	onBeforeUnmount(() => {
		window.removeEventListener('resize', measureDeck)
		if (resizeObserver) resizeObserver.disconnect()
	})
</script>

<style scoped lang="scss">
	.hero-track {
		position: relative;
		width: 100%;
	}

	.hero-pin {
		position: sticky;
		top: var(--site-chrome-bar-height);
		min-height: calc(100vh - var(--site-chrome-bar-height));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		padding: 1.5rem;
		overflow: hidden;
	}

	// Perspective stage for the crawl. The viewer looks "up" the tilted deck
	// (perspective-origin near the top) so the text narrows toward a vanishing
	// point and recedes into the distance.
	.hero-crawl {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		perspective: 360px;
		perspective-origin: 50% 0%;
		// Dissolve the deck into the vanishing point at the top and feather the
		// bottom edge where it enters.
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

	.hero-crawl__deck {
		position: absolute;
		left: 50%;
		top: 0;
		width: min(90%, 42rem);
		// Travels from just below the stage up past the vanishing point as the
		// visitor scrolls.
		transform: translateX(-50%)
			translateY(calc(100vh - var(--crawl-progress, 0) * var(--crawl-travel, 250vh)));
		// Keep the deck on its own GPU layer so scroll-driven travel only
		// recomposites instead of re-rasterizing the text every frame.
		will-change: transform;
		color: $yellow;
		text-align: justify;
		text-transform: uppercase;
		// Match the rest of the site: chunky Press Start 2P pixel font, scaled
		// down and given more line breathing room since its glyphs are far wider
		// and taller than the terminal font this deck used to carry.
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 1.2rem);
		line-height: 1.8;
	}

	// The global `p, h1` rule (src/styles/_layout.scss) sets white directly on
	// these elements, which beats the deck's inherited color. Re-assert
	// inheritance so the crawl reads as the intended yellow.
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

	// Scroll prompt pinned to the lower edge, above the crawl backdrop but under
	// the CRT overlay so it lives behind the same scanlines.
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
		// Driven by scroll progress (set in JS) so the hint fades as the crawl
		// begins to move; purely decorative, so it never intercepts input.
		opacity: var(--hint-opacity, 1);
		pointer-events: none;
	}

	.hero-hint__label {
		font-family: $font-pixel;
		font-size: clamp(1.1rem, 4.5vw, 2.4rem);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-align: center;
	}

	// Downward arrow drawn as pixel art: this base pixel is the top-centre of a
	// 5x3 filled triangle, with box-shadow copies fanning out symmetrically left
	// and right so the shape stays centred on its own box (and thus in the
	// column) while keeping stepped, pixel edges.
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

	// Lightspeed white-out. Opacity is scroll-driven (set in JS); a near-white
	// core with a cyan fringe sells the burst out of hyperspace. Sits above the
	// warp and planet but under the CRT, and never intercepts input.
	.hero-flash {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		background: radial-gradient(circle at 50% 50%, $white 0%, $white 45%, $light-blue 115%);
	}

	// CRT overlay: scanlines (matching the terminal window) + a soft tube vignette
	// under a faint stepped flicker. Sits above everything, never intercepts input.
	.hero-crt {
		position: absolute;
		inset: 0;
		z-index: 3;
		pointer-events: none;
		animation: heroCrtFlicker 3.2s steps(8, end) infinite;
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

	@keyframes heroCrtFlicker {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.92;
		}
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
		.hero-hint__arrow,
		.hero-crt {
			animation: none;
		}

		// Drop the tilt so the crawl reads as plain, comfortable scrolling text.
		.hero-crawl {
			perspective: none;
		}

		.hero-crawl__plane {
			transform: none;
		}

		// Skip the bright white-out for motion-sensitive visitors.
		.hero-flash {
			display: none;
		}
	}
</style>
