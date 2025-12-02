import React, { useState, useRef, useEffect } from 'react'
import MobileWarning from './MobileWarning'
import LoadingScreen from './LoadingScreen'
import PreGameScreen from './PreGameScreen'
import GameBackground from './GameBackground'
import GameMenu from './GameMenu'
import GameCinematics from './GameCinematics'
import CreditsModal from './CreditsModal'
import { useAudioManager } from '../../hooks/game/useAudioManager'
import { useGameState } from '../../hooks/game/useGameState'
import { useAssetPreloader } from '../../hooks/game/useAssetPreloader'
import { useMobileDetection } from '../../hooks/useMobileDetection'

function Game(): React.JSX.Element {
	const [showCredits, setShowCredits] = useState<boolean>(false)
	const [currentSequence, setCurrentSequence] = useState<number>(0)
	const gameContainerRef = useRef<HTMLDivElement>(null)

	const {
		bgMusic: bgMusicRef,
		clickSound: clickSoundRef,
		initAudio,
		playBackgroundMusic,
		playClickSound,
	} = useAudioManager()

	const {
		showGame,
		showCinematics,
		isInitialLoad,
		menuButtonsReady,
		isTransitioningToCinematics,
		startGame,
		launchCinematics,
		onCinematicsComplete,
		initializeMenu,
	} = useGameState()

	const {
		isLoading,
		loadingProgress,
		totalAssets,
		loadedAssets,
		preloadAssets,
		isPreloadingComplete,
	} = useAssetPreloader()

	const handleStartGame = async (): Promise<void> => {
		startGame()
		await playBackgroundMusic()
	}

	const handleStartCinematics = async (): Promise<void> => {
		await launchCinematics(playClickSound)
	}

	const handleShowCredits = async (): Promise<void> => {
		await playClickSound()
		setShowCredits(true)
	}

	const handleAdvanceSequence = (): void => {
		setCurrentSequence(prev => prev + 1)
	}

	const isMobile = useMobileDetection()

	// Initialize on mount
	useEffect(() => {
		async function initialize(): Promise<void> {
			// Start preloading assets first
			await preloadAssets()

			// Only initialize audio and menu after assets are loaded
			if (isPreloadingComplete()) {
				initAudio()
				initializeMenu()
			} else {
				// If preloading didn't complete, still initialize after a delay
				setTimeout(() => {
					initAudio()
					initializeMenu()
				}, 1000)
			}
		}
		initialize()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isMobile) {
		return <MobileWarning />
	}

	return (
		<div>
			<LoadingScreen
				isLoading={isLoading}
				loadingProgress={loadingProgress}
				loadedAssets={loadedAssets}
				totalAssets={totalAssets}
			/>

			{!isLoading && (
				<div className="h-screen overflow-hidden">
					{!showGame && (
						<PreGameScreen showGame={showGame} onStartGame={handleStartGame} />
					)}

					{showGame && (
						<div
							// prettier-ignore
							className={`fixed left-0 top-0 z-[1000] m-0 flex h-screen w-screen touch-none items-center justify-center overflow-hidden overscroll-none border-none p-0 shadow-none`}
							ref={gameContainerRef}
						>
							<GameBackground
								showCinematics={showCinematics}
								isInitialLoad={isInitialLoad}
								showGame={showGame}
								currentSequence={currentSequence}
								isTransitioningToCinematics={isTransitioningToCinematics}
							/>
							<div className="relative z-10 h-full w-full">
								<GameMenu
									showCinematics={showCinematics}
									menuButtonsReady={menuButtonsReady}
									isTransitioningToCinematics={isTransitioningToCinematics}
									onStartCinematics={handleStartCinematics}
									onShowCredits={handleShowCredits}
								/>
								{showCinematics && (
									<GameCinematics
										onCinematicsComplete={onCinematicsComplete}
										onAdvanceSequence={handleAdvanceSequence}
									/>
								)}
								<CreditsModal
									isVisible={showCredits}
									onClose={() => setShowCredits(false)}
								/>
							</div>
						</div>
					)}
				</div>
			)}

			<audio ref={bgMusicRef} loop>
				<source src="/assets/music/menu-wow.mp3" type="audio/mpeg" />
			</audio>
			<audio ref={clickSoundRef}>
				<source src="/assets/sound/button-press.wav" type="audio/mpeg" />
			</audio>
		</div>
	)
}

export default Game
