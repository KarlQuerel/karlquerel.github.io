<template>
	<div class="scene">
		<!-- stage = future pixel-art slot; until then the location label sets the shot -->
		<div class="scene__stage">
			<p class="scene__location">{{ scene.location }}</p>
			<div class="scene__crt" aria-hidden="true" />
		</div>

		<div class="scene__panel">
			<p v-for="(line, i) in scene.text" :key="i" class="scene__line">{{ line }}</p>
			<div class="scene__options">
				<button
					v-for="(option, i) in scene.options"
					:key="i"
					class="scene__option"
					type="button"
					@click="emit('choose', option)"
				>
					{{ option.label }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		// One entry of GAME_SCENES: { location, text[], options[] }.
		scene: { type: Object, required: true },
	})

	const emit = defineEmits(['choose'])
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.scene {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		animation: sceneFadeIn 0.5s steps(6, end);
	}

	.scene__stage {
		@include void-panel;
		position: relative;
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		// stand-in shot: red emergency wash over the void until real art lands
		background:
			radial-gradient(ellipse at 50% 120%, rgba($light-red, 0.14) 0%, transparent 60%),
			rgba($black, 0.5);
	}

	.scene__location {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2vw, 1rem);
		letter-spacing: 0.2em;
		color: $text-interactive;
	}

	.scene__crt {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: repeating-linear-gradient(
			to bottom,
			rgba($black, 0.18) 0,
			rgba($black, 0.18) 1px,
			transparent 1px,
			transparent 3px
		);
	}

	.scene__panel {
		@include void-panel;
		flex-shrink: 0;
		padding: 1.4rem;
		text-align: left;
	}

	.scene__line {
		margin: 0 0 0.9em;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.4vw, 0.75rem);
		line-height: 1.9;
		color: $white;
		text-align: left;
	}

	.scene__options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 0.4rem;
	}

	.scene__option {
		padding: 0.8rem 1.2rem;
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.3vw, 0.7rem);
		letter-spacing: 0.08em;
		text-align: left;
		// last: the mixin emits nested states, so trailing declarations would warn
		@include void-button($lift: -2px);
	}

	@keyframes sceneFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scene {
			animation: none;
		}
	}
</style>
