import React from 'react'
import { useFooterVisibility } from '../contexts/FooterVisibilityContext'

function RetroFooter(): React.JSX.Element {
	const { isFooterVisible } = useFooterVisibility()

	return (
		<footer
			className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[1020] w-fit min-w-[200px] max-w-[90%] min-h-[40px] flex items-center justify-center px-4 box-border bg-black/90 border-[0.3vh] border-dashed border-retro-green border-b-0 rounded-t-[20px] transition-all duration-300 ease-in-out ${
				!isFooterVisible ? 'translate-y-full' : ''
			} md:min-w-[180px] md:max-w-[85%] md:min-h-[35px] sm:min-w-[160px] sm:max-w-[95%] sm:min-h-[30px] sm:px-2 xs:min-w-[140px] xs:max-w-[95%] xs:min-h-[25px]`}
			data-nosnippet
		>
			<div className="text-[clamp(0.5rem,2vw,0.7rem)] text-center text-white whitespace-nowrap px-2">
				<span>&copy; 2025 Karl Querel - All rights reserved</span>
			</div>
		</footer>
	)
}

export default RetroFooter

