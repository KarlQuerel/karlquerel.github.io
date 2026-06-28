<template>
	<div v-if="isMobile" class="mobile-message">
		<div class="mobile-content">
			<h2>Not available on mobile devices</h2>
			<p>
				Please use a <span class="highlight">desktop computer</span> for the best experience
			</p>
		</div>
	</div>
</template>

<script setup>
	import { useIsMobile } from '../../composables/game/useIsMobile'

	const { isMobile } = useIsMobile()
</script>

<style lang="scss" scoped>
	// Fill the area between the top chrome (dog header + navbar) and the bottom
	// footer, so the warning never overlaps the navbar or clips the dog strip.
	.mobile-message {
		position: fixed;
		top: calc(var(--site-header-height) + var(--site-chrome-bar-height));
		bottom: var(--site-chrome-bar-height);
		left: 0;
		right: 0;
		background: $black;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: $z-game-overlay;
	}

	.mobile-content {
		text-align: center;
		padding: 2rem;
		background: rgba(0, 0, 0, 0.9);
		border-radius: 15px;
		border: 3px solid $light-gray;
		max-width: 80%;

		h2 {
			color: $yellow;
			font-size: 1.75rem;
			margin-bottom: 1rem;
			text-shadow: 0 0 10px $yellow;
		}

		p {
			color: $white;
			font-size: 1.5rem;
			text-shadow: 0 0 5px $yellow;
			margin: 0 0 0 0;
		}
	}

	.highlight {
		color: $yellow;
		font-weight: bold;
	}
</style>
