<template>
	<!-- The game. Dev server only: a build redirects, and the async import below is what keeps
	     every scene out of the bundle until GAME_SHIPPED. -->
	<div class="content">
		<component :is="GamePilot ?? GameIntro" v-if="GameIntro" />
		<HomeChip />
		<component :is="GameScenes" v-if="GameScenes" />
	</div>
</template>

<script setup>
	import { defineAsyncComponent } from 'vue'
	import HomeChip from '../HomeChip.vue'
	import { SCENE_MENU } from '@/constants/intro/timeline'

	// folds to null in a production build, so the import (and everything under it) is dropped
	const GameIntro =
		import.meta.env.GAME_SHIPPED || import.meta.env.DEV
			? defineAsyncComponent(() => import('./GameIntro.vue'))
			: null
	// dev only, even once the game ships: it imports every shot
	const GameScenes = import.meta.env.DEV
		? defineAsyncComponent(() => import('./GameScenes.vue'))
		: null
	// dev only: `?pilot` opens the three.js corridor pilot in the intro's place
	const GamePilot =
		import.meta.env.DEV &&
		new URLSearchParams(window.location.search).has(SCENE_MENU.pilot.param)
			? defineAsyncComponent(() => import('./GamePilot.vue'))
			: null
</script>
