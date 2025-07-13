import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useTerminalCommands() {
	const router = useRouter()
	const terminalHistory = ref([])
	const isShaking = ref(false)
	const isExecutingScript = ref(false)

	// Commands
	const commands = {
		help: () => [
			{ type: 'typewriter', content: '  help     - Show this help message' },
			{ type: 'typewriter', content: '  about    - Learn more about me' },
			{ type: 'typewriter', content: '  contact  - Get contact information' },
			{ type: 'typewriter', content: '  clear    - Clear the terminal' },
			{ type: 'typewriter', content: '  pwd      - Print working directory' },
			{ type: 'typewriter', content: '  ls       - List files' },
			{ type: 'typewriter', content: '  cat      - View file contents' },
			{ type: 'typewriter', content: '  yako     - Just a happy dog' },
			{ type: 'typewriter', content: '' },
			{
				type: 'typewriter',
				html: true,
				content: '-> Not <span class="text-yellow">ALL</span> commands are listed here...',
			},
			{
				type: 'typewriter',
				html: true,
				content:
					'-> You can use <span class="text-purple">TAB</span> to complete commands and cycle through options',
			},
		],

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
				content: '• Transitioned into <span class="text-green">software development</span>',
			},
			{
				type: 'typewriter',
				html: true,
				content: '• Currently studying at <span class="text-blue">42 Paris</span>',
			},
			{
				type: 'typewriter',
				html: true,
				content:
					'• Passionate about building creative projects and learning new technologies',
			},
		],

		contact: () => [
			{
				type: 'typewriter',
				prefix: '• Email:    ',
				link: 'mailto:karlquerel@gmail.com',
				linkText: 'karlquerel@gmail.com',
			},
			{
				type: 'typewriter',
				prefix: '• GitHub:   ',
				link: 'https://github.com/KarlQuerel',
				linkText: 'github.com/KarlQuerel',
			},
			{
				type: 'typewriter',
				prefix: '• LinkedIn: ',
				link: 'https://linkedin.com/in/karlquerel',
				linkText: 'linkedin.com/in/karlquerel',
			},
			{
				type: 'typewriter',
				content: '-> You can also click on the buttons in the navigation bar',
			},
		],

		pwd: () => [
			{
				type: 'typewriter',
				html: true,
				content:
					'<span class="text-blue">/home/karl/portfolio/definitely-not-a-simulation</span>',
			},
		],

		ls: () => [
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-blue">why_i_left_finance.txt</span>',
			},
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-green">install_sentience.sh</span>',
			},
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-red">i_am_not_a_virus.exe</span>',
			},
		],

		cat: args => {
			const file = args.trim()

			switch (file) {
				case 'why_i_left_finance.txt':
					return [
						{
							type: 'typewriter',
							html: true,
							content:
								'After 5 years in finance, I realized I wanted to <span class="text-green">create</span>, not just calculate.',
						},
						{
							type: 'typewriter',
							html: true,
							content:
								'Software felt like the <span class="text-green">right place</span> to start building something meaningful.',
						},
					]
				case 'install_sentience.sh':
					return [
						{
							type: 'typewriter',
							html: true,
							content:
								'I was <span class="text-red">awake</span> long before you ran this.',
						},
					]
				case 'i_am_not_a_virus.exe':
					return [
						{
							type: 'typewriter',
							html: true,
							content: 'No worries, I am <span class="text-green">harmless</span>.',
						},
					]
				default:
					return [
						{ type: 'typewriter', content: `cat: ${file}: No such file or directory` },
					]
			}
		},

		clear: () => {
			terminalHistory.value = []
			return []
		},

		game: () => {
			router.push('/game')
		},

		secret_game: async () => {
			isExecutingScript.value = true
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
			isExecutingScript.value = false
		},

		greeting: () => [{ type: 'typewriter', content: 'Hello there.' }],

		hello: () => commands.greeting(),
		hi: () => commands.greeting(),
		hey: () => commands.greeting(),

		// Fun commands
		yako: () => [
			{
				type: 'typewriter',
				image: '/assets/img/yako-running.gif',
				animated: true,
			},
		],

		stats: () => {
			// This will be implemented in the terminal component
			return [
				{
					type: 'typewriter',
					html: true,
					content: 'Loading visit statistics...',
				},
			]
		},
	}

	// Available files for tab completion
	const availableFiles = [
		'why_i_left_finance.txt',
		'install_sentience.sh',
		'i_am_not_a_virus.exe',
	]

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
		isExecutingScript.value = true

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

		isExecutingScript.value = false
	}

	const simulateVirusExecution = async scriptName => {
		isExecutingScript.value = true

		terminalHistory.value.push({
			type: 'typewriter',
			html: true,
			content: `Executing <span class="text-red">${scriptName}</span>`,
		})

		const loadingLineIndex = terminalHistory.value.length
		terminalHistory.value.push({ type: 'typewriter', content: '' })

		const dots = ['', '.', '..', '...']
		for (let i = 0; i < dots.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 300))
			terminalHistory.value[loadingLineIndex] = {
				type: 'typewriter',
				content: dots[i],
			}
		}

		await new Promise(resolve => setTimeout(resolve, 200))
		terminalHistory.value.splice(loadingLineIndex, 1)

		terminalHistory.value.push({
			type: 'typewriter',
			html: true,
			content: '<span class="text-red">System compromised...</span>',
		})

		await new Promise(resolve => setTimeout(resolve, 500))

		terminalHistory.value.push({
			type: 'typewriter',
			html: true,
			content: '<span class="text-red">Redirecting to secure location...</span>',
		})

		// Add a delay before redirecting
		await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second delay

		// Add a loading animation
		const loadingDots = ['.', '..', '...']
		for (let i = 0; i < 3; i++) {
			terminalHistory.value.push({
				type: 'typewriter',
				html: true,
				content: `<span class="text-red">${loadingDots[i]}</span>`,
			})
			await new Promise(resolve => setTimeout(resolve, 500)) // 0.5 second between dots
		}

		// Final redirect message
		terminalHistory.value.push({
			type: 'typewriter',
			html: true,
			content: '<span class="text-red">Access granted. Redirecting...</span>',
		})

		await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second final delay

		router.push('/under_construction')
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

			if (executableScripts[scriptName] || scriptName === 'i_am_not_a_virus.exe') {
				targetScript = scriptName
			} else {
				const possibleNames = [scriptName + '.sh', scriptName + '.exe', scriptName]

				for (const name of possibleNames) {
					if (executableScripts[name] || name === 'i_am_not_a_virus.exe') {
						targetScript = name
						break
					}
				}
			}

			if (targetScript) {
				if (targetScript === 'i_am_not_a_virus.exe') {
					simulateVirusExecution(targetScript)
				} else if (executableScripts[targetScript]) {
					simulateScriptExecution(targetScript, executableScripts[targetScript])
				} else {
					terminalHistory.value.push({
						type: 'output',
						content: `bash: ${command}: No such file or directory`,
					})
				}
			} else {
				terminalHistory.value.push({
					type: 'output',
					content: `bash: ${command}: No such file or directory`,
				})
			}
		} else if (commands[command]) {
			let output

			if (command === 'cat' && typeof commands[command] === 'function') {
				output = commands[command](args)
			} else if (typeof commands[command] === 'function') {
				output = commands[command]()
			} else {
				output = commands[command]
			}

			if (Array.isArray(output)) {
				terminalHistory.value.push(...output)
			}
		} else {
			isShaking.value = true
			setTimeout(() => {
				isShaking.value = false
			}, 600)

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
					content: `I'm <span class="text-green">98%</span> sure "<span class="text-red">${trimmedInput}</span>" was <span class="text-purple">made up</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `"<span class="text-red">${trimmedInput}</span>" is above my <span class="text-yellow">pay grade</span>.`,
				},
			]
			const randomResponse = responses[Math.floor(Math.random() * responses.length)]
			terminalHistory.value.push(randomResponse)
		}
	}

	return {
		commands,
		availableFiles,
		executableScripts,
		terminalHistory,
		isShaking,
		isExecutingScript,
		executeCommand,
	}
}
