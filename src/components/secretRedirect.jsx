import { useEffect } from 'react'

function SecretRedirect() {
	useEffect(() => {
		window.location.href = 'https://shattereddisk.github.io/rickroll/rickroll.mp4'
	}, [])

	return <div>Redirecting...</div>
}

export default SecretRedirect

