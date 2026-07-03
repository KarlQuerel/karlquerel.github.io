<template>
	<div class="life">
		<section v-reveal class="life-card reveal-block">
			<h2 class="life-card__title">ABOUT ME</h2>
			<p v-for="(line, i) in ABOUT_ME" :key="i" class="life-card__line">{{ line }}</p>
		</section>
	</div>
</template>

<script setup>
	import { ABOUT_ME } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.life {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: min(40rem, 94vw);
		margin: 0 auto;
		text-align: left;
	}

	.life-card {
		padding: 1rem 1.1rem 1.2rem;
		@include void-panel(rgba(0, 0, 0, 0.7));
	}

	.life-card__title {
		margin: 0 0 0.8rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 0.95rem);
		color: $yellow;
		text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6);
	}

	.life-card__line {
		margin: 0 0 0.6rem;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.6;
		text-align: left;
		color: rgba(255, 255, 255, 0.88);
	}

	.life-card__line:last-child {
		margin-bottom: 0;
	}

	.reveal-block {
		opacity: 0;
		transform: translateY(12px);
	}

	.reveal-block.is-visible {
		animation: life-in 0.4s steps(4, end) forwards;
	}

	@keyframes life-in {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal-block {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>
