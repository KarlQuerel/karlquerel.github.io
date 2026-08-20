<template>
	<!-- Holding screen for /game while the game itself is unfinished (GAME_READY). -->
	<div class="content holding">
		<PageTitle :lead="GAME_HOLDING.lead" :accent="GAME_HOLDING.accent" />
	</div>
</template>

<script setup>
	import { GAME_HOLDING } from '@/constants/game'
	import PageTitle from '../PageTitle.vue'
</script>

<style scoped lang="scss">
	.holding {
		padding: $page-pad-top 1rem 0;
	}
</style>
