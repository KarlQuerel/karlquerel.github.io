<template>
	<div>
		<MobileWarning ref="mobileWarningRef" />
		<template v-if="!isMobile">
			<div style="overflow: hidden; height: 100vh">
				<PreGameScreen
					v-if="!showGame"
					:show-game="showGame"
					@start-game="handleStartGame"
				/>
				<div v-else class="game-container" ref="gameContainer">
					<GameBackground
						:show-cinematics="showCinematics"
						:should-move-background="shouldMoveBackground"
						:show-third-message-block="showThirdMessageBlock"
						:show-fourth-message-block="showFourthMessageBlock"
						:is-initial-load="isInitialLoad"
						:show-game="showGame"
						:is-first-sequence="isFirstSequence"
						:is-transitioning-to-cinematics="isTransitioningToCinematics"
					/>
					<div class="game-content">
						<GameMenu
							:show-cinematics="showCinematics"
							:menu-buttons-ready="menuButtonsReady"
							:is-transitioning-to-cinematics="isTransitioningToCinematics"
							@start-cinematics="handleStartCinematics"
							@show-credits="handleShowCredits"
						/>
						<GameCinematics v-if="showCinematics" @fade-complete="onFadeComplete" />
						<CreditsModal :is-visible="showCredits" @close="showCredits = false" />
					</div>
				</div>
			</div>
		</template>
	</div>
	<audio ref="bgMusic" loop>
		<source src="/assets/music/menu-wow.mp3" type="audio/mpeg" />
	</audio>
	<audio ref="clickSound">
		<source src="/assets/sound/button-press.wav" type="audio/mpeg" />
	</audio>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue'
	import MobileWarning from './MobileWarning.vue'
	import PreGameScreen from './PreGameScreen.vue'
	import GameMenu from './GameMenu.vue'
	import GameCinematics from './GameCinematics.vue'
	import CreditsModal from './CreditsModal.vue'
	import { useAudioManager } from '../../composables/game/useAudioManager'
	import { useGameState } from '../../composables/game/useGameState'
	import GameBackground from './GameBackground.vue'

	const showCredits = ref(false)
	const gameContainer = ref(null)
	const mobileWarningRef = ref(null)

	const { bgMusic, clickSound, initAudio, playBackgroundMusic, playClickSound } =
		useAudioManager()

	const {
		showGame,
		showCinematics,
		shouldMoveBackground,
		showThirdMessageBlock,
		showFourthMessageBlock,
		isInitialLoad,
		menuButtonsReady,
		isFirstSequence,
		isTransitioningToCinematics,
		startGame,
		launchCinematics,
		onFadeComplete,
		initializeMenu,
	} = useGameState()

	const handleStartGame = async () => {
		startGame()
		await playBackgroundMusic()
	}

	const handleStartCinematics = async () => {
		await launchCinematics(playClickSound)
	}

	const handleShowCredits = async () => {
		await playClickSound()
		showCredits.value = true
	}

	onMounted(() => {
		initAudio()
		initializeMenu()
	})

	const isMobile = computed(() => mobileWarningRef.value?.isMobile ?? false)
</script>

<style lang="scss" scoped>
	.game-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		border: none;
		box-shadow: none;
		overflow: hidden;
		overscroll-behavior: none;
		touch-action: none;
		margin: 0;
		padding: 0;
	}

	.game-content {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
</style>
