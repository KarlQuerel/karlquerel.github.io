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
			// prettier-ignore
			className={`relative z-10 flex h-screen w-screen flex-col items-center justify-center text-center transition-opacity duration-[2s] ease-in-out ${
				isTransitioningToCinematics ? 'opacity-0' : ''
			}`}
		>
			<div className="relative -right-[17.5vw] z-10 flex flex-col items-start gap-[5vw]">
				<h1
					// prettier-ignore
					className={`game-menu-title relative z-10 w-full text-left text-6xl font-bold uppercase tracking-[15px] text-yellow opacity-0 drop-shadow-[5px_5px_5px_#000000] md:text-[2.5rem] md:tracking-[10px]`}
				>
					The
					<br />
					<span className="game-menu-fading-text">Fading</span>
					<br />
					Crown
				</h1>
				<div
					// prettier-ignore
					className={`game-menu-buttons opacity-1 relative z-10 flex w-[60%] flex-col gap-4 md:w-[180px]`}
				>
					<button
						className="btn-pixel-primary md:px-6 md:py-[0.4rem] md:text-xl"
						onClick={() => handleButtonClick('start-cinematics')}
						disabled={!menuButtonsReady}
					>
						Start Game
					</button>
					<button
						className="btn-pixel-primary md:px-6 md:py-[0.4rem] md:text-xl"
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
