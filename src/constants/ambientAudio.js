// Site-wide ambient space track (see useAmbientAudio.js). Browser autoplay
// policy blocks sound until the first *discrete* user gesture — a click or
// keypress. Scrolling alone does NOT qualify, so playback is armed on first
// interaction rather than on load, and remembered in localStorage.

export const AMBIENT_AUDIO = {
	// Drop a small, seamless-loop space-ambient file at this path in
	// public/assets/music/. The repo ships no audio asset here yet, so the
	// toggle stays silent until this file exists.
	SRC: '/assets/music/space-ambient.mp3',
	// Background level — quiet enough to sit under the page, never over it.
	VOLUME: 0.25,
	// localStorage value is 'on' | 'off'; absent means "follow reduced-motion".
	STORAGE_KEY: 'karlquerel.ambient-audio',
	// Volume ramp so the track fades in/out instead of snapping on/off.
	FADE_STEP: 0.02,
	FADE_INTERVAL_MS: 40,
	// First of these that lands starts the track. pointerdown/keydown satisfy the
	// autoplay policy; scroll/wheel/touch are best-effort retries.
	GESTURE_EVENTS: ['pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'],
}
