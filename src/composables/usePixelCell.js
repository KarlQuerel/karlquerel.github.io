import { computed, ref } from 'vue'
import { useRafThrottle } from './useRafThrottle'
import { useWindowListener } from './useWindowListener'

// CSS px per cell cut down to whole device pixels, so no cell straddles two and dims.
export function snapCell(css) {
	const dpr = window.devicePixelRatio || 1
	return Math.max(1 / dpr, Math.floor(css * dpr) / dpr)
}

// A one-line sprite's cell: `span` of the frame's width over its `cols`, at most `cellMax`, refit as
// the window resizes; given back as the sprite's CSS size.
export function usePixelCell(cols, rows, { span, cellMax }) {
	const cell = ref(cellMax)
	const fit = () => (cell.value = snapCell(Math.min(cellMax, (window.innerWidth * span) / cols)))
	fit()
	useWindowListener('resize', useRafThrottle(fit))
	return {
		sizeStyle: computed(() => ({
			width: `${cols * cell.value}px`,
			height: `${rows * cell.value}px`,
		})),
	}
}
