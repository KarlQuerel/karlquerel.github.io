<template>
	<!-- Fixed chrome: the name is gone from ~17% of the scroll, and contact was ten screens away. -->
	<div class="chrome">
		<button
			class="chrome__mark"
			:class="{ on: markOn }"
			:inert="!markOn"
			type="button"
			@click="toTop"
		>
			Karl Querel
		</button>
		<button class="chrome__link" type="button" @click="toEnd">CONTACT</button>
	</div>

	<!-- Flight instrument, and the only thing that says the page is ten screens long -->
	<p class="hud" :style="hudStyle" aria-hidden="true">{{ leg }}</p>
</template>

<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		markOn: { type: Boolean, required: true },
		leg: { type: String, required: true },
		// the instrument comes up with the engines
		wake: { type: Number, required: true },
	})

	const hudStyle = computed(() => ({ opacity: props.wake }))

	// Straight to the arrival: the scroll ease flies the whole path, so the shortcut is also the tour.
	const toEnd = () => window.scrollTo(0, document.documentElement.scrollHeight)
	const toTop = () => window.scrollTo(0, 0)
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;
	@use '@/styles/mixins' as *;

	.chrome {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 5;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 20px 6vw;
		font-size: 8px;
		line-height: 1.8;
		pointer-events: none;
	}

	.chrome__mark,
	.chrome__link {
		pointer-events: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: $flyby-dim;
		text-decoration: none;
		@include cursor-interactive;
		@include flyby-shadow;
		transition: color 0.1s steps(2);

		&:hover,
		&:focus-visible {
			color: $flyby-hot;
			outline: none;
		}
	}

	// Bottom left, opposite the readout, and raised only once the title has gone past.
	.chrome__mark {
		position: fixed;
		left: 6vw;
		bottom: 5vh;
		opacity: 0;
		transition:
			opacity 0.25s steps(3),
			color 0.1s steps(2);

		&.on {
			opacity: 1;
		}
	}

	.hud {
		position: fixed;
		right: 6vw;
		bottom: 5vh;
		z-index: 5;
		margin: 0;
		font-size: 8px;
		line-height: 2;
		text-align: left;
		color: $flyby-dim;
		white-space: pre;
		@include flyby-shadow;
		pointer-events: none;
	}

	@media (max-width: $flyby-narrow) {
		.chrome,
		.hud {
			font-size: 7px;
		}
		.chrome__mark,
		.hud {
			bottom: 3vh;
		}
	}
</style>
