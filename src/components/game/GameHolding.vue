<template>
	<!-- Holding screen for /game while the game itself is unfinished (GAME_READY). -->
	<div class="content holding">
		<PageTitle :lead="GAME_HOLDING.lead" :accent="GAME_HOLDING.accent" />
		<p class="holding__body">{{ GAME_HOLDING.body }}</p>
		<RouterLink class="holding__back" to="/">{{ GAME_HOLDING.back }}</RouterLink>
	</div>
</template>

<script setup>
	import { RouterLink } from 'vue-router'
	import { GAME_HOLDING } from '@/constants/game'
	import PageTitle from '../PageTitle.vue'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.holding {
		gap: 2rem;
		padding: $page-pad-top 1rem 0;
	}

	.holding__body {
		margin: 0;
		font-family: $font-terminal;
		color: $light-gray;
	}

	.holding__back {
		@include void-button;

		& {
			padding: 0.9rem 1.4rem;
			font-family: $font-pixel;
			font-size: px8(2);
			letter-spacing: 1px;
			text-transform: uppercase;
			text-decoration: none;
		}
	}
</style>
