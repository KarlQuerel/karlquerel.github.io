// Output lines render as text unless flagged `html: true`; anything interpolated into one goes through escapeHtml.
export const escapeHtml = text =>
	String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const decodeEntities = text =>
	text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const plain = content => ({ type: 'typewriter', content })

export const markup = content => ({ type: 'typewriter', html: true, content })

export const asLines = text => text.split('\n').map(plain)

// Wrap case-insensitive matches in `className`, escaping everything else.
export const highlight = (line, pattern, className) => {
	let out = ''
	let last = 0
	for (const match of line.matchAll(new RegExp(escapeRegExp(pattern), 'gi'))) {
		out += escapeHtml(line.slice(last, match.index))
		out += `<span class="${className}">${escapeHtml(match[0])}</span>`
		last = match.index + match[0].length
	}
	return out + escapeHtml(line.slice(last))
}

// Flatten a command's line objects to plain text for the next pipe segment.
export const toStdin = lines =>
	lines
		.filter(line => !line.image)
		.map(line => {
			if (line.link) return `${line.prefix || ''}${line.linkText || ''}`
			const raw = line.content || ''
			return line.html ? decodeEntities(raw.replace(/<[^>]*>/g, '')) : raw
		})
		.join('\n')

// Typed out by the typewriter; images carry their own animation.
export const isTyped = line => (line.type === 'typewriter' || line.type === 'output') && !line.image
