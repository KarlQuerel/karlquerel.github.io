import React from 'react'
import { useMobileDetection } from '../../hooks/useMobileDetection'

function MobileWarning(): React.JSX.Element | null {
	const isMobile = useMobileDetection()

	if (!isMobile) return null

	return (
		<div
			// prettier-ignore
			className={`fixed left-0 top-[10vh] z-[1001] flex h-[90vh] w-screen items-center justify-center bg-black`}
		>
			<div
				// prettier-ignore
				className={`max-w-[80%] rounded-[15px] border-[3px] border-retro-green bg-black/90 p-8 text-center shadow-[0_0_50px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)]`}
			>
				<h2 className="mb-4 text-[1.75rem] text-yellow [text-shadow:0_0_10px_#00ff00]">
					Not available on mobile devices
				</h2>
				<p className="m-0 text-[1.5rem] text-white [text-shadow:0_0_5px_#00ff00]">
					Please use a{' '}
					<span className="font-bold text-retro-green">desktop computer</span> for the
					best experience
				</p>
			</div>
		</div>
	)
}

export default MobileWarning
