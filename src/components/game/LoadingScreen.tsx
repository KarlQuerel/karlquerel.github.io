import React from 'react'

interface LoadingScreenProps {
	isLoading: boolean
	loadingProgress: number
	loadedAssets: number
	totalAssets: number
}

function LoadingScreen({ isLoading, loadingProgress, loadedAssets, totalAssets }: LoadingScreenProps): React.JSX.Element | null {
	if (!isLoading) return null

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center z-[3000]">
			<div className="text-center p-12 bg-black/80 rounded-[15px] border-3 border-retro-green shadow-[0_0_50px_#00ff00] max-w-[500px] w-[90%]">
				<h2 className="text-yellow text-3xl mb-8 uppercase tracking-[3px]">
					Loading Assets
				</h2>
				<div className="w-full h-5 bg-black/50 border-2 border-retro-green rounded-[10px] overflow-hidden mb-4">
					<div
						className="h-full bg-gradient-to-r from-retro-green to-yellow transition-all duration-300 ease-in-out rounded-lg"
						style={{ width: `${loadingProgress}%` }}
					/>
				</div>
				<div className="text-retro-green text-xl mb-2 font-bold">
					{loadingProgress}% Complete
				</div>
				<div className="text-yellow text-base opacity-80">
					{loadedAssets} / {totalAssets} assets loaded
				</div>
			</div>
		</div>
	)
}

export default LoadingScreen

