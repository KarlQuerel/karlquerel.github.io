// Type declarations for external libraries

declare global {
	interface Window {
		TypeIt: typeof TypeIt
	}
}

// TypeIt type definitions
declare class TypeIt {
	constructor(element: HTMLElement | string, options?: TypeItOptions)
	go(): TypeIt
	destroy(): void
	pause(ms: number): TypeIt
	break(): TypeIt
	options(options: Partial<TypeItOptions>): TypeIt
	exec(func: () => void): TypeIt
	empty(): TypeIt
	delete(chars?: number): TypeIt
	move(direction: 'LEFT' | 'RIGHT', distance?: number): TypeIt
	type(char: string): TypeIt
	strings(...strings: string[]): TypeIt
}

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
	lifelike?: boolean // Alias for lifeLike
	deleteSpeed?: number
	loop?: boolean
	loopDelay?: number
	afterComplete?: (instance: any) => void
	beforeString?: (instance: any, pos: number) => void
	afterString?: (instance: any, pos: number) => void
	beforeStep?: (instance: any, pos: number) => void
	afterStep?: (instance: any, pos: number) => void
}

export {}

