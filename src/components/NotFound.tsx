import React from 'react'

function NotFound(): React.JSX.Element {
	return (
		<div className="content">
			<div className="nes-container is-dark is-rounded bg-black rounded-[15px] border-[3px] border-retro-green shadow-[0_0_50px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)] uppercase flex flex-col items-center justify-center box-border relative overflow-hidden">
				<img
					src="/assets/img/yako-not-found.gif"
					alt="lost yako"
					className="w-[20vw] h-auto max-h-[40vh] object-contain md:w-[30vw] sm:w-[40vw]"
				/>
				<h1 className="text-[2rem] text-white [text-shadow:3px_3px_10px_#00ff00] m-0">Page not found</h1>
			</div>
		</div>
	)
}

export default NotFound

