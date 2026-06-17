<template>
	<section ref="trackRef" class="hero-track" :style="{ height: trackHeight }">
		<div class="hero-pin">
			<p :key="activeIndex" class="hero-line">
				<span
					v-for="(segment, i) in activeLine"
					:key="i"
					:class="['hero-segment', { 'hero-accent': segment.accent }]"
					>{{ segment.text }}</span
				>
				<span class="hero-cursor" aria-hidden="true">_</span>
			</p>

			<div class="hero-progress" aria-hidden="true">
				<span
					v-for="(line, i) in HERO_LINES"
					:key="i"
					class="hero-dot"
					:class="{ 'hero-dot--active': i === activeIndex }"
				/>
			</div>

			<div
				class="hero-hint"
				:class="{ 'hero-hint--hidden': activeIndex !== 0 }"
				aria-hidden="true"
			>
				<span class="hero-hint-label">SCROLL</span>
				<span class="hero-hint-arrow">v</span>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { HERO_LINES } from '../data/heroLines.js'
	import { useScrollSections } from '../composables/useScrollSections.js'

	const trackRef = ref(null)
	const { activeIndex } = useScrollSections(trackRef, HERO_LINES.length)

	// One viewport of scroll per line, plus a trailing viewport so the last line
	// holds before the page flows into the pixel-reveal section below.
	const trackHeight = `${(HERO_LINES.length + 1) * 100}vh`

	const activeLine = computed(() => HERO_LINES[activeIndex.value] ?? [])
</script>

<style scoped lang="scss">
	@use '../styles/variables';

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
		text-align: center;
		overflow: hidden;
	}

	.hero-line {
		margin: 0;
		max-width: 22ch;
		font-size: clamp(1.4rem, 4.5vw, 3rem);
		line-height: 1.4;
		letter-spacing: -0.01em;
		color: variables.$white;
		// Stepped glitch reveal — replays on each swap via :key="activeIndex".
		animation: heroLineIn 0.32s steps(4, end) both;
	}

	.hero-segment {
		display: inline;
	}

	.hero-accent {
		font-family: 'Press Start 2P', ui-monospace, monospace;
		color: variables.$retro-green;
		// Slightly smaller because Press Start 2P runs visually larger than the body font.
		font-size: 0.82em;
		text-shadow:
			0 0 6px rgba(0, 255, 0, 0.65),
			0 0 14px rgba(0, 255, 0, 0.35);
	}

	.hero-cursor {
		display: inline-block;
		margin-left: 0.15em;
		color: variables.$retro-green;
		animation: heroCursorBlink 1s steps(2, jump-none) infinite;
	}

	.hero-progress {
		display: flex;
		gap: 0.85rem;
	}

	.hero-dot {
		width: 0.7rem;
		height: 0.7rem;
		background: rgba(255, 255, 255, 0.25);
		box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.6);
		transition: none;
	}

	.hero-dot--active {
		background: variables.$retro-green;
		box-shadow:
			inset 0 0 0 2px rgba(0, 0, 0, 0.6),
			0 0 8px rgba(0, 255, 0, 0.7);
	}

	.hero-hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		font-family: 'Press Start 2P', ui-monospace, monospace;
		font-size: clamp(0.5rem, 1.3vw, 0.62rem);
		letter-spacing: 0.18em;
		color: rgba(255, 255, 255, 0.75);
	}

	.hero-hint--hidden {
		visibility: hidden;
	}

	.hero-hint-arrow {
		animation: heroHintBob 1s steps(3, end) infinite;
	}

	@keyframes heroLineIn {
		0% {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
		100% {
			opacity: 1;
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes heroCursorBlink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
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

	@media (max-width: 640px) {
		.hero-line {
			max-width: 16ch;
		}

		.hero-pin {
			gap: 1.8rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-line,
		.hero-cursor,
		.hero-hint-arrow {
			animation: none;
		}
	}
</style>
