<template>
	<!-- The game: the title screen, or a three.js scene by its param. Dev server only: a build redirects, and the
	     async imports below are what keep every scene out of the bundle until GAME_SHIPPED. -->
	<div class="content">
		<component :is="GamePilot" v-if="scene" :key="scene" :scene="scene" />
		<component :is="GameTitle" v-else-if="GameTitle" />
		<HomeChip />
		<component :is="GameScenes" v-if="GameScenes" />
	</div>
</template>

<script setup>
	import { computed, defineAsyncComponent } from 'vue'
	import { useRoute } from 'vue-router'
	import HomeChip from '../HomeChip.vue'
	import { GAME_SCENES } from '@/constants/game/scenes'

	// folds to false in a production build, so the imports (and everything under them) are dropped
	const playable = import.meta.env.GAME_SHIPPED || import.meta.env.DEV
	const GameTitle = playable ? defineAsyncComponent(() => import('./GameTitle.vue')) : null
	const GamePilot = playable ? defineAsyncComponent(() => import('./GamePilot.vue')) : null
	// dev only, even once the game ships
	const GameScenes = import.meta.env.DEV
		? defineAsyncComponent(() => import('./GameScenes.vue'))
		: null

	const route = useRoute()
	const scene = computed(
		() => GamePilot && GAME_SCENES.find(({ param }) => param in route.query)?.param
	)
</script>
