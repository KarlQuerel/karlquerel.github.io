// A run's checkpoint: the act reached and the meters on reaching it, so a refresh resumes there.
// localStorage may be unavailable (private windows, blocked storage): every call swallows that.

import { PLAY } from '../../constants/game/play.js'

export function loadSave() {
	try {
		const raw = window.localStorage.getItem(PLAY.saveKey)
		return raw ? JSON.parse(raw) : null
	} catch {
		return null
	}
}

export function writeSave(save) {
	try {
		window.localStorage.setItem(PLAY.saveKey, JSON.stringify(save))
	} catch {
		// nothing to do: the run goes on without a checkpoint
	}
}

export function clearSave() {
	try {
		window.localStorage.removeItem(PLAY.saveKey)
	} catch {
		// nothing to do
	}
}
