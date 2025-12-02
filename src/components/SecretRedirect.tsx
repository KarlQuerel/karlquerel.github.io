import React, { useEffect } from 'react'

function SecretRedirect(): React.JSX.Element {
	useEffect(() => {
		window.location.href = 'https://shattereddisk.github.io/rickroll/rickroll.mp4'
	}, [])

	return (
		<div className="flex min-h-screen items-center justify-center text-retro-green">
			Redirecting...
		</div>
	)
}

export default SecretRedirect
