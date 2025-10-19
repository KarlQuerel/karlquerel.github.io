import { ref, watch } from 'vue'

export function useGameState() {
	const showGame = ref(false)
	const showCinematics = ref(false)
	const isInitialLoad = ref(true)
	const menuButtonsReady = ref(false)
	const cinematicsComplete = ref(false)
	const isTransitioningToCinematics = ref(false) // Simple fade to black state

	const startGame = () => {
		showGame.value = true
	}

	const launchCinematics = async playClickSound => {
		await playClickSound()
		isTransitioningToCinematics.value = true

		// Simple fade to black, then start cinematics
		setTimeout(() => {
			showCinematics.value = true
			isTransitioningToCinematics.value = false
		}, 2000) // 2 second fade to black
	}

	const onCinematicsComplete = () => {
		cinematicsComplete.value = true
	}

	const continueToGame = () => {
		showCinematics.value = false
		cinematicsComplete.value = false
		showGame.value = true
	}

	const initializeMenu = () => {
		setTimeout(() => {
			isInitialLoad.value = false
			menuButtonsReady.value = true
		}, 12000) // Restored to original 12s to match the 10s background animation + 2s buffer
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
		isInitialLoad,
		menuButtonsReady,
		cinematicsComplete,
		isTransitioningToCinematics,
		startGame,
		launchCinematics,
		onCinematicsComplete,
		continueToGame,
		initializeMenu,
	}
}
