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
				<div
					v-else
					class="game-container"
					ref="gameContainer"
					:class="{
						'fade-to-black': showCinematics && !shouldMoveBackground,
						'second-message-block': shouldMoveBackground && !showThirdMessageBlock,
						'third-message-block': showThirdMessageBlock && !showFourthMessageBlock,
						'fourth-message-block': showFourthMessageBlock,
						'initial-load': isInitialLoad,
						'show-game': showGame,
					}"
				>
					<GameMenu
						:show-cinematics="showCinematics"
						:menu-buttons-ready="menuButtonsReady"
						@start-cinematics="handleStartCinematics"
						@show-credits="handleShowCredits"
					/>
					<GameCinematics v-if="showCinematics" @fade-complete="onFadeComplete" />
					<CreditsModal :is-visible="showCredits" @close="showCredits = false" />
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
	import GameCinematics from './gameCinematics.vue'
	import CreditsModal from './CreditsModal.vue'
	import { useAudioManager } from '../composables/useAudioManager'
	import { useGameState } from '../composables/useGameState'

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
		if (gameContainer.value) {
			gameContainer.value.classList.add('fade-to-black')
		}
	}

	const handleShowCredits = async () => {
		await playClickSound()
		showCredits.value = true
	}

	onMounted(() => {
		initAudio()
		initializeMenu()
	})

	// Computed property to access isMobile from MobileWarning component
	const isMobile = computed(() => mobileWarningRef.value?.isMobile ?? false)
</script>

<style lang="scss" scoped>
	.game-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: $black;
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
		transition: all 1s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url('/assets/game/menu-background.gif');
			background-size: 210% auto;
			background-position: 0% 85%;
			opacity: 0;
			transition:
				background-position 4s ease-in-out,
				background-size 4s ease-in-out,
				opacity 2s ease-in-out;
		}

		&.initial-load::before {
			animation: initialFadeIn 10s ease-in forwards;
		}

		&.show-game::before {
			opacity: 1;
		}

		&.fade-to-black::before {
			background-position: 0% 0%;
			opacity: 0;
			transition:
				background-position 3s ease-in-out,
				background-size 3s ease-in-out,
				opacity 3s ease-in-out;
		}

		&.first-message-block::before {
			background-size: 210% auto;
			background-position: 0% 85%;
			transition:
				background-position 4s ease-in-out,
				background-size 4s ease-in-out;
		}

		&.second-message-block::before {
			background-size: 225% auto;
			background-position: 100% 65%;
			transition:
				background-position 4s ease-in-out,
				background-size 4s ease-in-out;
		}

		&.third-message-block::before {
			background-size: 175% auto;
			background-position: 100% 50%;
			transition:
				background-position 4s ease-in-out,
				background-size 4s ease-in-out;
		}

		&.fourth-message-block::before {
			background-size: 100% 100%;
			background-position: 0% 0%;
			transition:
				background-position 7s ease-in-out,
				background-size 7s ease-in-out;
		}
	}

	@keyframes initialFadeIn {
		from {
			opacity: 0;
			background-size: 210% auto;
			background-position: 0% 0%;
		}
		to {
			opacity: 1;
			background-size: 210% auto;
			background-position: 0% 85%;
		}
	}
</style>
