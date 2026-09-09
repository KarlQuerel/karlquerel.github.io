import { ref } from 'vue'
import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY } from '@/constants/terminal'

// Drives the terminal's phosphor colour (the --phosphor variable), persisted so it survives reloads.
export function useTerminalTheme() {
	const loadTheme = () => {
		try {
			const saved = localStorage.getItem(THEME_STORAGE_KEY)
			return saved && THEMES[saved] ? saved : DEFAULT_THEME
		} catch {
			return DEFAULT_THEME
		}
	}

	const initial = loadTheme()
	const themeName = ref(initial)
	const phosphor = ref(THEMES[initial])

	const themeNames = Object.keys(THEMES)

	const setTheme = name => {
		const key = (name || '').trim().toLowerCase()
		if (!THEMES[key]) return false
		themeName.value = key
		phosphor.value = THEMES[key]
		try {
			localStorage.setItem(THEME_STORAGE_KEY, key)
		} catch {
			// Storage can be unavailable (private mode); theme just won't persist.
		}
		return true
	}

	return { themeName, phosphor, themeNames, setTheme }
}
