import { ref } from 'vue'
import { FILESYSTEM } from '@/constants/terminal'

// In-memory navigation over the fake filesystem (see FILESYSTEM). Tracks the
// current working directory as path segments below home (~) and exposes the
// helpers the shell commands (ls/cd/cat/tree/grep/wc/head/pwd) and tab
// completion use. Pure path logic — no DOM, no side effects beyond `cwd`.
export function useTerminalFs() {
	// [] is home (~); ['dog'] is ~/dog, etc.
	const cwd = ref([])

	// Walk segments from the root; null if any step misses or hits a file.
	const nodeAt = segments => {
		let node = FILESYSTEM
		for (const seg of segments) {
			if (node.type !== 'dir' || !node.children[seg]) return null
			node = node.children[seg]
		}
		return node
	}

	// `~`-relative display path for the given (default current) directory.
	const pathString = (segments = cwd.value) =>
		'~' + (segments.length ? '/' + segments.join('/') : '')

	// Normalise a path string into absolute segments below home. Returns null
	// for an impossible path (e.g. `..` above home).
	const resolve = path => {
		const trimmed = (path || '').trim()
		let segs
		if (trimmed === '') segs = [...cwd.value]
		else if (trimmed === '~' || trimmed === '/') segs = []
		else if (trimmed.startsWith('~/')) segs = trimmed.slice(2).split('/')
		else if (trimmed.startsWith('/')) segs = trimmed.slice(1).split('/')
		else segs = [...cwd.value, ...trimmed.split('/')]

		const out = []
		for (const seg of segs) {
			if (seg === '' || seg === '.') continue
			if (seg === '..') {
				if (out.length === 0) return null
				out.pop()
				continue
			}
			out.push(seg)
		}
		return out
	}

	const cd = path => {
		const segs = resolve(path)
		const node = segs && nodeAt(segs)
		if (!node) return { error: `cd: ${path}: No such file or directory` }
		if (node.type !== 'dir') return { error: `cd: ${path}: Not a directory` }
		cwd.value = segs
		return {}
	}

	// List a directory (or a single file). `all` includes dotfiles.
	const list = (path = '', { all = false } = {}) => {
		const segs = resolve(path)
		const node = segs && nodeAt(segs)
		if (!node) return { error: `ls: ${path}: No such file or directory` }
		if (node.type === 'file') {
			return { entries: [{ name: segs[segs.length - 1], ...node }] }
		}
		const names = Object.keys(node.children)
			.filter(name => all || !name.startsWith('.'))
			.sort()
		return { entries: names.map(name => ({ name, ...node.children[name] })) }
	}

	const read = path => {
		const segs = resolve(path)
		const node = segs && nodeAt(segs)
		if (!node) return { error: `cat: ${path}: No such file or directory` }
		if (node.type === 'dir') return { error: `cat: ${path}: Is a directory` }
		return { content: node.content || '' }
	}

	// ASCII tree from the current dir (or a given path).
	const tree = (path = '') => {
		const segs = resolve(path)
		const node = segs && nodeAt(segs)
		if (!node || node.type !== 'dir') {
			return { error: `tree: ${path || pathString()}: Not a directory` }
		}
		const lines = [pathString(segs)]
		const walk = (dir, prefix) => {
			const names = Object.keys(dir.children)
				.filter(name => !name.startsWith('.'))
				.sort()
			names.forEach((name, i) => {
				const last = i === names.length - 1
				lines.push(`${prefix}${last ? '└── ' : '├── '}${name}`)
				const child = dir.children[name]
				if (child.type === 'dir') walk(child, prefix + (last ? '    ' : '│   '))
			})
		}
		walk(node, '')
		return { lines }
	}

	// Tab-completion candidates for a partial path argument, cwd-relative.
	const completions = arg => {
		const slash = arg.lastIndexOf('/')
		const dirPart = slash >= 0 ? arg.slice(0, slash + 1) : ''
		const base = slash >= 0 ? arg.slice(slash + 1) : arg
		const segs = resolve(dirPart || '.')
		const node = segs && nodeAt(segs)
		if (!node || node.type !== 'dir') return []
		return Object.keys(node.children)
			.filter(
				name => (base.startsWith('.') || !name.startsWith('.')) && name.startsWith(base)
			)
			.sort()
			.map(name => dirPart + name + (node.children[name].type === 'dir' ? '/' : ''))
	}

	return { cwd, pathString, cd, list, read, tree, completions }
}
