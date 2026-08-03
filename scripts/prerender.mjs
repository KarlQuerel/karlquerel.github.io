// Turns the SPA build into one real HTML file per route.
//
// Why: GitHub Pages only 200s paths that exist on disk. With a lone index.html
// every route fell back to 404.html — rendered fine, but answered HTTP 404, so
// Google refused to index anything but `/`. A file per route fixes the status
// code and gives each page its own title/description in search results.
//
// Routes flagged `render: false` get the plain shell instead of a snapshot —
// /terminal writes a Firebase visit on mount, so rendering it here would log a
// phantom visit on every build.

import { chromium } from '@playwright/test'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SITE = 'https://karlquerel.com'
const PORT = 4180

const SUMMARY =
	'Karl Querel - Software Engineer. Former commodity trader, now building software for EV charging and renewable energy.'

// `path` is what the router matches; `dir` is where the file lands (GitHub Pages
// 301s /about -> /about/, so the trailing-slash form is the canonical one).
const ROUTES = [
	{
		path: '/',
		dir: '',
		title: 'Karl Querel • Software Engineer',
		description: SUMMARY,
		render: true,
	},
	{
		path: '/about',
		dir: 'about',
		title: 'About • Karl Querel',
		description:
			'From five years broking commodities to software engineering at 42 Paris. The work timeline behind Karl Querel, now building for renewable energy.',
		render: true,
	},
	{
		path: '/contact',
		dir: 'contact',
		title: 'Contact • Karl Querel',
		description:
			'Get in touch with Karl Querel - software engineer in Paris, building software for EV charging and renewable energy.',
		render: true,
	},
	{
		path: '/sport',
		dir: 'sport',
		title: 'Sport • Karl Querel',
		description:
			'The weekly training split behind the code - how Karl Querel spends the hours away from a keyboard.',
		render: true,
	},
	{
		path: '/terminal',
		dir: 'terminal',
		title: 'Terminal • Karl Querel',
		description:
			"An interactive retro terminal - type a command and explore Karl Querel's site the long way round.",
		render: false,
	},
]

// Swap a single-tag element matched by `pattern` for `replacement`, tolerating the
// attribute reordering and dropped self-closing slashes that outerHTML introduces.
const swap = (html, pattern, replacement) =>
	pattern.test(html) ? html.replace(pattern, () => replacement) : html

function applyMeta(html, route) {
	const url = `${SITE}${route.dir ? `/${route.dir}/` : '/'}`
	const pairs = [
		[/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`],
		[
			/<meta name="description"[^>]*>/,
			`<meta name="description" content="${route.description}">`,
		],
		[
			/<meta property="og:description"[^>]*>/,
			`<meta property="og:description" content="${route.description}">`,
		],
		[
			/<meta name="twitter:description"[^>]*>/,
			`<meta name="twitter:description" content="${route.description}">`,
		],
		[/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${route.title}">`],
		[
			/<meta name="twitter:title"[^>]*>/,
			`<meta name="twitter:title" content="${route.title}">`,
		],
		[/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`],
		[/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`],
	]
	return pairs.reduce((acc, [pattern, replacement]) => swap(acc, pattern, replacement), html)
}

function buildSitemap(lastmod) {
	const entries = ROUTES.map(
		route =>
			`\t<url>\n\t\t<loc>${SITE}${route.dir ? `/${route.dir}/` : '/'}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`
	).join('\n')
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')

const server = await preview({ preview: { port: PORT, strictPort: true } })
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()

// Snapshot everything before writing, so a file written mid-run can't be served
// back as the source for a later route.
const pages = []
for (const route of ROUTES) {
	if (!route.render) {
		pages.push([route, shell])
		continue
	}
	await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'networkidle' })
	await page.waitForSelector('#app *')
	// Teleport output lands outside #app, which mount() never replaces: snapshotting it duplicates it.
	await page.evaluate(() => {
		for (const node of [...document.body.children]) {
			if (node.id !== 'app' && node.tagName !== 'SCRIPT') node.remove()
		}
	})
	pages.push([
		route,
		`<!DOCTYPE html>\n${await page.evaluate(() => document.documentElement.outerHTML)}`,
	])
	console.warn(`prerendered ${route.path}`)
}

await browser.close()
await server.close()

// 404.html must come off the pristine shell, not a snapshot: it answers every
// unknown URL, and baking the homepage into it would flash the wrong page.
writeFileSync(join(DIST, '404.html'), shell)

for (const [route, html] of pages) {
	const dir = join(DIST, route.dir)
	mkdirSync(dir, { recursive: true })
	writeFileSync(join(dir, 'index.html'), applyMeta(html, route))
}

writeFileSync(join(DIST, 'sitemap.xml'), buildSitemap(new Date().toISOString().slice(0, 10)))

console.warn(`prerender: ${pages.length} routes, sitemap written`)
