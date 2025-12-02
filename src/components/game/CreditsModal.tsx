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
			// prettier-ignore
			className={`credits-modal-overlay fixed left-0 top-0 z-[2000] flex h-screen w-screen items-center justify-center bg-black/80`}
			onClick={handleClose}
		>
			<div
				className="credits-modal fixed top-[20%] h-[75%] w-full max-w-[90%] overflow-y-auto rounded-[15px] border-2 border-dashed border-yellow bg-black bg-[url('/assets/game/credits.gif')] bg-cover bg-[100%_50%] bg-no-repeat p-8 shadow-[0_0_20px_#ffbd2e] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-yellow [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar]:w-2"
				onClick={e => e.stopPropagation()}
			>
				<button className="btn-close" onClick={handleClose}>
					×
				</button>
				<div className="text-left text-retro-green">
					<h2 className="text-center text-3xl uppercase text-yellow drop-shadow-[0_0_10px_#000000]">
						Credits
					</h2>
					<div className="credits-section">
						<h3 className="mt-12 text-[2.75vh] uppercase text-yellow drop-shadow-[0_0_10px_#000000]">
							Artwork
						</h3>
						<p
							// prettier-ignore
							className={`my-4 text-left text-[2.5vh] uppercase text-retro-green drop-shadow-[0_0_10px_#000000]`}
						>
							Fatih Emir
						</p>
						<p
							// prettier-ignore
							className={`my-4 text-left text-[2.5vh] uppercase text-retro-green drop-shadow-[0_0_10px_#000000]`}
						>
							Kryssalian
						</p>
						<p
							// prettier-ignore
							className={`my-4 text-left text-[2.5vh] uppercase text-retro-green drop-shadow-[0_0_10px_#000000]`}
						>
							Vertibirdo
						</p>
						<p
							// prettier-ignore
							className={`my-4 text-left text-[2.5vh] uppercase text-retro-green drop-shadow-[0_0_10px_#000000]`}
						>
							v78
						</p>
					</div>
					<div className="credits-section">
						<h3 className="mt-12 text-[2.75vh] uppercase text-yellow drop-shadow-[0_0_10px_#000000]">
							Music
						</h3>
						<p
							// prettier-ignore
							className={`my-4 text-left text-[2.5vh] uppercase text-retro-green drop-shadow-[0_0_10px_#000000]`}
						>
							World of Warcraft
						</p>
						<h3 className="mt-12 text-[2.75vh] uppercase text-yellow drop-shadow-[0_0_10px_#000000]">
							Everything Else
						</h3>
						<p
							// prettier-ignore
							className={`my-4 text-left text-[2.5vh] uppercase text-retro-green drop-shadow-[0_0_10px_#000000]`}
						>
							Karl Querel
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreditsModal
