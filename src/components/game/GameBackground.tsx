import React from 'react'

interface GameBackgroundProps {
	showCinematics: boolean
	isInitialLoad: boolean
	showGame: boolean
	isTransitioningToCinematics: boolean
	currentSequence: number
}

function GameBackground({
	showCinematics,
	isInitialLoad,
	showGame,
	isTransitioningToCinematics,
	currentSequence,
}: GameBackgroundProps): React.JSX.Element {
	const getBackgroundImage = (): string => {
		if (showCinematics && currentSequence >= 0 && currentSequence <= 3) {
			const sequenceImages = [
				'/assets/game/landscape/city-looped.gif',
				'/assets/game/landscape/smoke.gif',
				'/assets/game/landscape/forest1.gif',
				'/assets/game/menu-background.gif',
			]
			return sequenceImages[currentSequence]
		}
		return '/assets/game/menu-background.gif'
	}

	const getBackgroundSize = (): string => {
		if (showCinematics && currentSequence >= 0 && currentSequence <= 3) {
			return '100% 100%'
		}
		return isInitialLoad ? '210% auto' : '210% auto'
	}

	const getBackgroundPosition = (): string => {
		if (showCinematics && currentSequence >= 0 && currentSequence <= 3) {
			return '0% 0%'
		}
		return isInitialLoad ? '0% 0%' : '0% 85%'
	}

	const getOpacity = (): number => {
		if (isTransitioningToCinematics) return 0
		if (showCinematics && currentSequence >= 0 && currentSequence <= 3) return 1
		if (showGame) return 1
		if (isInitialLoad) return 0
		return 0
	}

	return (
		<div
			className={`fixed top-0 left-0 w-screen h-screen bg-black z-[1] transition-all duration-[1s] ease-in-out ${
				isInitialLoad ? 'game-background-initial-load' : ''
			}`}
			style={{
				backgroundImage: `url('${getBackgroundImage()}')`,
				backgroundSize: getBackgroundSize(),
				backgroundPosition: getBackgroundPosition(),
				backgroundRepeat: showCinematics && currentSequence >= 0 && currentSequence <= 3 ? 'no-repeat' : 'no-repeat',
				opacity: getOpacity(),
				transition: isTransitioningToCinematics
					? 'opacity 2s ease-in-out'
					: showCinematics && currentSequence >= 0 && currentSequence <= 3
						? 'opacity 8s ease-in-out'
						: 'all 2s ease-in-out',
			}}
		>
			<div className="absolute top-0 left-0 w-full h-full bg-black/15 pointer-events-none z-[2]" />
		</div>
	)
}

export default GameBackground

