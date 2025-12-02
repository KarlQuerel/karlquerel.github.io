import React from 'react'
import Terminal from './Terminal'

function Home(): React.JSX.Element {
	return (
		<div className="mt-20 flex h-full w-screen items-center justify-center p-8 md:p-4">
			<Terminal />
		</div>
	)
}

export default Home
