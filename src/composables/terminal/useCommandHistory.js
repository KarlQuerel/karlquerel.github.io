import { ref } from 'vue'
import { HISTORY_LIMIT, HISTORY_STORAGE_KEY } from '@/constants/terminal'
import { clamp } from '@/js/math'

const load = () => {
	try {
		const raw = localStorage.getItem(HISTORY_STORAGE_KEY)
		return raw ? JSON.parse(raw) : []
	} catch {
		return []
	}
}

// Arrow-up recall, newest first, persisted so it survives reloads.
export function useCommandHistory() {
	const entries = ref(load())
	let index = -1

	const record = line => {
		index = -1
		if (!line || entries.value[0] === line) return
		entries.value.unshift(line)
		if (entries.value.length > HISTORY_LIMIT) entries.value.length = HISTORY_LIMIT
		try {
			localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries.value))
		} catch {
			// private mode: recall just won't persist
		}
	}

	// Move through the recall list (+1 = older); '' past the newest entry, null when there is none.
	const step = direction => {
		if (entries.value.length === 0) return null
		index = clamp(index + direction, -1, entries.value.length - 1)
		return index < 0 ? '' : entries.value[index]
	}

	const reset = () => {
		index = -1
	}

	return { entries, record, step, reset }
}
