import React from 'react'

interface LoadingScreenProps {
	isLoading: boolean
	loadingProgress: number
	loadedAssets: number
	totalAssets: number
}

function LoadingScreen({
	isLoading,
	loadingProgress,
	loadedAssets,
	totalAssets,
}: LoadingScreenProps): React.JSX.Element | null {
	if (!isLoading) return null

	return (
		<div
			// prettier-ignore
			className={`fixed left-0 top-0 z-[3000] flex h-screen w-screen items-center justify-center bg-black`}
		>
			<div
				// prettier-ignore
				className={`border-3 w-[90%] max-w-[500px] rounded-[15px] border-retro-green bg-black/80 p-12 text-center shadow-[0_0_50px_#00ff00]`}
			>
				<h2 className="mb-8 text-3xl uppercase tracking-[3px] text-yellow">
					Loading Assets
				</h2>
				<div
					// prettier-ignore
					className={`mb-4 h-5 w-full overflow-hidden rounded-[10px] border-2 border-retro-green bg-black/50`}
				>
					<div
						// prettier-ignore
						className={`h-full rounded-lg bg-gradient-to-r from-retro-green to-yellow transition-all duration-300 ease-in-out`}
						style={{ width: `${loadingProgress}%` }}
					/>
				</div>
				<div className="mb-2 text-xl font-bold text-retro-green">
					{loadingProgress}% Complete
				</div>
				<div className="text-base text-yellow opacity-80">
					{loadedAssets} / {totalAssets} assets loaded
				</div>
			</div>
		</div>
	)
}

export default LoadingScreen
