import React from 'react'
import { useMobileDetection } from '../../hooks/useMobileDetection'

function MobileWarning(): React.JSX.Element | null {
	const isMobile = useMobileDetection()

	if (!isMobile) return null

	return (
		<div className="fixed top-[10vh] left-0 w-screen h-[90vh] bg-black flex justify-center items-center z-[1001]">
			<div className="text-center p-8 bg-black/90 rounded-[15px] border-[3px] border-retro-green shadow-[0_0_50px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)] max-w-[80%]">
				<h2 className="text-yellow text-[1.75rem] mb-4 [text-shadow:0_0_10px_#00ff00]">
					Not available on mobile devices
				</h2>
				<p className="text-white text-[1.5rem] [text-shadow:0_0_5px_#00ff00] m-0">
					Please use a <span className="text-retro-green font-bold">desktop computer</span> for the best
					experience
				</p>
			</div>
		</div>
	)
}

export default MobileWarning

