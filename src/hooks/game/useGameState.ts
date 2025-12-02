import { useState, useEffect } from 'react'

interface UseGameStateReturn {
	showGame: boolean
	showCinematics: boolean
	isInitialLoad: boolean
	menuButtonsReady: boolean
	cinematicsComplete: boolean
	isTransitioningToCinematics: boolean
	startGame: () => void
	launchCinematics: (playClickSound: () => Promise<void>) => Promise<void>
	onCinematicsComplete: () => void
	continueToGame: () => void
	initializeMenu: () => void
}

export function useGameState(): UseGameStateReturn {
	const [showGame, setShowGame] = useState<boolean>(false)
	const [showCinematics, setShowCinematics] = useState<boolean>(false)
	const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
	const [menuButtonsReady, setMenuButtonsReady] = useState<boolean>(false)
	const [cinematicsComplete, setCinematicsComplete] = useState<boolean>(false)
	const [isTransitioningToCinematics, setIsTransitioningToCinematics] = useState<boolean>(false)

	const startGame = (): void => {
		setShowGame(true)
	}

	const launchCinematics = async (playClickSound: () => Promise<void>): Promise<void> => {
		await playClickSound()
		setIsTransitioningToCinematics(true)

		// Simple fade to black, then start cinematics
		setTimeout(() => {
			setShowCinematics(true)
			setIsTransitioningToCinematics(false)
		}, 2000) // 2 second fade to black
	}

	const onCinematicsComplete = (): void => {
		setCinematicsComplete(true)
	}

	const continueToGame = (): void => {
		setShowCinematics(false)
		setCinematicsComplete(false)
		setShowGame(true)
	}

	const initializeMenu = (): void => {
		setTimeout(() => {
			setIsInitialLoad(false)
			setMenuButtonsReady(true)
		}, 12000) // Restored to original 12s to match the 10s background animation + 2s buffer
	}

	// Watch for showGame changes to manage body overflow
	useEffect(() => {
		if (showGame) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [showGame])

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

