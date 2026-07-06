import { ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { AMBIENT_AUDIO } from '../constants/ambientAudio'

// Single shared instance across the whole app: the <Audio> element and its
// state live at module scope so the navbar toggle and App.vue drive the very
// same track. `enabled` is the user's intent; `playing` is whether sound is
// actually coming out (false until the autoplay policy lets it through).
const enabled = ref(false)
const playing = ref(false)

let audio = null
let initialized = false
let fadeTimer = null
let removeGestureListeners = null

function persist(value) {
	try {
		localStorage.setItem(AMBIENT_AUDIO.STORAGE_KEY, value ? 'on' : 'off')
	} catch {
		// Private mode / storage disabled — the choice just won't survive a reload.
	}
}

function readStoredIntent() {
	try {
		const stored = localStorage.getItem(AMBIENT_AUDIO.STORAGE_KEY)
		if (stored === 'on') return true
		if (stored === 'off') return false
	} catch {
		// Fall through to the reduced-motion default.
	}
	return !prefersReducedMotion()
}

function fadeTo(target, done) {
	clearInterval(fadeTimer)
	fadeTimer = setInterval(() => {
		const next =
			Math.abs(audio.volume - target) <= AMBIENT_AUDIO.FADE_STEP
				? target
				: audio.volume +
					(audio.volume < target ? AMBIENT_AUDIO.FADE_STEP : -AMBIENT_AUDIO.FADE_STEP)
		audio.volume = Math.min(1, Math.max(0, next))
		if (audio.volume === target) {
			clearInterval(fadeTimer)
			done?.()
		}
	}, AMBIENT_AUDIO.FADE_INTERVAL_MS)
}

function start() {
	if (!audio || !enabled.value) return
	const promise = audio.play()
	if (promise === undefined) return
	promise
		.then(() => {
			playing.value = true
			removeGestureListeners?.()
			fadeTo(AMBIENT_AUDIO.VOLUME)
		})
		.catch(() => {
			// Autoplay still blocked (no qualifying gesture yet). Listeners stay
			// armed so the next interaction retries.
			playing.value = false
		})
}

function stop() {
	if (!audio) return
	fadeTo(0, () => {
		audio.pause()
		playing.value = false
	})
}

function armFirstGesture() {
	if (!audio || removeGestureListeners) return
	const onGesture = () => start()
	AMBIENT_AUDIO.GESTURE_EVENTS.forEach(event =>
		window.addEventListener(event, onGesture, { passive: true })
	)
	removeGestureListeners = () => {
		AMBIENT_AUDIO.GESTURE_EVENTS.forEach(event => window.removeEventListener(event, onGesture))
		removeGestureListeners = null
	}
}

function init() {
	if (initialized || typeof window === 'undefined') return
	initialized = true
	audio = new Audio(AMBIENT_AUDIO.SRC)
	audio.loop = true
	// Don't fetch the file for visitors who never turn sound on.
	audio.preload = 'none'
	audio.volume = 0
	enabled.value = readStoredIntent()
	if (enabled.value) armFirstGesture()
}

function toggle() {
	enabled.value = !enabled.value
	persist(enabled.value)
	if (enabled.value) {
		// This runs inside the click handler, which is a valid gesture, so
		// start() will be allowed to play.
		start()
		armFirstGesture()
	} else {
		stop()
		removeGestureListeners?.()
	}
}

export function useAmbientAudio() {
	return { enabled, playing, init, toggle }
}
