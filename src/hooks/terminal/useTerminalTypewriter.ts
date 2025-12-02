import { useRef, useState } from 'react'

interface TypewriterSpeed {
	speed: number
	startDelay: number
}

interface UseTerminalTypewriterReturn {
	welcomeTextRef: React.RefObject<HTMLDivElement | null>
	showInputPrompt: boolean
	initTypewriter: (focusInput: () => void) => void
	createCommandTypewriter: (
		element: HTMLElement,
		content: string,
		options?: Partial<TypeItOptions>
	) => Promise<void>
	typewriterSpeed: TypewriterSpeed
}

// TypeItOptions is defined in global.d.ts
declare global {
	interface TypeItOptions {
		strings?: string[]
		speed?: number
		startDelay?: number
		nextStringDelay?: number
		waitUntilVisible?: boolean
		cursor?: boolean
		cursorChar?: string
		cursorSpeed?: number
		breakLines?: boolean
		html?: boolean
		lifeLike?: boolean
		lifelike?: boolean
		deleteSpeed?: number
		loop?: boolean
		loopDelay?: number
		afterComplete?: (instance: any) => void
		beforeString?: (instance: any, pos: number) => void
		afterString?: (instance: any, pos: number) => void
		beforeStep?: (instance: any, pos: number) => void
		afterStep?: (instance: any, pos: number) => void
	}
}

export function useTerminalTypewriter(): UseTerminalTypewriterReturn {
	const welcomeTextRef = useRef<HTMLDivElement | null>(null)
	const [showInputPrompt, setShowInputPrompt] = useState<boolean>(false)

	const typewriterSpeed: TypewriterSpeed = {
		speed: 6,
		startDelay: 0,
	}

	const initTypewriter = (focusInput: () => void): void => {
		// Use setTimeout to ensure DOM is ready
		setTimeout(() => {
			if (welcomeTextRef.current && window.TypeIt) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				new (window as any).TypeIt(welcomeTextRef.current, {
					strings: [
						'Welcome to my website!',
						'<br>Type <span class="text-yellow">help</span> for available commands or just type anything.',
					],
					...typewriterSpeed,
					lifelike: true,
					html: true,
					cursorChar: '_',
					afterComplete: function (instance: any) {
						if (instance && typeof instance.destroy === 'function') {
							instance.destroy()
						}
						setShowInputPrompt(true)
						// React's useEffect will handle focusing after state update
						setTimeout(() => {
							focusInput()
						}, 0)
					},
				}).go()
			}
		}, 100)
	}

	const createCommandTypewriter = (
		element: HTMLElement,
		content: string,
		options: Partial<TypeItOptions> = {}
	): Promise<void> => {
		return new Promise(resolve => {
			// React's useEffect automatically waits for DOM updates
			setTimeout(() => {
				if (element && window.TypeIt) {
					const defaultOptions: Partial<TypeItOptions> = {
						...typewriterSpeed,
						lifelike: true,
						html: true,
						cursorChar: '_',
						afterComplete: function (instance: any) {
							if (instance && typeof instance.destroy === 'function') {
								instance.destroy()
							}
							resolve()
						},
					}

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					new (window as any).TypeIt(element, {
						...defaultOptions,
						...options,
						strings: [content],
					}).go()
				} else {
					resolve()
				}
			}, 0)
		})
	}

	return {
		welcomeTextRef,
		showInputPrompt,
		initTypewriter,
		createCommandTypewriter,
		typewriterSpeed,
	}
}

