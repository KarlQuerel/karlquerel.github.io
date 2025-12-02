import { useRef, useEffect } from 'react'

interface UseCinematicsAudioReturn {
	initAudioPool: () => void
	playTypingSound: (duration: number) => void
	stopAllAudio: () => void
}

export function useCinematicsAudio(): UseCinematicsAudioReturn {
	const audioPoolRef = useRef<HTMLAudioElement[]>([])
	const currentAudioIndexRef = useRef<number>(0)
	const POOL_SIZE = 3 // Reduced from 5

	const initAudioPool = (): void => {
		const pool: HTMLAudioElement[] = []
		for (let i = 0; i < POOL_SIZE; i++) {
			const audio = new Audio('/assets/sound/typing.mp3')
			audio.volume = 0.35
			audio.preload = 'auto'
			pool.push(audio)
		}
		audioPoolRef.current = pool
	}

	const playTypingSound = (duration: number): void => {
		if (audioPoolRef.current.length === 0) return

		const audio = audioPoolRef.current[currentAudioIndexRef.current]
		audio.currentTime = 0
		audio.loop = true

		const playPromise = audio.play()
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					setTimeout(() => {
						audio.loop = false
						audio.pause()
						audio.currentTime = 0
					}, duration) // Duration is already in milliseconds
				})
				.catch(() => {
					audio.load()
				})
		}

		currentAudioIndexRef.current = (currentAudioIndexRef.current + 1) % POOL_SIZE
	}

	const stopAllAudio = (): void => {
		audioPoolRef.current.forEach(audio => {
			audio.pause()
			audio.currentTime = 0
			audio.loop = false
		})
	}

	const cleanup = (): void => {
		audioPoolRef.current.forEach(audio => {
			audio.pause()
			audio.currentTime = 0
		})
	}

	useEffect(() => {
		return () => {
			cleanup()
		}
	}, [])

	return {
		initAudioPool,
		playTypingSound,
		stopAllAudio,
	}
}
