<template>
	<section ref="trackRef" class="hero-track" :style="{ height: trackHeight }">
		<div class="hero-pin">
			<!-- Scroll-driven perspective crawl. --crawl-progress (0 -> 1) drives the
			     deck's vertical travel and recession toward the vanishing point. -->
			<div class="hero-crawl" :style="crawlStyle" aria-hidden="true">
				<div class="hero-crawl__plane">
					<div class="hero-crawl__deck">
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

			<!-- Nudge to start scrolling; retires itself once the crawl moves. -->
			<div
				class="hero-hint"
				:class="{ 'hero-hint--hidden': progress > HINT_HIDE_PROGRESS }"
				aria-hidden="true"
			>
				<span class="hero-hint__label">{{ HERO_CRAWL.scrollHint }}</span>
				<span class="hero-hint__arrow" />
			</div>

			<div class="hero-crt" aria-hidden="true" />
		</div>
	</section>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { HERO_CRAWL } from '../data/heroLines.js'
	import { useScrollSections } from '../composables/useScrollSections.js'

	// Number of scroll "stops" the runway is divided into — sets the length of
	// the scroll runway.
	const PROGRESS_STOPS = 3

	// Retire the scroll hint as soon as the crawl has visibly started moving.
	const HINT_HIDE_PROGRESS = 0.02

	const trackRef = ref(null)
	const { progress } = useScrollSections(trackRef)

	// One viewport of scroll per stop, plus a trailing viewport so the crawl has
	// room to recede fully before the track ends.
	const trackHeight = `${(PROGRESS_STOPS + 1) * 100}vh`

	const crawlStyle = computed(() => ({ '--crawl-progress': progress.value }))
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
		transform: translateX(-50%) translateY(calc(100vh - var(--crawl-progress, 0) * 250vh));
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

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
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

	.hero-hint--hidden {
		visibility: hidden;
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
	}
</style>
