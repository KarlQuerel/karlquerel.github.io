<template>
	<!-- One declarative line per shot, typed in over the picture and held until the cut. -->
	<p class="card" :class="{ 'card--visor': visor }" aria-live="polite">
		<span class="card__text">{{ text.slice(0, shown) }}</span
		><span v-if="text && shown < text.length" class="card__cursor" aria-hidden="true">_</span>
	</p>
</template>

<script setup>
	import { watch } from 'vue'
	import { useTypewriter } from '@/composables/useTypewriter'
	import { INTRO_CARD } from '@/constants/intro/timeline'

	const props = defineProps({
		// '' between cards
		text: { type: String, required: true },
		// under the visor the card reads high, clear of the hands
		visor: { type: Boolean, default: false },
	})

	const { shown, start } = useTypewriter({ delayMs: 0, charMs: INTRO_CARD.charMs })
	watch(
		() => props.text,
		text => start(text.length),
		{ immediate: true }
	)
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.card {
		position: fixed;
		left: 50%;
		bottom: 16vh;
		z-index: 3;
		width: min(44rem, 88vw);
		margin: 0;
		transform: translateX(-50%);
		font-family: $font-pixel;
		font-size: $type-title;
		line-height: 2;
		letter-spacing: 1px;
		color: $flyby-ink;
		pointer-events: none;
		@include flyby-shadow(3px);
	}

	.card--visor {
		top: 27vh;
		bottom: auto;
	}

	.card__cursor {
		color: $flyby-hot;
		animation: card-blink 1s step-end infinite;
	}

	@keyframes card-blink {
		50% {
			opacity: 0;
		}
	}

	@media (min-width: #{$breakpoint-desktop}) {
		.card {
			font-size: $heading-pixel-size-lg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card__cursor {
			animation: none;
		}
	}
</style>
