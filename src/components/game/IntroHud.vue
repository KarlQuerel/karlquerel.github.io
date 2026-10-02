<template>
	<!-- The visor: a helmet's glass over the picture, flushed red in the crash. No text: the
	     picture stays the subject. -->
	<div class="hud" :class="{ 'hud--hot': hot }" aria-hidden="true">
		<div class="hud__visor" />
	</div>
</template>

<script setup>
	defineProps({
		// the crash: the glass flushes red
		hot: { type: Boolean, default: false },
	})
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;
	@use '@/styles/mixins' as *;

	.hud {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
	}

	// The glass: dark rounded corners where the helmet's frame closes in, two curved reflections
	// off the light, and a faint scan every few pixels. All gradients, no image.
	.hud__visor {
		position: absolute;
		inset: -8vh -5vw;
		border-radius: 42% 42% 46% 46% / 34% 34% 40% 40%;
		box-shadow:
			inset 0 0 8vh 1.5vh rgba($black, 0.75),
			inset 0 0 0 0.8vh rgba($black, 0.9);
		background:
			radial-gradient(ellipse 34% 18% at 22% 12%, rgba($white, 0.05), transparent 70%),
			radial-gradient(ellipse 40% 14% at 74% 90%, rgba($white, 0.035), transparent 70%),
			repeating-linear-gradient(180deg, rgba($black, 0.06) 0 1px, transparent 1px 5px);
	}

	.hud--hot .hud__visor {
		box-shadow:
			inset 0 0 8vh 1.5vh rgba($light-red, 0.5),
			inset 0 0 0 0.8vh rgba($black, 0.9);
	}

	@media (max-width: #{$breakpoint-mobile}) {
		// a tall frame: the glass bows wider than the screen, so only the corners darken
		.hud__visor {
			inset: -6vh -22vw;
			border-radius: 50% / 24%;
		}
	}
</style>
