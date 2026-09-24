import { SUGGESTION_MAX_DISTANCE, UNKNOWN_COMMAND_QUIPS } from '@/constants/terminal'
import { escapeHtml } from './terminalText'

const say = content => ({ type: 'output', html: true, content })

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

const nearest = (input, names) => {
	let best = null
	let bestDistance = Infinity
	for (const name of names) {
		const distance = levenshtein(input, name)
		if (distance < bestDistance) {
			bestDistance = distance
			best = name
		}
	}
	return bestDistance <= SUGGESTION_MAX_DISTANCE ? best : null
}

// A random quip about the typed line, plus a "Did you mean" when a command is close enough.
export function unknownCommandLines(typed, command, names) {
	const quip = UNKNOWN_COMMAND_QUIPS[Math.floor(Math.random() * UNKNOWN_COMMAND_QUIPS.length)]
	const lines = [say(quip(escapeHtml(typed)))]
	const suggestion = nearest(command, names)
	if (suggestion) {
		lines.push(say(`Did you mean <span class="text-green">${suggestion}</span>?`))
	}
	return lines
}
