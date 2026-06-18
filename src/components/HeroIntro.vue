<template>
	<section ref="trackRef" class="hero-track" :style="{ height: trackHeight }">
		<div class="hero-pin">
			<div class="hero-stage">
				<div v-if="activeSection.layout === 'split'" class="hero-headline">
					<HeroFlapLine
						class="hero-headline__lead"
						:line="activeSection.lead"
						align="left"
					/>
					<HeroFlapLine
						class="hero-headline__name"
						:line="activeSection.name"
						align="right"
					/>
				</div>
				<HeroFlapLine
					v-else
					class="hero-centered"
					:line="activeSection.line"
					align="center"
				/>
			</div>

			<div class="hero-progress" aria-hidden="true">
				<span
					v-for="n in SECTION_COUNT"
					:key="n"
					class="hero-dot"
					:class="{ 'hero-dot--active': n - 1 === activeIndex }"
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
	import { HERO_SECTIONS } from '../data/heroLines.js'
	import { useScrollSections } from '../composables/useScrollSections.js'
	import HeroFlapLine from './HeroFlapLine.vue'

	const SECTION_COUNT = HERO_SECTIONS.length

	const trackRef = ref(null)
	const { activeIndex } = useScrollSections(trackRef, SECTION_COUNT)

	// One viewport of scroll per section, plus a trailing viewport so the last line
	// holds for a full screen before the track ends.
	const trackHeight = `${(SECTION_COUNT + 1) * 100}vh`

	const activeSection = computed(() => HERO_SECTIONS[activeIndex.value] ?? HERO_SECTIONS[0])
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

	.hero-stage {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-centered {
		max-width: 22ch;
	}

	// The landing headline spreads two blocks diagonally across a tall canvas:
	// "Hello there" anchored upper-left, "I am KARL QUEREL" vertically centered on
	// the right (auto margins absorb the free space below the lead).
	.hero-headline {
		width: 100%;
		min-height: 55vh;
		// Inset both edges so the left/right blocks sit nearer the centre while
		// staying left- and right-aligned.
		padding-inline: 12%;
		display: flex;
		flex-direction: column;
	}

	.hero-headline__lead {
		align-self: flex-start;
		max-width: 70%;
	}

	.hero-headline__name {
		align-self: flex-end;
		margin: auto 0;
		max-width: 80%;
	}

	.hero-progress {
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

	@media (max-width: $breakpoint-mobile) {
		.hero-pin {
			gap: 1.8rem;
		}

		.hero-centered {
			max-width: 16ch;
		}

		.hero-headline {
			padding-inline: 6%;
		}

		.hero-headline__lead,
		.hero-headline__name {
			max-width: 90%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-hint-arrow {
			animation: none;
		}
	}
</style>
