import React from 'react'
import ClickCounter from './ClickCounter'

function UnderConstruction(): React.JSX.Element {
	return (
		<div className="content">
			<div className="nes-container is-dark is-rounded bg-black/50 border-[0.3vh] border-dashed border-retro-green rounded-[20px] mb-4 uppercase">
				<p>Under Construction</p>
				<img
					src="/assets/img/construction.gif"
					alt="construction GIF"
					className="max-w-full h-auto my-2 rounded-[10px]"
				/>
				<p />
			</div>

			<ClickCounter />
		</div>
	)
}

export default UnderConstruction

