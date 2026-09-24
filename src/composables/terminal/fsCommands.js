import { HEAD_DEFAULT_LINES, WC_CHARS_WIDTH, WC_COUNT_WIDTH } from '@/constants/terminal'
import { asLines, escapeHtml, highlight, markup, plain } from './terminalText'

const output = content => [{ type: 'output', content }]

const fileColor = entry =>
	entry.type === 'dir' ? 'text-azure' : entry.exec ? 'text-green' : 'text-blue'

const entryLabel = entry =>
	`<span class="${fileColor(entry)}">${escapeHtml(entry.name + (entry.type === 'dir' ? '/' : ''))}</span>`

// Read `file`, or fall back to piped stdin; errors are relabelled for the calling command.
const readSource = (fs, name, file, stdin) => {
	if (!file && stdin != null) return { content: stdin }
	if (!file) return { error: null }
	const { content, error } = fs.read(file)
	return error ? { error: error.replace('cat:', `${name}:`) } : { content }
}

// ls, cd, cat & co. over the in-memory FILESYSTEM (see useTerminalFs).
export function createFsCommands(fs) {
	return {
		pwd: () => [
			markup(
				`<span class="text-blue">${escapeHtml(fs.pathString().replace('~', '/home/karl'))}</span>`
			),
		],

		ls: args => {
			const tokens = args.trim().split(/\s+/).filter(Boolean)
			const flags = tokens.filter(token => token.startsWith('-')).join('')
			const path = tokens.find(token => !token.startsWith('-')) || ''
			const { entries, error: failure } = fs.list(path, { all: flags.includes('a') })
			if (failure) return output(failure)
			if (flags.includes('l')) {
				return entries.map(entry =>
					markup(
						`${entry.type === 'dir' ? 'd' : '-'}rw-r--r--  karl karl  ${entryLabel(entry)}`
					)
				)
			}
			if (entries.length === 0) return output('')
			return [markup(entries.map(entryLabel).join('   '))]
		},

		cd: args => {
			const { error: failure } = fs.cd(args.trim())
			return failure ? output(failure) : []
		},

		cat: (args, stdin) => {
			const file = args.trim()
			if (!file) return stdin != null ? asLines(stdin) : output('cat: missing file operand')
			const { content, error: failure } = fs.read(file)
			return failure ? output(failure) : asLines(content)
		},

		tree: args => {
			const { lines, error: failure } = fs.tree(args.trim())
			return failure ? output(failure) : lines.map(plain)
		},

		grep: (args, stdin) => {
			const trimmed = args.trim()
			const space = trimmed.indexOf(' ')
			const piped = stdin != null && space < 0
			if (!trimmed || (!piped && space < 0)) return output('usage: grep [text] [file]')
			const pattern = piped ? trimmed : trimmed.slice(0, space)
			const source = piped
				? { content: stdin }
				: readSource(fs, 'grep', trimmed.slice(space + 1).trim())
			if (source.error) return output(source.error)
			return source.content
				.split('\n')
				.filter(line => line.toLowerCase().includes(pattern.toLowerCase()))
				.map(line => markup(highlight(line, pattern, 'text-yellow')))
		},

		wc: (args, stdin) => {
			const file = args.trim()
			const { content, error: failure } = readSource(fs, 'wc', file, stdin)
			if (content == null) return output(failure || 'usage: wc [file]')
			const lines = content === '' ? 0 : content.split('\n').length
			const words = content.split(/\s+/).filter(Boolean).length
			const label = file ? ` ${file}` : ''
			return [
				plain(
					`${String(lines).padStart(WC_COUNT_WIDTH)} ${String(words).padStart(WC_COUNT_WIDTH)} ${String(content.length).padStart(WC_CHARS_WIDTH)}${label}`
				),
			]
		},

		head: (args, stdin) => {
			const tokens = args.trim().split(/\s+/).filter(Boolean)
			// piped form: `head` or `head 5`, a leading number being the count
			const piped = stdin != null && (tokens.length === 0 || /^\d+$/.test(tokens[0]))
			const count = Math.max(1, parseInt(tokens[piped ? 0 : 1], 10) || HEAD_DEFAULT_LINES)
			const { content, error: failure } = piped
				? { content: stdin }
				: readSource(fs, 'head', tokens[0])
			if (content == null) return output(failure || 'usage: head [file] [n]')
			return content.split('\n').slice(0, count).map(plain)
		},
	}
}
