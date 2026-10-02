<template>
	<!-- The game. Dev server only: a build redirects, and the async import below is what keeps
	     every scene out of the bundle until GAME_SHIPPED. -->
	<div class="content">
		<component :is="GameIntro" v-if="GameIntro" />
		<HomeChip />
	</div>
</template>

<script setup>
	import { defineAsyncComponent } from 'vue'
	import HomeChip from '../HomeChip.vue'

	// folds to null in a production build, so the import (and everything under it) is dropped
	const GameIntro =
		import.meta.env.GAME_SHIPPED || import.meta.env.DEV
			? defineAsyncComponent(() => import('./GameIntro.vue'))
			: null
</script>
