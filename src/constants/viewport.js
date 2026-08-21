// JS-side twin of $breakpoint-mobile in src/styles/_variables.scss — keep in sync.
export const MOBILE_VIEWPORT_QUERY = '(max-width: 640px)'

// True mouse/trackpad present — touch devices skip cursor-driven effects.
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

// How much of the remaining distance the cursor lean closes per frame. A camera has
// mass: at any travel worth feeling, following the pointer rigidly reads as the page
// twitching rather than as a lean. Lower is heavier.
export const POINTER_EASE = 0.09
