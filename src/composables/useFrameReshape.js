import { onActivated } from 'vue'
import { ENTRY } from '@/constants/journey'
import { useRafThrottle } from './useRafThrottle'
import { useWindowListener } from './useWindowListener'

// Recuts a frame-sized sprite set once the window has really changed shape, parked resizes included.
export function useFrameReshape(frame, recut) {
	function check() {
		const { w, h } = frame()
		if (!w) return
		const reshaped =
			window.innerWidth !== w || Math.abs(window.innerHeight / h - 1) > ENTRY.ridgeReshape
		if (reshaped) recut()
	}

	useWindowListener('resize', useRafThrottle(check))
	onActivated(check)
}
