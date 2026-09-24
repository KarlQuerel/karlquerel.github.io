import { EXIT_DELAY_MS, HISTORY_INDEX_WIDTH } from '@/constants/terminal'
import { escapeHtml, markup, plain } from './terminalText'

// Shell plumbing: echo, clear, history, theme, date, whoami, exit.
export function createSystemCommands({ clear, getHistory, setTheme, themeNames, leave }) {
	return {
		echo: args => [{ type: 'output', content: args }],

		clear: () => {
			clear()
			return []
		},

		history: () => {
			const entries = getHistory().slice().reverse()
			if (entries.length === 0) {
				return [{ type: 'output', content: 'No command history yet.' }]
			}
			return entries.map((cmd, i) =>
				markup(
					`<span class="text-blue">${String(i + 1).padStart(HISTORY_INDEX_WIDTH)}</span>  ${escapeHtml(cmd)}`
				)
			)
		},

		theme: args => {
			const name = args.trim().toLowerCase()
			if (name && setTheme(name)) {
				return [
					markup(`Phosphor set to <span class="text-green">${escapeHtml(name)}</span>.`),
				]
			}
			return [
				markup(
					name
						? `<span class="text-red">Unknown theme "${escapeHtml(name)}".</span>`
						: 'Usage: theme [name]'
				),
				markup(`Available: <span class="text-yellow">${themeNames.join(', ')}</span>`),
			]
		},

		date: () => [plain(`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`)],

		whoami: () => [markup('<span class="text-red">You tell me.</span>')],

		exit: () => {
			setTimeout(leave, EXIT_DELAY_MS)
			return [plain('logging out...')]
		},
	}
}
