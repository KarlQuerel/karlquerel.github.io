<template>
	<section class="home">
		<h1 class="home__name">{{ HOME_LANDING.name }}</h1>
		<p class="home__label">{{ HOME_LANDING.label }}</p>
		<p class="home__notice">{{ HOME_LANDING.notice }}</p>
	</section>
</template>

<script setup>
	import { HOME_LANDING } from '../data/heroLines.js'

	defineOptions({ name: 'HomeLanding' })
</script>

<style scoped lang="scss">
	.home {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.3rem;
		padding: 1.5rem;
		text-align: center;
	}

	.home__name {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(1.9rem, 7.5vw, 4rem);
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
		font-size: clamp(1.1rem, 4.5vw, 2.4rem);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85);
	}

	// subordinate build-status line
	.home__notice {
		margin: 0.4rem 0 0;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.7vw, 0.8rem);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}
</style>
