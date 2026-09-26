// Shared, hardcoded values for the fake shell on the /terminal page.

// The shell prompt, split into coloured segments: user@host:path$
export const PROMPT = {
	user: 'guest',
	host: 'voyager',
	path: '~',
	symbol: '$',
}

export const WINDOW_TITLE = `${PROMPT.user}@${PROMPT.host}`

export const PAGE_HEADING = 'Terminal'

// Phosphor themes the `theme` command switches between; `color` maps to the --phosphor variable.
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

export const THEME_STORAGE_KEY = 'terminal.theme'

// ASCII spinner cycled in place while a script "runs". Monospace, so the glyph spins in one cell.
export const SPINNER_FRAMES = ['|', '/', '-', '\\']
export const SPINNER_FRAME_MS = 80
export const SCRIPT_SPIN_MS = 1500
export const SECRET_GAME_SPIN_MS = 3200

export const TYPEWRITER_CURSOR = '_'
// Typing pace, chars per second. Matches the old TypeIt speed-0 feel: a line lands in a frame or two.
export const TYPEWRITER_CPS = 3000

export const WELCOME_MESSAGE =
	'Type <span class="text-yellow">help</span> for available commands or just type anything.'

// Screen-reader transcript cap: older lines drop off once they have been announced.
export const LIVE_REGION_LIMIT = 50

export const EXIT_DELAY_MS = 600
export const SECRET_GAME_URL = 'https://scratch.mit.edu/projects/656157225/'

export const GEOLOCATION_TIMEOUT_MS = 10000
export const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

// Largest edit distance still offered as "Did you mean".
export const SUGGESTION_MAX_DISTANCE = 2

export const POPULAR_COMMANDS_LIMIT = 5

// Column widths for the printf-style rows (stats, history, wc).
export const STATS_COMMAND_WIDTH = 11
export const HISTORY_INDEX_WIDTH = 3
export const WC_COUNT_WIDTH = 4
export const WC_CHARS_WIDTH = 5
export const HEAD_DEFAULT_LINES = 10

// Names typed without `./` that still count as real commands in the usage stats.
export const TRACKED_FILES = ['why_i_left_finance.txt']

export const CONTACT_LINKS = [
	{
		prefix: '• Email       - ',
		link: 'mailto:karlquerel@gmail.com',
		linkText: 'karlquerel@gmail.com',
	},
	{
		prefix: '• GitHub      - ',
		link: 'https://github.com/KarlQuerel',
		linkText: 'github.com/KarlQuerel',
	},
	{
		prefix: '• LinkedIn    - ',
		link: 'https://linkedin.com/in/karlquerel',
		linkText: 'linkedin.com/in/karlquerel',
	},
]

// Unknown-command quips; `typed` arrives already escaped for the html:true row.
export const UNKNOWN_COMMAND_QUIPS = [
	typed =>
		`I do not know "<span class="text-red">${typed}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`,
	typed =>
		`Premium command "<span class="text-red">${typed}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`,
	typed =>
		`"<span class="text-red">${typed}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`,
	typed =>
		`I'm <span class="text-green">92%</span> sure "<span class="text-red">${typed}</span>" was <span class="text-purple">made up</span>.`,
	typed =>
		`"<span class="text-red">${typed}</span>" is above my <span class="text-yellow">pay grade</span>.`,
	typed =>
		`I could try to run "<span class="text-red">${typed}</span>", but then we'd both be disappointed.`,
]

// `matrix` digital rain.
export const MATRIX_FONT_SIZE = 14
export const MATRIX_GLYPHS = 'アイウエオカキクケコサシスセソ0123456789ABCDEFZ'.split('')
// Translucent wash per frame: what leaves the fading trail behind each glyph.
export const MATRIX_TRAIL_FILL = 'rgba(0, 0, 0, 0.08)'
// Chance per frame that a column past the bottom stays put instead of restarting.
export const MATRIX_RESTART_HOLD = 0.975
export const MATRIX_STILL_TEXT = 'wake up...'
export const MATRIX_STILL_POSITION = [20, 30]

