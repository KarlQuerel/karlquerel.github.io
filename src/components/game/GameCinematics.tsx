import React, { useRef, useEffect } from 'react'
import { useCinematicsTypewriter } from '../../hooks/game/useCinematicsTypewriter'
import { useCinematicsAudio } from '../../hooks/game/useCinematicsAudio'

interface GameCinematicsProps {
	onCinematicsComplete: () => void
	onAdvanceSequence: () => void
}

function GameCinematics({ onCinematicsComplete, onAdvanceSequence }: GameCinematicsProps): React.JSX.Element {
	const messageContainerRef = useRef<HTMLDivElement>(null)

	const {
		currentSequence,
		shouldFadeOut,
		showContinueButton,
		isFourthSequence,
		startSequence,
	} = useCinematicsTypewriter()

	const { initAudioPool, playTypingSound, stopAllAudio } = useCinematicsAudio()

	// Initialize audio pool on mount
	useEffect(() => {
		initAudioPool()
	}, [])

	// Start sequence on mount and when sequence changes
	useEffect(() => {
		if (messageContainerRef.current && !isFourthSequence) {
			const timer = setTimeout(() => {
				if (messageContainerRef.current) {
					startSequence([messageContainerRef.current], playTypingSound, stopAllAudio)
				}
			}, 100)

			return () => clearTimeout(timer)
		}
	}, [currentSequence, isFourthSequence, startSequence, playTypingSound, stopAllAudio])

	// Emit advance-sequence when sequence changes
	useEffect(() => {
		if (currentSequence > 0) {
			onAdvanceSequence()
		}
	}, [currentSequence, onAdvanceSequence])

	// Emit cinematics-complete when continue button shows
	useEffect(() => {
		if (showContinueButton) {
			onCinematicsComplete()
		}
	}, [showContinueButton, onCinematicsComplete])

	return (
		<div className="relative w-full h-full">
			<div
				className={`relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-8 transition-opacity duration-[1s] ease-out will-change-[opacity,transform] ${
					shouldFadeOut ? 'opacity-0 pointer-events-none' : ''
				}`}
			>
				{!isFourthSequence && (
					<div
						className="relative w-[90vw] left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow text-[1.5vw] drop-shadow-[0_0_10px_#000000] z-[1001] text-center uppercase will-change-[opacity,transform] contrast-[1.5] saturate-[1.5] min-h-8"
						ref={messageContainerRef}
					/>
				)}

				{isFourthSequence && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[1001]">
						<div className="game-cinematics-title relative -bottom-[25vh] text-[4.5rem] tracking-[0.5rem] drop-shadow-[0_0_10px_#000000] uppercase opacity-0 text-yellow">
							The <span className="game-menu-fading-text">Fading</span> Crown
						</div>
						<div className="relative -bottom-[20vh] flex flex-col items-center gap-8">
							<div className="game-cinematics-coming-soon text-[2.5rem] text-light-blue uppercase tracking-[0.25rem] opacity-0 drop-shadow-[0_0_30px_#000000]">
								Coming Soon
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default GameCinematics

