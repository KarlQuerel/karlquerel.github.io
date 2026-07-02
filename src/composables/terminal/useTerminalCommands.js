import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	HELP_COMMANDS,
	HELP_HINT,
	MAN_PAGES,
	NEOFETCH_LOGO,
	SPINNER_FRAMES,
	SYSTEM_INFO,
	COWSAY_MASCOT,
} from '@/constants/terminal'
import { useTerminalFs } from './useTerminalFs'

export function useTerminalCommands({
	getVisitStats,
	loadVisitData,
	setTheme,
	themeNames,
	getThemeName,
	getHistory,
	onMatrix,
}) {
	const router = useRouter()
	const terminalHistory = ref([])
	// True while a ./script "runs"; the component hides the input prompt and
	// shows `spinnerFrame` so it reads like a shell that hasn't returned yet.
	// The spinner is deliberately kept out of terminalHistory — it is transient
	// UI, not a record, and parking it in history collides with the typewriter.
	const isExecutingScript = ref(false)
	const spinnerFrame = ref('')
	const fs = useTerminalFs()

	const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

	// Escape user/echoed text before it goes into an html:true line.
	const escapeHtml = text =>
		String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

	const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

	// Edit distance, used to suggest a near-miss command ("did you mean").
	const levenshtein = (a, b) => {
		const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
		for (let j = 0; j <= b.length; j++) dp[0][j] = j
		for (let i = 1; i <= a.length; i++) {
			for (let j = 1; j <= b.length; j++) {
				const cost = a[i - 1] === b[j - 1] ? 0 : 1
				dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
			}
		}
		return dp[a.length][b.length]
	}

	const nearestCommand = input => {
		let best = null
		let bestDistance = Infinity
		for (const name of Object.keys(commands)) {
			const distance = levenshtein(input, name)
			if (distance < bestDistance) {
				bestDistance = distance
				best = name
			}
		}
		return bestDistance <= 2 ? best : null
	}

	// Map a file's filesystem entry to a phosphor colour class.
	const fileColor = entry =>
		entry.type === 'dir' ? 'text-azure' : entry.exec ? 'text-green' : 'text-blue'
	const entryName = entry => entry.name + (entry.type === 'dir' ? '/' : '')

	// Turn a multi-line string into one typed line per row (plain, auto-escaped).
	const asLines = text => text.split('\n').map(line => ({ type: 'typewriter', content: line }))

	const handleStatsCommand = async () => {
		await loadVisitData()
		const stats = getVisitStats()
		const outputs = [
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-green">📈 Terminal Statistics </span>',
			},
			{
				type: 'typewriter',
				html: true,
				content: `• Visitors    - <span class="text-blue">${stats.totalVisits}</span>`,
			},
			{
				type: 'typewriter',
				html: true,
				content: `• Commands    - <span class="text-blue">${stats.totalCommands}</span>`,
			},
		]

		if (stats.lastVisit) {
			outputs.push({
				type: 'typewriter',
				html: true,
				content: `• Last visit  - <span class="text-yellow">${stats.lastVisit.toLocaleDateString()}</span>`,
			})
		}

		if (stats.popularCommands.length > 0) {
			outputs.push({
				type: 'typewriter',
				html: true,
				content: '<span class="text-purple">🏆 Most popular commands </span>',
			})

			stats.popularCommands.forEach(({ command, count }) => {
				const paddedCommand = command.padEnd(11)
				outputs.push({
					type: 'typewriter',
					html: true,
					content: `• ${paddedCommand} - <span class="text-blue">${count}</span> times`,
				})
			})
		}

		return outputs
	}

	// --- Loading spinner ---------------------------------------------------
	// One owner for the spinner lifecycle: hides the input prompt and ticks the
	// loader frames. `startSpinner` returns a stop() that restores the prompt;
	// it backs both the fixed-duration runner (scripts / secret_game) and the
	// wait-for-a-promise wrapper (location / stats / any async command).
	const SPINNER_FRAME_MS = 80
	const INSTALL_SPIN_MS = 1500
	const SECRET_GAME_SPIN_MS = 3200

	const startSpinner = () => {
		isExecutingScript.value = true
		let i = 0
		spinnerFrame.value = SPINNER_FRAMES[0]
		const timer = setInterval(() => {
			i = (i + 1) % SPINNER_FRAMES.length
			spinnerFrame.value = SPINNER_FRAMES[i]
		}, SPINNER_FRAME_MS)
		return () => {
			clearInterval(timer)
			isExecutingScript.value = false
			spinnerFrame.value = ''
		}
	}

	// Fixed-duration spinner: optionally echo `intro`, spin for `runMs`, then run
	// `finish` (push output, open a tab, …).
	const runWithSpinner = async ({ intro, runMs, finish }) => {
		const stop = startSpinner()
		try {
			if (intro) terminalHistory.value.push(intro)
			await new Promise(resolve => setTimeout(resolve, runMs))
			finish?.()
		} finally {
			stop()
		}
	}

	const commands = {
		help: args => {
			const topic = (args || '').trim().toLowerCase()
			if (topic) {
				const page = MAN_PAGES[topic]
				return [
					{
						type: 'typewriter',
						html: true,
						content: page
							? escapeHtml(page)
							: `No help for <span class="text-red">${escapeHtml(topic)}</span>. Try: help`,
					},
				]
			}
			// Align the dashes: pad each name to the longest in the curated set.
			const width = Math.max(...HELP_COMMANDS.map(([name]) => name.length))
			return [
				...HELP_COMMANDS.map(([name, color, desc]) => ({
					type: 'typewriter',
					html: true,
					content: `• <span class="${color}">${name}</span>${' '.repeat(width - name.length)} - ${desc}`,
				})),
				{ type: 'typewriter', content: '' },
				{ type: 'typewriter', html: true, content: HELP_HINT },
			]
		},

		about: () => [
			{
				type: 'typewriter',
				html: true,
				content:
					'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience',
			},
			{
				type: 'typewriter',
				html: true,
				content:
					'• Studied at <span class="text-purple">HEC Geneva</span>, <span class="text-purple">GEM</span> and <span class="text-purple">42 Paris</span>',
			},
			{
				type: 'typewriter',
				html: true,
				content: '• Transitioned into <span class="text-green">software development</span>',
			},
			{
				type: 'typewriter',
				html: true,
				content: '• Currently working at <span class="text-azure">Zetra</span>',
			},
		],

		contact: () => [
			{
				type: 'typewriter',
				prefix: '• Email       - ',
				link: 'mailto:karlquerel@gmail.com',
				linkText: 'karlquerel@gmail.com',
			},
			{
				type: 'typewriter',
				prefix: '• GitHub      - ',
				link: 'https://github.com/KarlQuerel',
				linkText: 'github.com/KarlQuerel',
			},
			{
				type: 'typewriter',
				prefix: '• LinkedIn    - ',
				link: 'https://linkedin.com/in/karlquerel',
				linkText: 'linkedin.com/in/karlquerel',
			},
		],

		pwd: () => [
			{
				type: 'typewriter',
				html: true,
				content: `<span class="text-blue">${fs.pathString().replace('~', '/home/karl')}</span>`,
			},
		],

		ls: args => {
			const tokens = args.trim().split(/\s+/).filter(Boolean)
			const flags = tokens.filter(token => token.startsWith('-')).join('')
			const path = tokens.find(token => !token.startsWith('-')) || ''
			const { entries, error } = fs.list(path, { all: flags.includes('a') })
			if (error) return [{ type: 'output', content: error }]
			if (flags.includes('l')) {
				return entries.map(entry => ({
					type: 'typewriter',
					html: true,
					content: `${entry.type === 'dir' ? 'd' : '-'}rw-r--r--  karl karl  <span class="${fileColor(entry)}">${escapeHtml(entryName(entry))}</span>`,
				}))
			}
			if (entries.length === 0) return [{ type: 'output', content: '' }]
			const row = entries
				.map(
					entry =>
						`<span class="${fileColor(entry)}">${escapeHtml(entryName(entry))}</span>`
				)
				.join('   ')
			return [{ type: 'typewriter', html: true, content: row }]
		},

		cd: args => {
			const { error } = fs.cd(args.trim())
			return error ? [{ type: 'output', content: error }] : []
		},

		cat: (args, stdin) => {
			const file = args.trim()
			if (!file) {
				if (stdin != null) return asLines(stdin)
				return [{ type: 'output', content: 'cat: missing file operand' }]
			}
			const { content, error } = fs.read(file)
			return error ? [{ type: 'output', content: error }] : asLines(content)
		},

		tree: args => {
			const { lines, error } = fs.tree(args.trim())
			if (error) return [{ type: 'output', content: error }]
			return lines.map(line => ({ type: 'typewriter', content: line }))
		},

		grep: (args, stdin) => {
			const trimmed = args.trim()
			const space = trimmed.indexOf(' ')
			let pattern, content
			if (stdin != null && space < 0) {
				// Piped form: `grep pattern` filters stdin (no file argument).
				if (!trimmed) return [{ type: 'output', content: 'usage: grep [text] [file]' }]
				pattern = trimmed
				content = stdin
			} else {
				if (space < 0) return [{ type: 'output', content: 'usage: grep [text] [file]' }]
				pattern = trimmed.slice(0, space)
				const file = fs.read(trimmed.slice(space + 1).trim())
				if (file.error)
					return [{ type: 'output', content: file.error.replace('cat:', 'grep:') }]
				content = file.content
			}
			return content
				.split('\n')
				.filter(line => line.toLowerCase().includes(pattern.toLowerCase()))
				.map(line => ({
					type: 'typewriter',
					html: true,
					content: escapeHtml(line).replace(
						new RegExp(escapeRegExp(pattern), 'gi'),
						match => `<span class="text-yellow">${match}</span>`
					),
				}))
		},

		wc: (args, stdin) => {
			const file = args.trim()
			let content, label
			if (!file && stdin != null) {
				content = stdin
				label = ''
			} else {
				if (!file) return [{ type: 'output', content: 'usage: wc [file]' }]
				const read = fs.read(file)
				if (read.error)
					return [{ type: 'output', content: read.error.replace('cat:', 'wc:') }]
				content = read.content
				label = ` ${file}`
			}
			const lines = content === '' ? 0 : content.split('\n').length
			const words = content.split(/\s+/).filter(Boolean).length
			return [
				{
					type: 'typewriter',
					content: `${String(lines).padStart(4)} ${String(words).padStart(4)} ${String(content.length).padStart(5)}${label}`,
				},
			]
		},

		head: (args, stdin) => {
			const tokens = args.trim().split(/\s+/).filter(Boolean)
			let content, count
			if (stdin != null && (tokens.length === 0 || /^\d+$/.test(tokens[0]))) {
				// Piped form: `head` or `head 5` — a leading number is the count.
				count = Math.max(1, parseInt(tokens[0], 10) || 10)
				content = stdin
			} else {
				const file = tokens[0]
				count = Math.max(1, parseInt(tokens[1], 10) || 10)
				if (!file) return [{ type: 'output', content: 'usage: head [file] [n]' }]
				const read = fs.read(file)
				if (read.error)
					return [{ type: 'output', content: read.error.replace('cat:', 'head:') }]
				content = read.content
			}
			return content
				.split('\n')
				.slice(0, count)
				.map(line => ({ type: 'typewriter', content: line }))
		},

		clear: () => {
			terminalHistory.value = []
			return []
		},

		game: () => {
			router.push('/game')
		},

		whoami: () => [
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-red">You tell me.</span>',
			},
		],

		location: async () => {
			try {
				const position = await new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject, {
						timeout: 10000,
						enableHighAccuracy: true,
					})
				})

				const { latitude, longitude } = position.coords

				const response = await fetch(
					`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
				)

				if (!response.ok) {
					throw new Error('Geocoding failed')
				}

				const data = await response.json()
				const city = data.city || data.locality || 'Unknown City'
				const country = data.countryName || 'Unknown Country'

				return [
					{
						type: 'typewriter',
						html: true,
						content: '<span class="text-green">📍 Location detected!</span>',
					},
					{
						type: 'typewriter',
						html: true,
						content: `• Country     - <span class="text-green">${country}</span>`,
					},
					{
						type: 'typewriter',
						html: true,
						content: `• City        - <span class="text-green">${city}</span>`,
					},
					{
						type: 'typewriter',
						html: true,
						content: `• Accuracy    - <span class="text-blue">±${Math.round(position.coords.accuracy)}m</span>`,
					},
				]
			} catch {
				return [
					{
						type: 'typewriter',
						html: true,
						content: '<span class="text-red">❌ Location access denied</span>',
					},
				]
			}
		},

		date: () => [
			{
				type: 'typewriter',
				html: true,
				content: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
			},
		],

		secret_game: () =>
			runWithSpinner({
				// No intro: just the spinner, then the redirect message once it lands.
				runMs: SECRET_GAME_SPIN_MS,
				finish: () => {
					terminalHistory.value.push({
						type: 'typewriter',
						content: 'Redirecting to scratch game',
					})
					window.open('https://scratch.mit.edu/projects/656157225/', '_blank')
				},
			}),

		greeting: () => [{ type: 'typewriter', content: 'Hello there.' }],

		hello: () => commands.greeting(),
		hi: () => commands.greeting(),
		hey: () => commands.greeting(),

		yako: () => [
			{
				type: 'typewriter',
				image: '/assets/img/Yako_Animations/Idle.gif',
			},
		],

		cowsay: args => {
			const text = args.trim() || 'woof.'
			const border = length => ' ' + '_'.repeat(length)
			return [
				border(text.length + 2),
				`< ${text} >`,
				' ' + '-'.repeat(text.length + 2),
				...COWSAY_MASCOT,
			].map(line => ({ type: 'typewriter', content: line }))
		},

		matrix: () => {
			onMatrix?.()
			return []
		},

		exit: () => {
			setTimeout(() => router.push('/'), 600)
			return [{ type: 'typewriter', content: 'logging out...' }]
		},

		stats: async () => {
			return await handleStatsCommand()
		},

		echo: args => [{ type: 'output', content: args }],

		history: () => {
			const entries = (getHistory?.() || []).slice().reverse()
			if (entries.length === 0) {
				return [{ type: 'output', content: 'No command history yet.' }]
			}
			return entries.map((cmd, i) => ({
				type: 'typewriter',
				html: true,
				content: `<span class="text-blue">${String(i + 1).padStart(3)}</span>  ${escapeHtml(cmd)}`,
			}))
		},

		theme: args => {
			const name = args.trim().toLowerCase()
			if (name && setTheme?.(name)) {
				return [
					{
						type: 'typewriter',
						html: true,
						content: `Phosphor set to <span class="text-green">${name}</span>.`,
					},
				]
			}
			const list = (themeNames || []).join(', ')
			return [
				{
					type: 'typewriter',
					html: true,
					content: name
						? `<span class="text-red">Unknown theme "${escapeHtml(name)}".</span>`
						: 'Usage: theme [name]',
				},
				{
					type: 'typewriter',
					html: true,
					content: `Available: <span class="text-yellow">${list}</span>`,
				},
			]
		},

		sudo: () => [
			{
				type: 'typewriter',
				html: true,
				content:
					'<span class="text-red">You have no power here, Gandalf Storm Crow!</span>',
			},
		],

		man: args => {
			const topic = args.trim().toLowerCase()
			const page = MAN_PAGES[topic]
			return [
				{
					type: 'typewriter',
					html: true,
					content: page
						? escapeHtml(page)
						: topic
							? `No manual entry for <span class="text-red">${escapeHtml(topic)}</span>`
							: 'What manual page do you want? Try: man help',
				},
			]
		},

		neofetch: () => {
			const themeLabel = `Phosphor ${capitalize(getThemeName?.() || 'green')}`
			const info = SYSTEM_INFO.map(([key, value]) => [
				key,
				key === 'Theme' ? themeLabel : value,
			])
			const logoWidth = Math.max(...NEOFETCH_LOGO.map(line => line.length))
			const rows = Math.max(NEOFETCH_LOGO.length, info.length)

			return Array.from({ length: rows }, (_, i) => {
				const logo = (NEOFETCH_LOGO[i] || '').padEnd(logoWidth)
				let right = ''
				if (info[i]) {
					const [key, value] = info[i]
					right = `<span class="text-green">${key}</span>: <span class="text-blue">${escapeHtml(value)}</span>`
				}
				return {
					type: 'typewriter',
					html: true,
					content: `<span class="text-yellow">${escapeHtml(logo)}</span>   ${right}`,
				}
			})
		},
	}

	const availableFiles = ['why_i_left_finance.txt', 'install_sentience.sh']

	const executableScripts = {
		'install_sentience.sh': () => [
			{
				type: 'typewriter',
				html: true,
				content:
					'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.',
			},
		],
	}

	const simulateScriptExecution = (scriptName, scriptFunction) =>
		runWithSpinner({
			intro: {
				type: 'output',
				html: true,
				content: `Executing <span class="text-green">${scriptName}</span>`,
			},
			runMs: INSTALL_SPIN_MS,
			finish: () => {
				const output = scriptFunction()
				if (Array.isArray(output)) {
					terminalHistory.value.push(...output)
				}
			},
		})

	// --- Pipes -------------------------------------------------------------
	// Convert a command's line objects into the plain text the next pipe segment
	// reads: drop image lines, take link text, strip generated <tags> and reverse
	// escapeHtml's three entities so a value round-trips cleanly through a chain.
	const decodeEntities = text =>
		text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

	const toStdin = lineObjects =>
		lineObjects
			.filter(line => !line.image)
			.map(line => {
				if (line.link) return `${line.prefix || ''}${line.linkText || ''}`
				const raw = line.content || ''
				return line.html ? decodeEntities(raw.replace(/<[^>]*>/g, '')) : raw
			})
			.join('\n')

	// Run a single known command, returning its output (array or Promise) without
	// touching history. null => not a known command (the caller picks the UX).
	const runCommand = (command, args, stdin) => {
		const handler = commands[command]
		return typeof handler === 'function' ? handler(args, stdin) : null
	}

	// The full-line "unknown command" UX: a random quip plus a nearest-match hint.
	const pushUnknown = (label, command) => {
		const responses = [
			{
				type: 'output',
				html: true,
				content: `I do not know "<span class="text-red">${label}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`,
			},
			{
				type: 'output',
				html: true,
				content: `Premium command "<span class="text-red">${label}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`,
			},
			{
				type: 'output',
				html: true,
				content: `"<span class="text-red">${label}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`,
			},
			{
				type: 'output',
				html: true,
				content: `I'm <span class="text-green">92%</span> sure "<span class="text-red">${label}</span>" was <span class="text-purple">made up</span>.`,
			},
			{
				type: 'output',
				html: true,
				content: `"<span class="text-red">${label}</span>" is above my <span class="text-yellow">pay grade</span>.`,
			},
			{
				type: 'output',
				html: true,
				content: `I could try to run "<span class="text-red">${label}</span>", but then we'd both be disappointed.`,
			},
		]
		terminalHistory.value.push(responses[Math.floor(Math.random() * responses.length)])
		const suggestion = nearestCommand(command)
		if (suggestion) {
			terminalHistory.value.push({
				type: 'output',
				html: true,
				content: `Did you mean <span class="text-green">${suggestion}</span>?`,
			})
		}
	}

	const executeCommand = input => {
		const trimmedInput = input.trim()
		if (!trimmedInput) return

		terminalHistory.value.push({ type: 'command', content: trimmedInput })

		const firstWord = trimmedInput.split(' ')[0]

		// ./scripts run via the spinner path and are not pipeable.
		if (firstWord.startsWith('./')) {
			const scriptName = firstWord.substring(2)
			let targetScript = null
			if (executableScripts[scriptName]) {
				targetScript = scriptName
			} else {
				const possibleNames = [scriptName + '.sh', scriptName + '.exe', scriptName]
				for (const name of possibleNames) {
					if (executableScripts[name]) {
						targetScript = name
						break
					}
				}
			}
			if (targetScript) {
				simulateScriptExecution(targetScript, executableScripts[targetScript])
			} else {
				terminalHistory.value.push({
					type: 'output',
					content: `bash: ${firstWord}: No such file or directory`,
				})
			}
			return
		}

		// Split into pipeline segments (naive split — quoting is out of scope).
		// A single command is just a length-1 pipeline with no stdin, so every
		// existing command keeps its exact behaviour through this same loop.
		const segments = trimmedInput
			.split('|')
			.map(segment => segment.trim())
			.filter(Boolean)
		const isPipeline = segments.length > 1

		let stdin
		for (let i = 0; i < segments.length; i++) {
			const parts = segments[i].split(' ')
			const command = parts[0].toLowerCase()
			const args = parts.slice(1).join(' ')
			const isLast = i === segments.length - 1
			const result = runCommand(command, args, stdin)

			if (result === null) {
				if (isPipeline) {
					terminalHistory.value.push({
						type: 'output',
						content: `${command}: command not found`,
					})
				} else {
					pushUnknown(trimmedInput, command)
				}
				return
			}

			// Async commands (location/stats) only make sense run on their own.
			if (result instanceof Promise) {
				if (isPipeline) {
					terminalHistory.value.push({
						type: 'output',
						content: `${command}: not supported in a pipeline`,
					})
					return
				}
				// Spin while we wait — unless the command already drives the
				// spinner itself (e.g. secret_game sets it synchronously on call).
				const stop = isExecutingScript.value ? null : startSpinner()
				result
					.then(resolved => {
						if (Array.isArray(resolved)) {
							terminalHistory.value.push(...resolved)
						}
					})
					.finally(() => stop?.())
				return
			}

			const output = Array.isArray(result) ? result : []
			if (isLast) {
				terminalHistory.value.push(...output)
			} else {
				// `ls` short form is one space-joined row; break it into one entry
				// per line so `ls | grep`/`wc` behave (long form already is).
				stdin =
					command === 'ls' && !/-\w*l/.test(args)
						? toStdin(output)
								.split(/\s{2,}/)
								.join('\n')
						: toStdin(output)
			}
		}
	}

	return {
		commands,
		availableFiles,
		executableScripts,
		terminalHistory,
		isExecutingScript,
		spinnerFrame,
		executeCommand,
		fsComplete: fs.completions,
	}
}
