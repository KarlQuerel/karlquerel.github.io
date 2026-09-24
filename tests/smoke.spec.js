import { test, expect } from '@playwright/test'
import { GAME_SHIPPED } from '../src/constants/game.js'

// One check per route: right title, mounts, and logs no console/page errors.
// Catches broken lazy chunks, runtime errors in main.js, and dead routes —
// things `vite build` can't see. No copy assertions on purpose: content churns.
const ROUTES = [
	{ path: '/', title: 'Karl Querel • Software Engineer' },
	// the old page URLs redirect onto their journey stations (src/main.js)
	{ path: '/about', title: 'Karl Querel • Software Engineer', lands: '/#work' },
	{ path: '/contact', title: 'Karl Querel • Software Engineer', lands: '/#contact' },
	{ path: '/sport', title: 'Sport • Karl Querel' },
	// the WebGL flyby — its shaders only ever compile at runtime, so this is what
	// catches a GLSL error (the renderer logs compile failures to the console)
	{ path: '/lab', title: 'Lab • Karl Querel' },
	{ path: '/terminal', title: 'Terminal • Karl Querel' },
	{ path: '/under-construction', title: 'Under Construction • Karl Querel' },
	// until it ships, the game's URL lands on the holding screen
	GAME_SHIPPED
		? { path: '/game', title: 'Game • Karl Querel' }
		: {
				path: '/game',
				title: 'Under Construction • Karl Querel',
				lands: '/under-construction',
			},
	{ path: '/definitely-not-a-page', title: '404 • Karl Querel' },
]

// Keep the suite off the production counters: answer Firestore's REST calls with empty successes.
test.beforeEach(async ({ page }) => {
	await page.route('https://firestore.googleapis.com/**', route => {
		const request = route.request()
		const readTime = new Date().toISOString()
		const body = new URL(request.url()).pathname.endsWith(':batchGet')
			? (request.postDataJSON()?.documents ?? []).map(missing => ({ missing, readTime }))
			: { commitTime: readTime, writeResults: [{ updateTime: readTime }] }
		return route.fulfill({ json: body })
	})
})

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

// The cursor is CSS-only, so nothing else here would notice it silently falling back to
// the OS arrow — a moved sprite or a refactored mixin would pass every test above.
test('the blade cursor resolves at rest and over a link', async ({ page }) => {
	const missing = []
	page.on('response', r => {
		if (r.url().includes('/assets/cursor/') && !r.ok()) missing.push(`${r.status()} ${r.url()}`)
	})

	await page.goto('/')
	const resting = await page.evaluate(() => getComputedStyle(document.documentElement).cursor)
	expect(resting).toContain('blade.png')

	const interactive = await page.evaluate(() => {
		const el = document.querySelector('a')
		return el ? getComputedStyle(el).cursor : ''
	})
	expect(interactive).toContain('blade-active.png')

	expect(missing).toEqual([])
})
