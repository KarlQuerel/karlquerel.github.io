import { defineConfig } from '@playwright/test'

// Smoke suite runs against the production build: `npm run build` first (CI does),
// then `npm test` serves dist/ via vite preview.
export default defineConfig({
	testDir: 'tests',
	outputDir: 'test-results',
	use: {
		baseURL: 'http://localhost:4173',
		// System Chrome everywhere — no browser download locally; CI installs the
		// `chrome` channel (see ci.yml).
		channel: 'chrome',
	},
	webServer: {
		command: 'npm run serve',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
	},
})
