// The intro's clock: shot order lives in js/intro/index.js, every second of it is tuned here.

// Weighted boot for useArtCanvas: ten programs compile in one step, the first frame is the wait.
export const INTRO_BOOT_WEIGHTS = { context: 0.05, programs: 0.45, frame: 0.5 }

// the pointer look, a shallow parallax on every shot: share of the distance closed per frame
export const INTRO_LOOK_EASE = 0.06

// Cards type in at this pace and hold; the shot ends on its own clock, not the card's.
export const INTRO_CARD = { charMs: 42, cursorMs: 500 }

// Reduced motion opens on the wake: no animation before it means anything.
export const INTRO_STILL_START = 'warning'

// The crash: shake amplitude (px) and how long it runs before the cut to black.
export const INTRO_CRASH = { duration: 3.2, blackAt: 2.3, shakePx: 6 }

// Dev server only: freeze a frame to inspect it. The toggle keys pause, the arrows step a frame (with
// shift, a second), and `?…&pause` opens the shot already frozen.
export const INTRO_INSPECT = {
	toggle: [' ', 'p'],
	back: 'ArrowLeft',
	forward: 'ArrowRight',
	frameS: 1 / 30,
	shiftS: 1,
	param: 'pause',
	label: 'PAUSED',
	hint: 'SPACE RESUME · ←/→ FRAME · SHIFT 1S',
}
