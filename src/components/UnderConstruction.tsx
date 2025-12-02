import React from 'react'
import ClickCounter from './ClickCounter'

function UnderConstruction(): React.JSX.Element {
	return (
		<div className="content">
			<div
				// prettier-ignore
				className={`nes-container is-dark is-rounded mb-4 rounded-[20px] border-[0.3vh] border-dashed border-retro-green bg-black/50 uppercase`}
			>
				<p>Under Construction</p>
				<img
					src="/assets/img/construction.gif"
					alt="construction GIF"
					className="my-2 h-auto max-w-full rounded-[10px]"
				/>
				<p />
			</div>

			<ClickCounter />
		</div>
	)
}

export default UnderConstruction
