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

			<div class="hero-progress" aria-hidden="true">
				<span
					v-for="n in PROGRESS_STOPS"
					:key="n"
					class="hero-dot"
					:class="{ 'hero-dot--active': n - 1 === activeIndex }"
				/>
			</div>

			<div
				class="hero-hint"
				:class="{ 'hero-hint--hidden': progress > 0.02 }"
				aria-hidden="true"
			>
				<span class="hero-hint-label">SCROLL</span>
				<span class="hero-hint-arrow">v</span>
			</div>

			<div class="hero-crt" aria-hidden="true" />
		</div>
	</section>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { HERO_CRAWL } from '../data/heroLines.js'
	import { useScrollSections } from '../composables/useScrollSections.js'

	// Number of scroll "stops" the runway is divided into — drives both the
	// progress dots and the length of the scroll runway.
	const PROGRESS_STOPS = 3

	const trackRef = ref(null)
	const { activeIndex, progress } = useScrollSections(trackRef, PROGRESS_STOPS)

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
		color: $yellow;
		text-align: justify;
		text-shadow:
			0 0 8px rgba($yellow, 0.45),
			0 0 18px rgba($yellow, 0.25);
		font-family: $font-terminal;
		font-size: clamp(1.3rem, 4vw, 2.6rem);
		line-height: 1.45;
	}

	.hero-crawl__episode {
		margin: 0 0 0.4em;
		text-align: center;
		font-family: $font-pixel;
		font-size: 0.42em;
		letter-spacing: 0.3em;
		color: $white;
	}

	.hero-crawl__title {
		margin: 0 0 1em;
		text-align: center;
		font-family: $font-pixel;
		font-size: 0.7em;
		line-height: 1.4;
		text-shadow:
			0 0 8px rgba($yellow, 0.6),
			0 0 18px rgba($yellow, 0.35);
	}

	.hero-crawl__paragraph {
		margin: 0 0 1em;
	}

	// Content layers ride above the shared space backdrop and below the CRT
	// overlay (z-index 3) painted at the edges of .hero-pin.
	.hero-progress,
	.hero-hint {
		position: relative;
		z-index: 2;
	}

	// Pin the dots and hint to the lower edge so the crawl owns the centre.
	.hero-progress {
		position: absolute;
		bottom: 4.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.85rem;
	}

	.hero-dot {
		width: 0.7rem;
		height: 0.7rem;
		background: rgba($white, 0.25);
		box-shadow: inset 0 0 0 2px rgba($black, 0.6);
		transition: none;
	}

	.hero-dot--active {
		background: $yellow;
		box-shadow:
			inset 0 0 0 2px rgba($black, 0.6),
			0 0 8px rgba($yellow, 0.7);
	}

	.hero-hint {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.3vw, 0.62rem);
		letter-spacing: 0.18em;
		color: rgba($white, 0.75);
	}

	.hero-hint--hidden {
		visibility: hidden;
	}

	.hero-hint-arrow {
		animation: heroHintBob 1s steps(3, end) infinite;
	}

	@keyframes heroHintBob {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(0.35rem);
		}
		100% {
			transform: translateY(0);
		}
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
		.hero-hint-arrow,
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
