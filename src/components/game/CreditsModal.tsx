import React from 'react'

interface CreditsModalProps {
	isVisible: boolean
	onClose: () => void
}

function CreditsModal({ isVisible, onClose }: CreditsModalProps): React.JSX.Element | null {
	const playClickSound = async (): Promise<void> => {
		const clickSound = new Audio('/assets/sound/button-press.wav')
		clickSound.volume = 1
		try {
			await clickSound.play()
		} catch (error) {
			console.error('Error playing click sound:', error)
		}
	}

	const handleClose = async (): Promise<void> => {
		await playClickSound()
		onClose()
	}

	if (!isVisible) return null

	return (
		<div
			className="credits-modal-overlay fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center z-[2000]"
			onClick={handleClose}
		>
			<div
				className="credits-modal fixed top-[20%] bg-black bg-[url('/assets/game/credits.gif')] bg-cover bg-[100%_50%] bg-no-repeat border-2 border-dashed border-yellow rounded-[15px] p-8 w-full h-[75%] max-w-[90%] overflow-y-auto shadow-[0_0_20px_#ffbd2e] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-yellow [&::-webkit-scrollbar-thumb]:rounded"
				onClick={e => e.stopPropagation()}
			>
				<button
					className="absolute top-4 right-4 bg-transparent border-none text-retro-green text-3xl cursor-auto p-2 leading-none transition-colors duration-300 ease-in-out hover:text-yellow"
					onClick={handleClose}
				>
					×
				</button>
				<div className="text-retro-green text-left">
					<h2 className="text-3xl text-center text-yellow uppercase drop-shadow-[0_0_10px_#000000]">
						Credits
					</h2>
					<div className="credits-section">
						<h3 className="text-yellow text-[2.75vh] uppercase drop-shadow-[0_0_10px_#000000] mt-12">
							Artwork
						</h3>
						<p className="text-retro-green text-left text-[2.5vh] uppercase drop-shadow-[0_0_10px_#000000] my-4">
							Fatih Emir
						</p>
						<p className="text-retro-green text-left text-[2.5vh] uppercase drop-shadow-[0_0_10px_#000000] my-4">
							Kryssalian
						</p>
						<p className="text-retro-green text-left text-[2.5vh] uppercase drop-shadow-[0_0_10px_#000000] my-4">
							Vertibirdo
						</p>
						<p className="text-retro-green text-left text-[2.5vh] uppercase drop-shadow-[0_0_10px_#000000] my-4">
							v78
						</p>
					</div>
					<div className="credits-section">
						<h3 className="text-yellow text-[2.75vh] uppercase drop-shadow-[0_0_10px_#000000] mt-12">
							Music
						</h3>
						<p className="text-retro-green text-left text-[2.5vh] uppercase drop-shadow-[0_0_10px_#000000] my-4">
							World of Warcraft
						</p>
						<h3 className="text-yellow text-[2.75vh] uppercase drop-shadow-[0_0_10px_#000000] mt-12">
							Everything Else
						</h3>
						<p className="text-retro-green text-left text-[2.5vh] uppercase drop-shadow-[0_0_10px_#000000] my-4">
							Karl Querel
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreditsModal

