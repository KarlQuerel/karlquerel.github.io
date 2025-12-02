import React from 'react'
import { useFooterVisibility } from '../contexts/FooterVisibilityContext'

function RetroFooter(): React.JSX.Element {
	const { isFooterVisible } = useFooterVisibility()

	return (
		<footer
			// prettier-ignore
			className={`
				fixed bottom-0 left-1/2 z-[1020] box-border flex
				min-h-[40px] w-fit min-w-[200px] max-w-[90%]
				-translate-x-1/2 items-center justify-center
				rounded-t-[20px] border-[0.3vh] border-b-0 border-dashed
				border-retro-green bg-black/90 px-4
				transition-all duration-300 ease-in-out
				${!isFooterVisible ? 'translate-y-full' : ''}
				xs:min-w-[140px] xs:max-w-[95%] xs:min-h-[25px]
				sm:min-h-[30px] sm:min-w-[160px] sm:max-w-[95%] sm:px-2
				md:min-h-[35px] md:min-w-[180px] md:max-w-[85%]
			`}
			data-nosnippet
		>
			<div className="whitespace-nowrap px-2 text-center text-[clamp(0.5rem,2vw,0.7rem)] text-white">
				<span>&copy; 2025 Karl Querel - All rights reserved</span>
			</div>
		</footer>
	)
}

export default RetroFooter
