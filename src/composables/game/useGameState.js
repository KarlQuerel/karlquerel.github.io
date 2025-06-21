import { ref, watch } from 'vue'

export function useGameState() {
	const showGame = ref(false)
	const showCinematics = ref(false)
	const shouldMoveBackground = ref(false)
	const showThirdMessageBlock = ref(false)
	const showFourthMessageBlock = ref(false)
	const isInitialLoad = ref(true)
	const menuButtonsReady = ref(false)
	const isFirstSequence = ref(true)
	const isTransitioningToCinematics = ref(false)

	const startGame = () => {
		showGame.value = true
	}

	const launchCinematics = async playClickSound => {
		await playClickSound()
		isTransitioningToCinematics.value = true

		setTimeout(() => {
			showCinematics.value = true
			isFirstSequence.value = true
			isTransitioningToCinematics.value = false
		}, 2000)
	}

	const onFadeComplete = () => {
		if (showCinematics.value && !shouldMoveBackground.value && isFirstSequence.value) {
			isFirstSequence.value = false
			shouldMoveBackground.value = true
		} else if (
			showCinematics.value &&
			shouldMoveBackground.value &&
			!showThirdMessageBlock.value
		) {
			showThirdMessageBlock.value = true
		} else if (
			showCinematics.value &&
			showThirdMessageBlock.value &&
			!showFourthMessageBlock.value
		) {
			showFourthMessageBlock.value = true
		} else if (showCinematics.value && showFourthMessageBlock.value) {
			showCinematics.value = false
			shouldMoveBackground.value = false
			showThirdMessageBlock.value = false
			showFourthMessageBlock.value = false
			isFirstSequence.value = true
			showGame.value = true
		}
	}

	const initializeMenu = () => {
		setTimeout(() => {
			isInitialLoad.value = false
			menuButtonsReady.value = true
		}, 12000)
	}

	// Watch for showGame changes to manage body overflow
	watch(showGame, newValue => {
		if (newValue) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	})

	return {
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
	}
}
