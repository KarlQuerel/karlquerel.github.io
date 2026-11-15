<template>
	<!-- The game. Dev server only: a build redirects, and the async import below is what keeps
	     every scene out of the bundle until GAME_SHIPPED. -->
	<div class="content">
		<component :is="GamePilot" v-if="GamePilot" :scene="pilotScene" />
		<component :is="GameIntro" v-else-if="GameIntro" />
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
	// dev only: a three.js scene in the intro's place, opened by its param (`?pilot`, `?sky`)
	const pilotScene =
		import.meta.env.DEV &&
		SCENE_MENU.three.scenes.find(s => new URLSearchParams(window.location.search).has(s.param))
			?.param
	const GamePilot =
		import.meta.env.DEV && pilotScene
			? defineAsyncComponent(() => import('./GamePilot.vue'))
			: null
</script>
