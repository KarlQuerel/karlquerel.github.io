import React from 'react'
import { useAudioManager } from '../../hooks/game/useAudioManager'

interface GameMenuProps {
	showCinematics: boolean
	menuButtonsReady: boolean
	isTransitioningToCinematics: boolean
	onStartCinematics: () => void
	onShowCredits: () => void
}

function GameMenu({
	showCinematics,
	menuButtonsReady,
	isTransitioningToCinematics,
	onStartCinematics,
	onShowCredits,
}: GameMenuProps): React.JSX.Element | null {
	const { playClickSound } = useAudioManager()

	const handleButtonClick = async (event: string): Promise<void> => {
		await playClickSound()

		// When starting cinematics, dispatch custom event to hide navbar
		if (event === 'start-cinematics') {
			window.dispatchEvent(new CustomEvent('hide-navbar'))
		}

		if (event === 'start-cinematics') {
			onStartCinematics()
		} else if (event === 'show-credits') {
			onShowCredits()
		}
	}

	if (showCinematics) return null

	return (
		<div
			className={`text-center flex flex-col items-center justify-center h-screen w-screen relative z-10 transition-opacity duration-[2s] ease-in-out ${
				isTransitioningToCinematics ? 'opacity-0' : ''
			}`}
		>
			<div className="flex flex-col items-start gap-[5vw] relative -right-[17.5vw] z-10">
				<h1 className="game-menu-title text-6xl text-yellow opacity-0 tracking-[15px] uppercase drop-shadow-[5px_5px_5px_#000000] w-full font-bold text-left relative z-10 md:text-[2.5rem] md:tracking-[10px]">
					The
					<br />
					<span className="game-menu-fading-text">Fading</span>
					<br />
					Crown
				</h1>
				<div className="game-menu-buttons flex flex-col gap-4 opacity-1 w-[60%] relative z-10 md:w-[180px]">
					<button
						className="text-xl w-full text-yellow bg-black/70 border-3 border-yellow transition-all duration-300 ease-in-out uppercase relative overflow-hidden rounded-[10px] hover:bg-yellow hover:text-black hover:scale-110 disabled:opacity-100 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none active:scale-95 disabled:hover:bg-black/70 disabled:hover:text-yellow disabled:hover:scale-100 md:text-xl md:py-[0.4rem] md:px-6"
						onClick={() => handleButtonClick('start-cinematics')}
						disabled={!menuButtonsReady}
					>
						Start Game
					</button>
					<button
						className="text-xl w-full text-yellow bg-black/70 border-3 border-yellow transition-all duration-300 ease-in-out uppercase relative overflow-hidden rounded-[10px] hover:bg-yellow hover:text-black hover:scale-110 disabled:opacity-100 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none active:scale-95 disabled:hover:bg-black/70 disabled:hover:text-yellow disabled:hover:scale-100 md:text-xl md:py-[0.4rem] md:px-6"
						onClick={() => handleButtonClick('show-credits')}
						disabled={!menuButtonsReady}
					>
						Credits
					</button>
				</div>
			</div>
		</div>
	)
}

export default GameMenu

