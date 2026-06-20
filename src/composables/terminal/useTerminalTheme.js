import { ref } from 'vue'
import { THEMES, DEFAULT_THEME } from '@/constants/terminal'

// Drives the terminal's phosphor colour (the --phosphor CSS variable bound on
// the window). The `theme` command calls setTheme; the component reads the
// resulting hex to paint the prompt, cursor, base text and glow.
export function useTerminalTheme() {
	const themeName = ref(DEFAULT_THEME)
	const phosphor = ref(THEMES[DEFAULT_THEME])

	const themeNames = Object.keys(THEMES)

	const setTheme = name => {
		const key = (name || '').trim().toLowerCase()
		if (!THEMES[key]) return false
		themeName.value = key
		phosphor.value = THEMES[key]
		return true
	}

	return { themeName, phosphor, themeNames, setTheme }
}
