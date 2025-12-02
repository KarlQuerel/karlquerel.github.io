import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if the current device is a mobile device
 * @returns boolean indicating if the device is mobile
 */
export function useMobileDetection(): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		const checkMobile = (): void => {
			const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			setIsMobile(mobileRegex.test(navigator.userAgent) || window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	}, [])

	return isMobile
}
