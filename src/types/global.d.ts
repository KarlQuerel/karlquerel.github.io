// Type declarations for external libraries

declare global {
	interface Window {
		TypeIt: typeof TypeIt
	}
}

// TypeIt type definitions
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	afterComplete?: (instance: any) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	beforeString?: (instance: any, pos: number) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	afterString?: (instance: any, pos: number) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	beforeStep?: (instance: any, pos: number) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	afterStep?: (instance: any, pos: number) => void
}

export {}
