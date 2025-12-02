import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVisitTracker } from './useVisitTracker'
import type { TerminalLine, Commands } from '../../types/terminal'

interface UseTerminalCommandsReturn {
	commands: Commands
	availableFiles: string[]
	executableScripts: Commands
	terminalHistory: TerminalLine[]
	executeCommand: (input: string) => Promise<void>
}

export function useTerminalCommands(): UseTerminalCommandsReturn {
	const navigate = useNavigate()
	const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([])
	const { getVisitStats, loadVisitData } = useVisitTracker()

	const handleStatsCommand = async (): Promise<TerminalLine[]> => {
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
	const commands: Commands = {
		help: () => [
			{
				type: 'typewriter',
				html: true,
				content: '• <span class="text-yellow">help</span>        - Show this help message',
			},
			{
				type: 'typewriter',
				html: true,
				content: '• <span class="text-mint">about</span>       - Learn more about me',
			},
			{
				type: 'typewriter',
				html: true,
				content: '• <span class="text-cream">stats</span>       - View terminal statistics',
			},
			{
				type: 'typewriter',
				html: true,
				content: '• <span class="text-purple">contact</span>     - Get contact information',
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

		cat: (args?: string): TerminalLine[] => {
			const file = (args || '').trim()

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
					return [{ type: 'output', content: `cat: ${file}: No such file or directory` }]
			}
		},

		clear: () => {
			setTerminalHistory([])
			return []
		},

		game: () => {
			navigate('/game')
		},

		whoami: () => [
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-red">You tell me.</span>',
			},
		],

		location: async (): Promise<TerminalLine[]> => {
			try {
				const position = await new Promise<GeolocationPosition>((resolve, reject) => {
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

		secret_game: async (): Promise<void> => {
			setTerminalHistory(prev => [
				...prev,
				{
					type: 'typewriter',
					html: true,
					content: 'Launching secret game',
				},
			])

			const loadingLineIndex = terminalHistory.length
			setTerminalHistory(prev => [...prev, { type: 'typewriter', content: '' }])

			const dots = ['', '.', '..', '...', '....']
			for (let i = 0; i < dots.length; i++) {
				await new Promise(resolve => setTimeout(resolve, 600))
				setTerminalHistory(prev => {
					const newHistory = [...prev]
					newHistory[loadingLineIndex] = {
						type: 'typewriter',
						content: dots[i],
					}
					return newHistory
				})
			}
			window.open('https://scratch.mit.edu/projects/656157225/', '_blank')
			setTerminalHistory(prev => {
				const newHistory = [...prev]
				newHistory.splice(loadingLineIndex, 1)
				return newHistory
			})
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

		stats: async () => {
			return await handleStatsCommand()
		},
	}

	// Available files for tab completion
	const availableFiles = [
		'why_i_left_finance.txt',
		'install_sentience.sh',
		'i_am_not_a_virus.exe',
	]

	// Executable scripts
	const executableScripts: Commands = {
		'install_sentience.sh': () => [
			{
				type: 'typewriter',
				html: true,
				content:
					'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.',
			},
		],
	}

	const simulateScriptExecution = async (
		scriptName: string,
		scriptFunction: () => TerminalLine[]
	): Promise<void> => {
		setTerminalHistory(prev => [
			...prev,
			{
				type: 'output',
				html: true,
				content: `Executing <span class="text-green">${scriptName}</span>`,
			},
		])

		const loadingLineIndex = terminalHistory.length
		setTerminalHistory(prev => [...prev, { type: 'output', content: '' }])

		const dots = ['', '.', '..', '...']
		for (let i = 0; i < dots.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 500))
			setTerminalHistory(prev => {
				const newHistory = [...prev]
				newHistory[loadingLineIndex] = {
					type: 'output',
					content: dots[i],
				}
				return newHistory
			})
		}

		await new Promise(resolve => setTimeout(resolve, 800))

		setTerminalHistory(prev => {
			const newHistory = [...prev]
			newHistory.splice(loadingLineIndex, 1)
			return newHistory
		})
		const output = scriptFunction()
		if (Array.isArray(output)) {
			setTerminalHistory(prev => [...prev, ...output])
		}
	}

	const simulateVirusExecution = async (scriptName: string): Promise<void> => {
		setTerminalHistory(prev => [
			...prev,
			{
				type: 'typewriter',
				html: true,
				content: `Executing <span class="text-red">${scriptName}</span>`,
			},
		])

		const loadingLineIndex = terminalHistory.length
		setTerminalHistory(prev => [...prev, { type: 'typewriter', content: '' }])

		const dots = ['', '.', '..', '...']
		for (let i = 0; i < dots.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 300))
			setTerminalHistory(prev => {
				const newHistory = [...prev]
				newHistory[loadingLineIndex] = {
					type: 'typewriter',
					content: dots[i],
				}
				return newHistory
			})
		}

		await new Promise(resolve => setTimeout(resolve, 200))
		setTerminalHistory(prev => {
			const newHistory = [...prev]
			newHistory.splice(loadingLineIndex, 1)
			return newHistory
		})

		setTerminalHistory(prev => [
			...prev,
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-red">System compromised...</span>',
			},
		])

		await new Promise(resolve => setTimeout(resolve, 500))

		setTerminalHistory(prev => [
			...prev,
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-red">Redirecting to secure location...</span>',
			},
		])

		// Add a delay before redirecting
		await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second delay

		// Add a loading animation
		const loadingDots = ['.', '..', '...']
		for (let i = 0; i < 3; i++) {
			setTerminalHistory(prev => [
				...prev,
				{
					type: 'typewriter',
					html: true,
					content: `<span class="text-red">${loadingDots[i]}</span>`,
				},
			])
			await new Promise(resolve => setTimeout(resolve, 500)) // 0.5 second between dots
		}

		// Final redirect message
		setTerminalHistory(prev => [
			...prev,
			{
				type: 'typewriter',
				html: true,
				content: '<span class="text-red">Access granted. Redirecting...</span>',
			},
		])

		await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second final delay

		navigate('/under_construction')
	}

	const executeCommand = async (input: string): Promise<void> => {
		const trimmedInput = input.trim()
		if (!trimmedInput) return

		setTerminalHistory(prev => [...prev, { type: 'command', content: trimmedInput }])

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
					const scriptFunc = executableScripts[targetScript]
					if (scriptFunc && typeof scriptFunc === 'function') {
						simulateScriptExecution(targetScript, () => {
							const result = scriptFunc()
							return Array.isArray(result) ? result : []
						})
					}
				} else {
					setTerminalHistory(prev => [
						...prev,
						{
							type: 'output',
							content: `bash: ${command}: No such file or directory`,
						},
					])
				}
			} else {
				setTerminalHistory(prev => [
					...prev,
					{
						type: 'output',
						content: `bash: ${command}: No such file or directory`,
					},
				])
			}
		} else if (commands[command]) {
			let output

			if (command === 'cat' && typeof commands[command] === 'function') {
				output = commands[command](args)
			} else if (typeof commands[command] === 'function') {
				const result = commands[command]()
				if (result instanceof Promise) {
					result.then(output => {
						if (Array.isArray(output)) {
							setTerminalHistory(prev => [...prev, ...output])
						}
					})
					return
				} else {
					output = result
				}
			} else {
				output = commands[command]
			}

			if (Array.isArray(output)) {
				setTerminalHistory(prev => [...prev, ...output])
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
			]
			const randomResponse = responses[Math.floor(Math.random() * responses.length)]
			setTerminalHistory(prev => [...prev, randomResponse])
		}
	}

	return {
		commands,
		availableFiles,
		executableScripts,
		terminalHistory,
		executeCommand,
	}
}
