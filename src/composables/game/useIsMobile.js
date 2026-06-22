import { ref, onMounted, onUnmounted } from 'vue'

// Shared mobile check: Game.vue hides the desktop tree and MobileWarning.vue
// shows the overlay, so both read one source of truth instead of the parent
// reaching into a child ref (which `<script setup>` does not expose by default).
const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const MOBILE_MAX_WIDTH = 768

export function useIsMobile() {
	const isMobile = ref(false)

	const checkMobile = () => {
		isMobile.value =
			MOBILE_UA.test(navigator.userAgent) || window.innerWidth <= MOBILE_MAX_WIDTH
	}

	onMounted(() => {
		checkMobile()
		window.addEventListener('resize', checkMobile)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', checkMobile)
	})

	return { isMobile }
}
