<template>
	<!-- The title screen: the Earth from orbit on one art canvas, the plated name over it. A key strips the
	     name, then the game goes aboard HERMES-8. -->
	<div class="title" :class="{ 'title--flat': !supported }">
		<canvas ref="canvas" class="title__canvas" aria-hidden="true" />
		<BootCover :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />
		<IntroTitle :up="up" @done="aboard" />
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useTitleScreen } from '@/composables/useTitleScreen'
	import BootCover from '@/components/BootCover.vue'
	import IntroTitle from './IntroTitle.vue'
	import { GAME_START } from '@/constants/game/scenes'

	const canvas = ref(null)
	const { supported, booting, bootProgress, bootCeiling, up } = useTitleScreen(canvas)

	// the three.js scene the title hands over to, by its param
	const router = useRouter()
	const aboard = () => router.replace({ query: { [GAME_START]: null } })
</script>

<style scoped lang="scss">
	.title {
		position: fixed;
		inset: 0;
		background: $black;
		overflow: hidden;
	}

	// sized by the renderer: whole device pixels per art pixel, which 100vw cannot promise
	.title__canvas {
		position: fixed;
		display: block;
		image-rendering: pixelated;
	}

	.title--flat .title__canvas {
		display: none;
	}
</style>
