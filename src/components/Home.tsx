import React from 'react'
import Terminal from './Terminal'

function Home(): React.JSX.Element {
	return (
		<div className="w-screen h-full flex justify-center items-center p-8 mt-20 md:p-4">
			<Terminal />
		</div>
	)
}

export default Home

