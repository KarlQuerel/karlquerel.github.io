import { useRef, useEffect, RefObject } from 'react'

interface UseAudioManagerReturn {
	bgMusic: RefObject<HTMLAudioElement | null>
	clickSound: RefObject<HTMLAudioElement | null>
	initAudio: () => void
	playBackgroundMusic: () => Promise<void>
	playClickSound: () => Promise<void>
}

export function useAudioManager(): UseAudioManagerReturn {
	const bgMusicRef = useRef<HTMLAudioElement>(null)
	const clickSoundRef = useRef<HTMLAudioElement>(null)

	const initAudio = (): void => {
		if (bgMusicRef.current) {
			bgMusicRef.current.volume = 1
		}
		if (clickSoundRef.current) {
			clickSoundRef.current.volume = 1
			clickSoundRef.current.load()
		}
	}

	const playBackgroundMusic = async (): Promise<void> => {
		if (bgMusicRef.current) {
			try {
				bgMusicRef.current.volume = 1
				await bgMusicRef.current.play()
			} catch (error) {
				console.error('Error playing background music:', error)
			}
		}
	}

	const playClickSound = async (): Promise<void> => {
		if (clickSoundRef.current) {
			try {
				clickSoundRef.current.currentTime = 0
				await clickSoundRef.current.play()
			} catch (error) {
				console.error('Error playing click sound:', error)
			}
		}
	}

	const cleanup = (): void => {
		if (bgMusicRef.current) {
			bgMusicRef.current.pause()
			bgMusicRef.current.currentTime = 0
		}
		if (clickSoundRef.current) {
			clickSoundRef.current.pause()
			clickSoundRef.current.currentTime = 0
		}
	}

	useEffect(() => {
		return () => {
			cleanup()
		}
	}, [])

	return {
		bgMusic: bgMusicRef,
		clickSound: clickSoundRef,
		initAudio,
		playBackgroundMusic,
		playClickSound,
	}
}

