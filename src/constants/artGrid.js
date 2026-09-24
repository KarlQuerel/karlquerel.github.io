// Tuning for useArtCanvas: the art grid a WebGL scene is drawn on, and the loop that keeps it fed.

export const CONTEXT_ATTRIBUTES = { antialias: false, alpha: false }

// The art grid we aim for (px tall); resize() solves for WHOLE device pixels per art pixel.
export const ART_TARGET = 560
export const ART_RUNGS = 3
// never fewer device pixels per art pixel than this, and never a grid smaller than the floor
export const ART_MIN_DEVICE_PX = 2
export const ART_MIN_WIDTH = 160
export const ART_MIN_HEIGHT = 120

// The gap between the thresholds is what stops it oscillating between rungs.
export const PERF_WINDOW = 45
export const PERF_SLOW_MS = 30
export const PERF_FAST_MS = 20

// A backgrounded tab hands back one enormous frame; integrating it whole would fling a spring.
export const MAX_FRAME_DT = 0.05
export const FIRST_FRAME_DT = 1 / 60

// Matches only the current ratio, so a move to another screen fires it without a resize.
// how long a context lost during boot may take to come back before the flat fallback shows
export const RESTORE_WAIT_MS = 3000

export const resolutionQuery = dpr => `(resolution: ${dpr}dppx)`
