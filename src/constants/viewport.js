// The site's two breakpoints, in px. The stylesheets read the same pair as `@use 'breakpoints:'`
// (a Sass importer in vite.config.js), so SCSS and JS cannot drift apart.
export const BREAKPOINTS = { mobile: 640, desktop: 1024 }

export const MOBILE_VIEWPORT_QUERY = `(max-width: ${BREAKPOINTS.mobile}px)`

// True mouse/trackpad present — touch devices skip cursor-driven effects.
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

// How much of the remaining lean the cursor closes per frame — a camera has mass. Lower is heavier.
export const POINTER_EASE = 0.09

// The breakpoints as Sass variables: `$mobile: 640px;` and so on.
export const breakpointsScss = () =>
	Object.entries(BREAKPOINTS)
		.map(([name, px]) => `$${name}: ${px}px;`)
		.join('\n')
