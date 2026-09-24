// Tuning for BootCover, the loader every boot on the site shares.

// How fast the displayed figure closes the gap to the next checkpoint, in seconds.
export const BOOT_EASE_TAU = 0.9
// Once the boot lands the fill sweeps the rest at this pace (s per mark), so it climbs.
export const BOOT_SWEEP = 0.5
// Always shown briefly: the GPU wait blocks the main thread, so an "only if slow" timer cannot work.
export const BOOT_MIN_SHOW = 600
// transitionend is the real signal; this only keeps a missed event from stranding the cover
export const BOOT_LEAVE_FALLBACK_MS = 1000
// the glow behind the mark brightens from `rest` to `rest + gain` as the fill climbs
export const BOOT_GLOW = { rest: 0.15, gain: 0.55 }

// The K from the favicon, pixel for pixel. Not an image: the loader cannot wait for an asset.
export const K_GRID = [
	'##.....##',
	'##....##.',
	'##...##..',
	'##..##...',
	'##.##....',
	'####.....',
	'##.##....',
	'##..##...',
	'##...##..',
	'##....##.',
	'##.....##',
]
