const startingWith = (names, token) => names.filter(name => name.startsWith(token)).sort()

const longestCommonPrefix = items => {
	let prefix = items[0]
	for (const item of items) {
		while (!item.startsWith(prefix)) prefix = prefix.slice(0, -1)
		if (!prefix) break
	}
	return prefix
}

// Candidates for the last token: commands first, theme names after `theme`, else paths.
const candidates = (input, { commandNames, scriptNames, themeNames, fsComplete }) => {
	const parts = input.split(' ')
	const token = parts[parts.length - 1]
	if (parts.length === 1) {
		if (token.startsWith('./')) {
			const name = token.slice(2).toLowerCase()
			return scriptNames
				.filter(script => script.toLowerCase().startsWith(name))
				.sort()
				.map(script => './' + script)
		}
		return startingWith(commandNames, token.toLowerCase())
	}
	const command = parts[0].toLowerCase()
	if (command === 'theme') return startingWith(themeNames, token.toLowerCase())
	if (command === 'help' || command === 'man') {
		return startingWith(commandNames, token.toLowerCase())
	}
	return fsComplete(token)
}

// The line after Tab: a unique match completes, several complete as far as their shared prefix.
export const complete = (input, sources) => {
	const matches = candidates(input, sources)
	if (matches.length === 0) return input
	const parts = input.split(' ')
	const token = parts[parts.length - 1]
	const completion = matches.length === 1 ? matches[0] : longestCommonPrefix(matches)
	if (completion.length <= token.length && matches.length > 1) return input
	parts[parts.length - 1] = completion
	return parts.join(' ')
}

// Fish-style ghost: the newest matching history entry, else a command name.
export const suggest = (input, history, commandNames) => {
	if (!input) return ''
	const fromHistory = history.find(
		entry => entry.startsWith(input) && entry.length > input.length
	)
	if (fromHistory) return fromHistory
	if (input.includes(' ')) return ''
	return (
		[...commandNames]
			.sort()
			.find(name => name.startsWith(input) && name.length > input.length) || ''
	)
}
