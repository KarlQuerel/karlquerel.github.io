<template>
	<div class="game">
		<CrashIntro v-if="!introDone" @done="introDone = true" />
		<!-- keyed so every scene change replays the fade-in -->
		<GameScene v-else :key="sceneId" :scene="scene" @choose="choose" />
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { GAME_SCENES, START_SCENE } from '@/data/gameScenes.js'
	import CrashIntro from './CrashIntro.vue'
	import GameScene from './GameScene.vue'

	defineOptions({ name: 'GamePage' })

	// motion-sensitive visitors skip the cinematic and wake straight in the wreck
	const introDone = ref(prefersReducedMotion())
	const router = useRouter()

	const sceneId = ref(START_SCENE)
	const scene = computed(() => GAME_SCENES[sceneId.value])

	function choose(option) {
		if (option.route) {
			router.push(option.route)
			return
		}
		sceneId.value = option.to
	}
</script>

<style scoped lang="scss">
	.game {
		position: relative;
		width: min(100%, 72rem);
		height: 100%;
	}
</style>
