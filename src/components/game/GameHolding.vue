<template>
	<!-- /under-construction, where /game lands until GAME_SHIPPED: the plated name held still over the
	     Earth, the ship's status typed under it. -->
	<div class="content holding" :style="parallaxStyle">
		<HomeChip :class="{ 'holding__chip--wait': !shown }" />
		<SoundChip :class="{ 'holding__chip--wait': !shown }" />
		<h1 class="sr-only">{{ GAME_WORDMARK.text }}</h1>
		<!-- the entrance: the world rises, then the name rises and fades in, then the status types -->
		<HoldingEarth @risen="risen = true" />
		<!-- the name and its line lean together with the cursor, the nearest layer -->
		<div
			class="holding__card"
			:class="{ 'holding__card--in': risen }"
			:style="cardStyle"
			@transitionend.self="onTitleIn"
		>
			<!-- mounted on the rise: its glint repaints the canvas, which would cost the rise frames -->
			<PlatingWordmark v-if="risen" :build="false" :cell-max="GAME_HOLDING.title.cellMax" />
			<TypedReadout :line="GAME_HOLDING.readout" :start="shown" pixel />
		</div>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { GAME_HOLDING, GAME_WORDMARK } from '@/constants/game'
	import HomeChip from '../HomeChip.vue'
	import HoldingEarth from './HoldingEarth.vue'
	import PlatingWordmark from './PlatingWordmark.vue'
	import SoundChip from './SoundChip.vue'
	import TypedReadout from './TypedReadout.vue'

	const { parallaxStyle } = usePointerParallax()
	const { title: T } = GAME_HOLDING.rise
	const cardStyle = {
		'--depth': GAME_HOLDING.title.depth,
		'--title-ms': `${T.ms}ms`,
		'--title-from': `${T.from * 100}vh`,
	}
	const risen = ref(false)
	// the name is in place: the status types, the way home shows
	const shown = ref(false)
	const onTitleIn = event => {
		if (event.propertyName === 'transform') shown.value = true
	}
	// no transition runs under reduced motion, so nothing would end one
	watch(risen, on => on && prefersReducedMotion() && (shown.value = true))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// lifted off centre, so the limb has the foot of the frame to itself
	.holding {
		padding: 0 1rem 14vh;
	}

	.holding__card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		opacity: 0;
		transform: translateY(var(--title-from));
		transition:
			opacity var(--title-ms) linear,
			transform var(--title-ms) $ease-settle;
		@include lean;
	}

	.holding__card--in {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.holding__card {
			transition: none;
		}
	}

	// the corner chips appear with the name, in two steps
	.home-chip,
	.sound-chip {
		transition: opacity 0.3s steps(2, end);
	}

	.holding__chip--wait {
		opacity: 0;
	}
</style>
