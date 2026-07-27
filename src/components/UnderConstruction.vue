<template>
	<section class="uc">
		<h1 class="uc__name">{{ HOME_LANDING.name }}</h1>
		<p class="uc__label">{{ HOME_LANDING.label }}</p>
		<p class="uc__hint">
			<span aria-hidden="true">
				{{ HOME_LANDING.hintBefore }} <i class="uc__star" /> {{ HOME_LANDING.hintAfter }}
			</span>
			<span class="sr-only">{{ HOME_LANDING.hintSr }}</span>
		</p>
	</section>
</template>

<script setup>
	import { HOME_LANDING } from '../data/heroLines.js'

	defineOptions({ name: 'UnderConstruction' })
</script>

<style scoped lang="scss">
	.uc {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.3rem;
		padding: 1.5rem;
		text-align: center;
	}

	.uc__name {
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

	.uc__label {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(1.1rem, 4.5vw, 2.4rem);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85);
	}

	// subordinate nudge toward the menu star
	.uc__hint {
		margin: 0.4rem 0 0;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.7vw, 0.8rem);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	// inline echo of the NavToggle's 4-point star: base pixel + box-shadow arms/shoulders
	$sp: 2px;
	.uc__star {
		display: inline-block;
		width: $sp;
		height: $sp;
		margin: 0 0.85em;
		color: $yellow;
		background: currentColor;
		vertical-align: middle;
		box-shadow:
			0 #{$sp * -4},
			0 #{$sp * -3},
			0 #{$sp * -2},
			0 #{$sp * -1},
			0 #{$sp * 1},
			0 #{$sp * 2},
			0 #{$sp * 3},
			0 #{$sp * 4},
			#{$sp * -4} 0,
			#{$sp * -3} 0,
			#{$sp * -2} 0,
			#{$sp * -1} 0,
			#{$sp * 1} 0,
			#{$sp * 2} 0,
			#{$sp * 3} 0,
			#{$sp * 4} 0,
			#{$sp * -1} #{$sp * -1},
			#{$sp * 1} #{$sp * -1},
			#{$sp * -1} #{$sp * 1},
			#{$sp * 1} #{$sp * 1};
		filter: drop-shadow(0 0 5px rgba($yellow, 0.7));
	}
</style>
