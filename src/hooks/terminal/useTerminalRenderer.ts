/**
 * Terminal line rendering helper
 *
 * This extracts complex template conditional logic into a function that returns
 * rendering instructions. This maps directly to React component rendering.
 */

interface TerminalLine {
	type: string
	content?: string
	link?: string
	linkText?: string
	prefix?: string
	image?: string
	alt?: string
	animated?: boolean
	html?: boolean
}

interface RenderInstruction {
	type: string
	showPrompt?: boolean
	content?: string
	needsRef?: boolean
	refKey?: string
	dataIndex?: number
	link?: string
	linkText?: string
	prefix?: string
	src?: string
	alt?: string
	animated?: boolean
}

export function getTerminalLineRenderer(line: TerminalLine, index: number): RenderInstruction {
	// Command line
	if (line.type === 'command') {
		return {
			type: 'command',
			showPrompt: true,
			content: line.content,
		}
	}

	// Typewriter line (without link/image)
	if (line.type === 'typewriter' && !line.link && !line.image) {
		return {
			type: 'typewriter',
			needsRef: true,
			refKey: `typewriter-${index}`,
			dataIndex: index,
		}
	}

	// Typewriter line with link
	if (line.type === 'typewriter' && line.link) {
		return {
			type: 'typewriter-link',
			needsRef: true,
			refKey: `typewriter-${index}`,
			dataIndex: index,
			link: line.link,
			linkText: line.linkText,
			prefix: line.prefix,
		}
	}

	// Output typewriter
	if (line.type === 'output') {
		return {
			type: 'output',
			needsRef: true,
			refKey: `typewriter-${index}`,
			dataIndex: index,
		}
	}

	// HTML content (needs sanitization)
	if (line.html && line.type !== 'typewriter' && line.type !== 'output') {
		return {
			type: 'html',
			content: line.content,
			// WARNING: This uses dangerouslySetInnerHTML in React
			// Consider sanitizing with DOMPurify before rendering
		}
	}

	// Link (non-typewriter)
	if (line.link && line.type !== 'typewriter') {
		return {
			type: 'link',
			prefix: line.prefix,
			link: line.link,
			linkText: line.linkText,
		}
	}

	// Image
	if (line.image) {
		return {
			type: 'image',
			src: line.image,
			alt: line.alt || 'Terminal image',
			animated: line.animated || false,
		}
	}

	// Plain text content
	if (
		!line.link &&
		!line.image &&
		!line.html &&
		line.type !== 'typewriter' &&
		line.type !== 'command' &&
		line.type !== 'output'
	) {
		return {
			type: 'text',
			content: line.content,
		}
	}

	// Fallback
	return {
		type: 'unknown',
		content: line.content || '',
	}
}

/**
 * Determines if a line needs a ref for typewriter animation
 *
 * @param line - Terminal line object
 * @returns True if line needs a ref
 */
export function lineNeedsRef(line: TerminalLine): boolean {
	return (
		line.type === 'typewriter' ||
		line.type === 'output' ||
		(line.type === 'typewriter' && line.link !== undefined)
	)
}
