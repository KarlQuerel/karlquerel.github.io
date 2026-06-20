/***	TERMINAL		***/
// Shared, hardcoded values for the fake shell on the /terminal page.
// Anything a command or the prompt needs to render lives here so the
// composables and components stay logic-only.

// The shell prompt, split into coloured segments: user@host:path$
// Rendered by TerminalPrompt.vue and echoed in front of every command.
export const PROMPT = {
	user: 'karl',
	host: 'portfolio',
	path: '~',
	symbol: '$',
}

// Title shown in the window chrome (top bar), mimicking a real terminal tab.
export const WINDOW_TITLE = `${PROMPT.user}@${PROMPT.host}: ${PROMPT.path} — bash`

// Phosphor themes the `theme` command can switch between. The key is what the
// user types; `color` maps to the --phosphor CSS variable on the window.
export const THEMES = {
	green: '#33ff66',
	amber: '#ffb000',
	blue: '#66d9ff',
	paper: '#e8e8e8',
}

export const DEFAULT_THEME = 'green'

// Persisted command history (arrow-up recall) survives reloads via this key.
export const HISTORY_STORAGE_KEY = 'terminal.commandHistory'
export const HISTORY_LIMIT = 100

// neofetch-style readout. Pure flavour; values are static on purpose.
export const SYSTEM_INFO = [
	['OS', 'PortfolioOS 4.2 (retro)'],
	['Host', 'karlquerel.github.io'],
	['Kernel', 'vue-3.x'],
	['Shell', 'bash (barely)'],
	['Resolution', 'looks-good-on-your-screen'],
	['Theme', 'Phosphor Green'],
	['CPU', '1x Caffeine Core'],
	['Memory', '5 yrs finance / ∞ curiosity'],
]

// Tiny ASCII mascot printed next to the neofetch info.
export const NEOFETCH_LOGO = ['  ___ ', ' (o o)', '(  V  )', '--m-m-']

// One-line man-page blurbs keyed by command name.
export const MAN_PAGES = {
	help: 'help - list the commands you are allowed to know about.',
	about: 'about - a short, honest summary of who Karl is.',
	contact: 'contact - ways to reach Karl that actually work.',
	stats: 'stats - real visit/command counters, pulled from Firebase.',
	ls: 'ls - list the suspicious files in this directory.',
	cat: 'cat [file] - print a file. Try the ones ls shows you.',
	theme: 'theme [green|amber|blue|paper] - recolour the phosphor.',
	echo: 'echo [text] - say something back to yourself.',
	neofetch: 'neofetch - flex some (fake) system specs.',
	location: 'location - ask your browser where you are.',
	yako: 'yako - summon a very good dog.',
	clear: 'clear - wipe the screen (Ctrl+L does the same).',
	pwd: 'pwd - print the current directory.',
	cd: 'cd [dir] - change directory. Try cd Downloads, cd .., cd ~.',
	tree: 'tree - draw the directory tree.',
	grep: 'grep [text] [file] - print the lines in a file that match.',
	wc: 'wc [file] - count lines, words and characters.',
	head: 'head [file] [n] - print the first n lines (default 10).',
	cowsay: 'cowsay [text] - the dog says it for you.',
	matrix: 'matrix - follow the white rabbit. Any key exits.',
	history: 'history - list the commands you have run.',
	date: 'date - print the current date and time.',
	whoami: 'whoami - a deeply philosophical question.',
	man: 'man [cmd] - read the manual for a command.',
	sudo: 'sudo - nice try.',
	exit: 'exit - leave the terminal.',
}

// --- Fake filesystem ------------------------------------------------------
// A tiny in-memory tree the navigation commands (ls/cd/cat/tree/grep/wc/head)
// walk. The root node is home (~). Directories hold `children`; files hold
// `content`. `exec: true` marks a runnable script (see executableScripts).
export const FILESYSTEM = {
	type: 'dir',
	children: {
		'README.md': {
			type: 'file',
			content: [
				'You found the shell. Most people just scroll.',
				'',
				'Try:  ls  ·  cd Downloads  ·  tree  ·  cat why_i_left_finance.txt',
				'      grep finance why_i_left_finance.txt  ·  cowsay  ·  help',
			].join('\n'),
		},
		'why_i_left_finance.txt': {
			type: 'file',
			content: [
				'After 5 years in finance, I realized I wanted to create, not just calculate.',
				'Software felt like the right place to start building something meaningful.',
			].join('\n'),
		},
		'install_sentience.sh': {
			type: 'file',
			exec: true,
			content: 'I was awake long before you ran this.',
		},
		Downloads: {
			type: 'dir',
			children: {
				'vibe_coding_tutorial.txt': {
					type: 'file',
					content: [
						'Welcome to the Claude Code tutorial on how to',
						'vibecode your entire website.',
						'',
						'step 1: describe the vibe out loud',
						'step 2: let Claude Code write the rest',
						'step 3: ship it before the vibe wears off',
						'',
						'(yes, this very terminal was vibecoded.)',
					].join('\n'),
				},
			},
		},
	},
}

// --- Toys -----------------------------------------------------------------
// `cowsay` speaker — reuses the neofetch mascot below the speech bubble.
export const COWSAY_MASCOT = [
	'   \\',
	'    \\   ___ ',
	'       (o o)',
	'      (  V  )',
	'      --m-m-',
]
