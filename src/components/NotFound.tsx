import React from 'react'

function NotFound(): React.JSX.Element {
	return (
		<div className="content">
			<div
				// prettier-ignore
				className={`nes-container is-dark is-rounded relative box-border flex flex-col items-center justify-center overflow-hidden rounded-[15px] border-[3px] border-retro-green bg-black uppercase shadow-[0_0_50px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)]`}
			>
				<img
					src="/assets/img/yako-not-found.gif"
					alt="lost yako"
					className="h-auto max-h-[40vh] w-[20vw] object-contain sm:w-[40vw] md:w-[30vw]"
				/>
				<h1 className="m-0 text-[2rem] text-white [text-shadow:3px_3px_10px_#00ff00]">
					Page not found
				</h1>
			</div>
		</div>
	)
}

export default NotFound
