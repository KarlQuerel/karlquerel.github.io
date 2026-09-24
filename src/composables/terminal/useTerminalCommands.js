import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SCRIPT_SPIN_MS, TRACKED_FILES } from '@/constants/terminal'
import { useTerminalFs } from './useTerminalFs'
import { useTerminalSpinner } from './useTerminalSpinner'
import { createFsCommands } from './fsCommands'
import { createFunCommands } from './funCommands'
import { createInfoCommands } from './infoCommands'
import { createSystemCommands } from './systemCommands'
import { unknownCommandLines } from './unknownCommand'
import { escapeHtml, toStdin } from './terminalText'

const EXECUTABLE_SCRIPTS = {
	'install_sentience.sh': () => [
		{
			type: 'typewriter',
			html: true,
			content: 'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.',
		},
	],
}

const findScript = name =>
	[name, `${name}.sh`, `${name}.exe`].find(candidate =>
		Object.hasOwn(EXECUTABLE_SCRIPTS, candidate)
	)

// The shell: owns the scrollback and runs a typed line (./scripts, pipelines, unknown commands).
export function useTerminalCommands({
	loadVisitStats,
	setTheme,
	themeNames,
	getThemeName,
	getHistory,
	onMatrix,
	onCommand,
}) {
	const router = useRouter()
	const terminalHistory = ref([])
	const fs = useTerminalFs()
	const { isSpinning, spinnerFrame, startSpinner, spinFor } = useTerminalSpinner()

	const print = (...lines) => terminalHistory.value.push(...lines)
	const clear = () => {
		terminalHistory.value = []
	}

	const commands = {
		...createInfoCommands({ loadVisitStats, getThemeName }),
		...createFsCommands(fs),
		...createSystemCommands({
			clear,
			getHistory,
			setTheme,
			themeNames,
			leave: () => router.push('/'),
		}),
		...createFunCommands({ spinFor, print, onMatrix }),
	}
	const commandNames = Object.keys(commands)

	const usageName = command =>
		Object.hasOwn(commands, command) ||
		(command.startsWith('./') && findScript(command.slice(2))) ||
		TRACKED_FILES.includes(command) ||
		Object.hasOwn(EXECUTABLE_SCRIPTS, command)
			? command
			: 'invalid'

	const runScript = path => {
		const name = findScript(path.slice(2))
		if (!name) {
			print({ type: 'output', content: `bash: ${path}: No such file or directory` })
			return
		}
		print({
			type: 'output',
			html: true,
			content: `Executing <span class="text-green">${escapeHtml(name)}</span>`,
		})
		spinFor(SCRIPT_SPIN_MS, () => print(...EXECUTABLE_SCRIPTS[name]()))
	}

	const awaitOutput = promise => {
		// commands that drive the spinner themselves (secret_game) already started it
		const stop = isSpinning.value ? null : startSpinner()
		promise
			.then(lines => {
				if (Array.isArray(lines)) print(...lines)
			})
			.finally(() => stop?.())
	}

	// Naive `|` split (no quoting); a single command is a length-1 pipeline.
	const runPipeline = line => {
		const segments = line
			.split('|')
			.map(segment => segment.trim())
			.filter(Boolean)
		const isPipeline = segments.length > 1

		let stdin
		for (let i = 0; i < segments.length; i++) {
			const parts = segments[i].split(' ')
			const command = parts[0].toLowerCase()
			const args = parts.slice(1).join(' ')

			if (!Object.hasOwn(commands, command)) {
				if (isPipeline) print({ type: 'output', content: `${command}: command not found` })
				else print(...unknownCommandLines(line, command, commandNames))
				return
			}

			const result = commands[command](args, stdin)
			if (result instanceof Promise) {
				if (isPipeline) {
					print({ type: 'output', content: `${command}: not supported in a pipeline` })
				} else {
					awaitOutput(result)
				}
				return
			}

			if (i === segments.length - 1) {
				print(...result)
			} else {
				// `ls` short form is one space-joined row; one entry per line lets `ls | grep` work
				const text = toStdin(result)
				stdin =
					command === 'ls' && !/-\w*l/.test(args) ? text.split(/\s{2,}/).join('\n') : text
			}
		}
	}

	const executeCommand = input => {
		const line = input.trim()
		if (!line) return
		const first = line.split(' ')[0]
		onCommand(usageName(first))
		print({ type: 'command', content: line })
		if (first.startsWith('./')) runScript(first)
		else runPipeline(line)
	}

	const interrupt = input => print({ type: 'command', content: `${input}^C` })

	return {
		commandNames,
		scriptNames: Object.keys(EXECUTABLE_SCRIPTS),
		terminalHistory,
		isSpinning,
		spinnerFrame,
		executeCommand,
		clear,
		interrupt,
		fsComplete: fs.completions,
	}
}
