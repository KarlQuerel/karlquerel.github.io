import { test, expect } from '@playwright/test'

// One check per route: right title, mounts, and logs no console/page errors.
// Catches broken lazy chunks, runtime errors in main.js, and dead routes —
// things `vite build` can't see. No copy assertions on purpose: content churns.
const ROUTES = [
	{ path: '/', title: 'Karl Querel • Software Engineer' },
	// the old page URLs redirect onto their journey stations (src/main.js)
	{ path: '/about', title: 'Karl Querel • Software Engineer', lands: '/#work' },
	{ path: '/contact', title: 'Karl Querel • Software Engineer', lands: '/#contact' },
	{ path: '/sport', title: 'Sport • Karl Querel' },
	// the hero cinematic — the heaviest component, and the one the game work builds on
	// the WebGL flyby — its shaders only ever compile at runtime, so this is what
	// catches a GLSL error (the renderer logs compile failures to the console)
	{ path: '/lab', title: 'Lab • Karl Querel' },
	{ path: '/terminal', title: 'Terminal • Karl Querel' },
	{ path: '/game', title: 'Signal Lost • Karl Querel' },
	{ path: '/definitely-not-a-page', title: '404 • Karl Querel' },
]

for (const route of ROUTES) {
	test(`route ${route.path} renders cleanly`, async ({ page }) => {
		const errors = []
		page.on('pageerror', err => errors.push(`pageerror: ${err.message}`))
		page.on('console', msg => {
			if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
		})

		await page.goto(route.path)
		await expect(page).toHaveTitle(route.title)
		if (route.lands) {
			await expect(page).toHaveURL(route.lands)
		}
		// The app must have mounted something into #app.
		await expect(page.locator('#app *').first()).toBeAttached()

		expect(errors).toEqual([])
	})
}