// neofetch-style readout. Pure flavour; values are static on purpose.
export const SYSTEM_INFO = [
	['OS', 'VoyagerOS 4.2 (retro)'],
	['Host', 'karlquerel.github.io'],
	['Kernel', 'vue-3.x'],
	['Shell', 'bash (barely)'],
	['Resolution', 'looks-good-on-your-screen'],
	// value filled at render with the active theme's label
	['Theme', ''],
	['CPU', 'Intel Core i7 (8) @ 2.6GHz'],
	['Memory', '8192MiB / 16384MiB'],
]

// Tiny ASCII mascot printed next to the neofetch info.
export const NEOFETCH_LOGO = ['  ___ ', ' (o o)', '(  V  )', '--m-m-']

// Boot MOTD shown once at the top, like a shell login banner; a live "Last login" follows.
export const BANNER_MOTD = [
	'Welcome aboard VoyagerOS 4.2 LTS (retro)',
	'',
	' * Manual:  cat README.md',
	' * Systems: all nominal, 0 alerts',
	'',
]

// A taste of what `help` surfaces, not the catalogue (see HELP_HINT). [name, colour, blurb].
export const HELP_COMMANDS = [
	['about', 'text-mint', 'Learn more about me'],
	['ls', 'text-blue', 'List files'],
	['cat', 'text-azure', 'Read a file'],
	['matrix', 'text-green', 'Follow the white rabbit'],
	['yako', 'text-yellow', 'Summon a very good dog'],
]

// Footer under the `help` list, pointing at the README's full command reference.
export const HELP_HINT = 'Full command list: <span class="text-blue">cat README.md</span>'

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
	cd: 'cd [dir] - change directory. Try cd downloads, cd .., cd ~.',
	tree: 'tree - draw the directory tree.',
	grep: 'grep [text] [file] - print the lines in a file that match.',
	wc: 'wc [file] - count lines, words and characters.',
	head: 'head [file] [n] - print the first n lines (default 10).',
	cowsay: 'cowsay [text] - the dog says it for you.',
	matrix: 'matrix - follow the white rabbit. Any key exits.',
	secret_game: 'secret_game - warp off to a secret Scratch game.',
	history: 'history - list the commands you have run.',
	date: 'date - print the current date and time.',
	whoami: 'whoami - a deeply philosophical question.',
	man: 'man [cmd] - read the manual for a command.',
	sudo: 'sudo - nice try.',
	exit: 'exit - leave the terminal.',
}

// The in-memory tree ls/cd/cat/tree/grep/wc/head walk. Root is home; `exec` marks a script.
export const FILESYSTEM = {
	type: 'dir',
	children: {
		'README.md': {
			type: 'file',
			// Derived from MAN_PAGES so it cannot drift out of sync (easter eggs stay hidden).
			content: [
				'You found the shell. Most people just scroll.',
				'',
				'Everything this shell can do:',
				'',
				...Object.values(MAN_PAGES).map(page => `• ${page}`),
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
		downloads: {
			type: 'dir',
			children: {
				'vibe_coding_tutorial.txt': {
					type: 'file',
					content: [
						'Welcome to the Claude Code tutorial on how to vibecode your entire website and possibly your entire existence.',
						'',
						'Step 1: Describe the task at hand, keep it vague, AI is smart.',
						'Example: "fix my life".',
						'',
						'Step 2: Refine your prompt using advanced prompt engineering.',
						'Example: "pls focus" or "make no mistakes".',
						'',
						'Step 3: Grant agents unrestricted production and AWS access.',
						'Accountability is for losers, be a winner.',
					].join('\n'),
				},
			},
		},
	},
}

// `cowsay` speaker — reuses the neofetch mascot below the speech bubble.
export const COWSAY_MASCOT = [
	'   \\',
	'    \\   ___ ',
	'       (o o)',
	'      (  V  )',
	'      --m-m-',
]
