<template>
	<section class="home">
		<h1 class="home__name">{{ HOME_LANDING.name }}</h1>
		<p class="home__label">{{ HOME_LANDING.label }}</p>
		<p class="home__notice">{{ HOME_LANDING.notice }}</p>
	</section>
</template>

<script setup>
	import { HOME_LANDING } from '../data/heroLines.js'
</script>

<style scoped lang="scss">
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.3rem;
		padding: 1.5rem;
		text-align: center;
	}

	.home__name {
		margin: 0;
		font-family: $font-pixel;
		font-size: px8(4);
		line-height: 1.3;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: $white;
		text-shadow:
			0 2px 12px rgba(0, 0, 0, 0.85),
			0 0 28px rgba($yellow, 0.3);
	}

	.home__label {
		margin: 0;
		font-family: $font-pixel;
		font-size: px8(2);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85);
	}

	// subordinate build-status line
	.home__notice {
		margin: 0.4rem 0 0;
		font-family: $font-pixel;
		font-size: px8(1);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}
	// a hero should dominate on a big screen; whole steps, so it stays on-pixel
	@media (min-width: #{$breakpoint-desktop}) {
		.home__name {
			font-size: px8(8);
		}

		.home__label {
			font-size: px8(5);
		}
	}
</style>
