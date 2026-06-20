import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MAN_PAGES, NEOFETCH_LOGO, SYSTEM_INFO, COWSAY_MASCOT } from '@/constants/terminal'
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

	// Commands
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
			return [
				{
					type: 'typewriter',
					html: true,
					content:
						'• <span class="text-yellow">help</span>        - Show this help message',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-mint">about</span>       - Learn more about me',
				},
				{
					type: 'typewriter',
					html: true,
					content:
						'• <span class="text-cream">stats</span>       - View terminal statistics',
				},
				{
					type: 'typewriter',
					html: true,
					content:
						'• <span class="text-purple">contact</span>     - Get contact information',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-red">clear</span>       - Clear the terminal',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-blue">ls</span>          - List files',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-orange">location</span>    - Show your location',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-green">yako</span>        - Just a happy dog',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-azure">neofetch</span>    - Show system info',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-blue">echo</span>        - Print some text',
				},
				{
					type: 'typewriter',
					html: true,
					content: '• <span class="text-mint">theme</span>       - Recolour the phosphor',
				},
				{ type: 'typewriter', content: '' },
				{
					type: 'typewriter',
					html: true,
					content:
						'-> Not <span class="text-yellow">ALL</span> commands are listed here...',
				},
				{
					type: 'typewriter',
					html: true,
					content: '-> <span class="text-purple">TAB</span> completes commands and paths',
				},
				{
					type: 'typewriter',
					html: true,
					content:
						'-> also: <span class="text-blue">cd cat tree grep wc head pwd</span> · <span class="text-green">cowsay matrix</span> · <span class="text-purple">man history date</span>',
				},
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

		cat: args => {
			const file = args.trim()
			if (!file) return [{ type: 'output', content: 'cat: missing file operand' }]
			const { content, error } = fs.read(file)
			return error ? [{ type: 'output', content: error }] : asLines(content)
		},

		tree: args => {
			const { lines, error } = fs.tree(args.trim())
			if (error) return [{ type: 'output', content: error }]
			return lines.map(line => ({ type: 'typewriter', content: line }))
		},

		grep: args => {
			const trimmed = args.trim()
			const space = trimmed.indexOf(' ')
			if (space < 0) return [{ type: 'output', content: 'usage: grep [text] [file]' }]
			const pattern = trimmed.slice(0, space)
			const { content, error } = fs.read(trimmed.slice(space + 1).trim())
			if (error) return [{ type: 'output', content: error.replace('cat:', 'grep:') }]
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

		wc: args => {
			const file = args.trim()
			if (!file) return [{ type: 'output', content: 'usage: wc [file]' }]
			const { content, error } = fs.read(file)
			if (error) return [{ type: 'output', content: error.replace('cat:', 'wc:') }]
			const lines = content === '' ? 0 : content.split('\n').length
			const words = content.split(/\s+/).filter(Boolean).length
			return [
				{
					type: 'typewriter',
					content: `${String(lines).padStart(4)} ${String(words).padStart(4)} ${String(content.length).padStart(5)} ${file}`,
				},
			]
		},

		head: args => {
			const tokens = args.trim().split(/\s+/).filter(Boolean)
			const file = tokens[0]
			const count = Math.max(1, parseInt(tokens[1], 10) || 10)
			if (!file) return [{ type: 'output', content: 'usage: head [file] [n]' }]
			const { content, error } = fs.read(file)
			if (error) return [{ type: 'output', content: error.replace('cat:', 'head:') }]
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

		secret_game: async () => {
			terminalHistory.value.push({
				type: 'typewriter',
				html: true,
				content: 'Launching secret game',
			})

			const loadingLineIndex = terminalHistory.value.length
			terminalHistory.value.push({ type: 'typewriter', content: '' })

			const dots = ['', '.', '..', '...', '....']
			for (let i = 0; i < dots.length; i++) {
				await new Promise(resolve => setTimeout(resolve, 600))
				terminalHistory.value[loadingLineIndex] = {
					type: 'typewriter',
					content: dots[i],
				}
			}
			window.open('https://scratch.mit.edu/projects/656157225/', '_blank')
			terminalHistory.value.splice(loadingLineIndex, 1)
		},

		greeting: () => [{ type: 'typewriter', content: 'Hello there.' }],

		hello: () => commands.greeting(),
		hi: () => commands.greeting(),
		hey: () => commands.greeting(),

		// Fun commands
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

	// Available files for tab completion
	const availableFiles = ['why_i_left_finance.txt', 'install_sentience.sh']

	// Executable scripts
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

	const simulateScriptExecution = async (scriptName, scriptFunction) => {
		terminalHistory.value.push({
			type: 'output',
			html: true,
			content: `Executing <span class="text-green">${scriptName}</span>`,
		})

		const loadingLineIndex = terminalHistory.value.length
		terminalHistory.value.push({ type: 'output', content: '' })

		const dots = ['', '.', '..', '...']
		for (let i = 0; i < dots.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 500))
			terminalHistory.value[loadingLineIndex] = {
				type: 'output',
				content: dots[i],
			}
		}

		await new Promise(resolve => setTimeout(resolve, 800))

		terminalHistory.value.splice(loadingLineIndex, 1)
		const output = scriptFunction()
		if (Array.isArray(output)) {
			terminalHistory.value.push(...output)
		}
	}

	const executeCommand = input => {
		const trimmedInput = input.trim()
		if (!trimmedInput) return

		terminalHistory.value.push({ type: 'command', content: trimmedInput })

		const parts = trimmedInput.split(' ')
		const command = parts[0].toLowerCase()
		const args = parts.slice(1).join(' ')

		if (command.startsWith('./')) {
			const scriptName = command.substring(2)
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
					content: `bash: ${command}: No such file or directory`,
				})
			}
		} else if (commands[command]) {
			let output

			if (typeof commands[command] === 'function') {
				const result = commands[command](args)
				if (result instanceof Promise) {
					result.then(resolved => {
						if (Array.isArray(resolved)) {
							terminalHistory.value.push(...resolved)
						}
					})
					return
				}
				output = result
			} else {
				output = commands[command]
			}

			if (Array.isArray(output)) {
				terminalHistory.value.push(...output)
			}
		} else {
			const responses = [
				{
					type: 'output',
					html: true,
					content: `I do not know "<span class="text-red">${trimmedInput}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`,
				},
				{
					type: 'output',
					html: true,
					content: `Premium command "<span class="text-red">${trimmedInput}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `"<span class="text-red">${trimmedInput}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `I'm <span class="text-green">92%</span> sure "<span class="text-red">${trimmedInput}</span>" was <span class="text-purple">made up</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `"<span class="text-red">${trimmedInput}</span>" is above my <span class="text-yellow">pay grade</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `I could try to run "<span class="text-red">${trimmedInput}</span>", but then we'd both be disappointed.`,
				},
			]
			const randomResponse = responses[Math.floor(Math.random() * responses.length)]
			terminalHistory.value.push(randomResponse)
			const suggestion = nearestCommand(command)
			if (suggestion) {
				terminalHistory.value.push({
					type: 'output',
					html: true,
					content: `Did you mean <span class="text-green">${suggestion}</span>?`,
				})
			}
		}
	}

	return {
		commands,
		availableFiles,
		executableScripts,
		terminalHistory,
		executeCommand,
		fsComplete: fs.completions,
	}
}
