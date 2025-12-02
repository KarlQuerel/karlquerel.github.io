import React from 'react'

interface PreGameScreenProps {
	showGame: boolean
	onStartGame: () => void
}

function PreGameScreen({ showGame, onStartGame }: PreGameScreenProps): React.JSX.Element | null {
	if (showGame) return null

	return (
		<div className="z-[2000] flex h-screen w-screen items-center justify-center">
			<div
				// prettier-ignore
				className={`border-3 absolute left-1/2 top-1/2 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-[15px] border-retro-green bg-black p-12 text-center shadow-[0_0_50px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)]`}
			>
				<h2 className="mb-8 text-xl uppercase text-yellow">
					This game is currently
					<br />
					<span className="font-bold text-retro-green">in development</span>
				</h2>
				<h2 className="mb-8 text-xl uppercase text-yellow">
					For the best experience
					<br />
					turn on your
					<span className="font-bold text-retro-green">sound</span> before starting
				</h2>
				<button className="btn-pixel-secondary" onClick={onStartGame}>
					Sound is on!
				</button>
			</div>
		</div>
	)
}

export default PreGameScreen
