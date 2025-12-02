import React from 'react'

interface PreGameScreenProps {
	showGame: boolean
	onStartGame: () => void
}

function PreGameScreen({ showGame, onStartGame }: PreGameScreenProps): React.JSX.Element | null {
	if (showGame) return null

	return (
		<div className="flex justify-center items-center z-[2000] h-screen w-screen">
			<div className="text-center p-12 bg-black rounded-[15px] border-3 border-retro-green shadow-[0_0_50px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)] max-w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<h2 className="text-yellow text-xl mb-8 uppercase">
					This game is currently
					<br />
					<span className="text-retro-green font-bold">in development</span>
				</h2>
				<h2 className="text-yellow text-xl mb-8 uppercase">
					For the best experience
					<br />
					turn on your
					<span className="text-retro-green font-bold">sound</span> before starting
				</h2>
				<button
					className="text-xl w-1/2 text-retro-green bg-black/70 border-3 border-retro-green transition-all duration-300 ease-in-out uppercase relative overflow-hidden rounded-[10px] hover:bg-retro-green hover:text-black hover:scale-110 active:scale-95"
					onClick={onStartGame}
				>
					Sound is on!
				</button>
			</div>
		</div>
	)
}

export default PreGameScreen

