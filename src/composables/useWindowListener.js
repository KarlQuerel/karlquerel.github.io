import { onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue'

// A window listener that a kept-alive view drops while it is parked off-route.
export function useWindowListener(event, handler, options = { passive: true }) {
	const listen = () => window.addEventListener(event, handler, options)
	const stop = () => window.removeEventListener(event, handler, options)

	onMounted(listen)
	onActivated(listen)
	onDeactivated(stop)
	onBeforeUnmount(stop)
}
