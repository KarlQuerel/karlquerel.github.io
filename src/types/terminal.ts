// Terminal line types
export interface TerminalLine {
	type: string
	content?: string
	html?: boolean
	prefix?: string
	link?: string
	linkText?: string
	image?: string
	alt?: string
	animated?: boolean
}

export type CommandFunction = (
	args?: string
) => TerminalLine[] | void | Promise<TerminalLine[] | void>

export interface Commands {
	[key: string]: CommandFunction
}
