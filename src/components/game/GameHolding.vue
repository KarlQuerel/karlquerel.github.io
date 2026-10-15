<template>
	<!-- /under-construction, where /game lands until GAME_SHIPPED: the name plating itself up, then the
	     ship's status typed under it. -->
	<div class="content holding">
		<HomeChip />
		<h1 class="sr-only">{{ GAME_WORDMARK.text }}</h1>
		<!-- the name and its line lean together with the cursor -->
		<div class="holding__scene" :class="{ 'holding__scene--built': built }" :style="leanStyle">
			<PlatingWordmark @built="built = true" />
			<TypedReadout :line="GAME_HOLDING.readout" :start="built" />
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { GAME_HOLDING, GAME_WORDMARK } from '@/constants/game'
	import HomeChip from '../HomeChip.vue'
	import PlatingWordmark from './PlatingWordmark.vue'
	import TypedReadout from './TypedReadout.vue'

	const built = ref(false)
	const { parallaxStyle } = usePointerParallax()
	const { px, ms } = GAME_HOLDING.float
	const leanStyle = computed(() => ({
		...parallaxStyle.value,
		'--depth': GAME_HOLDING.depth,
		'--float-px': `${px}px`,
		'--float-ms': `${ms}ms`,
	}))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.holding {
		padding: 0 1rem;
	}

	.holding__scene {
		display: flex;
		flex-direction: column;
		align-items: center;
		@include lean;
	}

	// continuous on purpose: world-space drift, not a self-running blink
	.holding__scene--built {
		animation: holding-float var(--float-ms) ease-in-out infinite;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}

	@keyframes holding-float {
		50% {
			transform: translateY(calc(-1 * var(--float-px)));
		}
	}
</style>
