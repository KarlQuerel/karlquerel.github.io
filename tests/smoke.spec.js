import { test, expect } from '@playwright/test'

// One check per route: it renders (route-specific content visible), carries the
// right title, and logs no console/page errors. Catches broken lazy chunks,
// runtime errors in main.js, and dead routes — things `vite build` can't see.
const ROUTES = [
	{ path: '/', title: 'Karl Querel • Software Engineer', sees: null },
	{ path: '/about', title: 'About • Karl Querel', sees: /hello there/i },
	{ path: '/contact', title: 'Contact • Karl Querel', sees: /send me a/i },
	{ path: '/sport', title: 'Sport • Karl Querel', sees: /weekly split/i },
	{ path: '/terminal', title: 'Terminal • Karl Querel', sees: null },
	{ path: '/game', title: 'Signal Lost • Karl Querel', sees: null },
	{ path: '/definitely-not-a-page', title: '404 • Karl Querel', sees: null },
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
		if (route.sees) {
			await expect(page.getByText(route.sees).first()).toBeVisible()
		}
		// The app must have mounted something into #app.
		await expect(page.locator('#app *').first()).toBeAttached()

		expect(errors).toEqual([])
	})
}
