// Pixel-art glyphs for the /about portals. Each string is a grid row; every
// char maps to a PIXEL_PALETTE colour ('.' = transparent). Hex values mirror
// the theme tokens in _variables.scss (SCSS vars aren't reachable from JS).
export const PIXEL_PALETTE = {
	Y: '#ffbd2e', // briefcase body ($yellow)
	L: '#ffd066', // briefcase highlight
	y: '#c58a1a', // briefcase shadow
	D: '#3a2a0e', // briefcase outline / handle
	M: '#e6e6e6', // clasp metal
	m: '#8f8f8f', // clasp metal shadow
}

export const PIXEL_ICONS = {
	briefcase: [
		'........................',
		'........................',
		'.........DDDDDD.........',
		'.........D....D.........',
		'.........D....D.........',
		'.........D....D.........',
		'...DDDDDDDDDDDDDDDDDD...',
		'...DLLLLLLLLLLLLLLLLD...',
		'...DLYYYYYYYYYYYYYYyD...',
		'...DLYYYYYYYYYYYYYYyD...',
		'...DDDDDDDDDDDDDDDDDD...',
		'...DLYYMMYYYYYYMMYYyD...',
		'...DLYYmmYYYYYYmmYYyD...',
		'...DLYYYYYYYYYYYYYYyD...',
		'...DLYYYYYYYYYYYYYYyD...',
		'...DLYYYYYYYYYYYYYYyD...',
		'...DLYYYYYYYYYYYYYYyD...',
		'...DyYYYYYYYYYYYYYyyD...',
		'...DyyYYYYYYYYYYyyyyD...',
		'...DyyyyyyyyyyyyyyyyD...',
		'...DyyyyyyyyyyyyyyyyD...',
		'...DDDDDDDDDDDDDDDDDD...',
		'........................',
		'........................',
	],
}
