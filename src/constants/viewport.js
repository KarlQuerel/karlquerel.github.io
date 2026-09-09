// JS-side twin of $breakpoint-mobile in src/styles/_variables.scss — keep in sync.
export const MOBILE_VIEWPORT_QUERY = '(max-width: 640px)'

// True mouse/trackpad present — touch devices skip cursor-driven effects.
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

// How much of the remaining lean the cursor closes per frame — a camera has mass. Lower is heavier.
export const POINTER_EASE = 0.09
