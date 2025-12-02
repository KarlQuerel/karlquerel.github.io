import React, { useEffect } from 'react'

function SecretRedirect(): React.JSX.Element {
	useEffect(() => {
		window.location.href =
			'https://shattereddisk.github.io/rickroll/rickroll.mp4'
	}, [])

	return (
		<div className="flex items-center justify-center min-h-screen text-retro-green">
			Redirecting...
		</div>
	)
}

export default SecretRedirect

