import './styles/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// every route is lazy so the Firebase-carrying pages stay out of the entry chunk
const routes = [
	{
		// simple text landing; HeroIntro is kept for when the site relaunches
		path: '/',
		component: () => import('./components/HomeLanding.vue'),
	},
	{
		// hidden dev route: the full hero cinematic that transitions into /game.
		// Develop here while `/` stays under construction; swap `/` to it to go live.
		path: '/preview',
		component: () => import('./components/HeroIntro.vue'),
		meta: { title: 'Preview' },
	},
	{
		path: '/terminal',
		component: () => import('./components/Terminal.vue'),
		meta: { title: 'Terminal' },
	},
	{
		path: '/about',
		component: () => import('./components/About.vue'),
		meta: { prefetch: true, title: 'About' },
	},
	{ path: '/secret_link', component: () => import('./components/SecretRedirect.vue') },
	{
		path: '/contact',
		component: () => import('./components/Contact.vue'),
		meta: { prefetch: true, title: 'Contact' },
	},
	{
		// unlisted personal page: reachable by URL, so it never warms on a public visit
		path: '/sport',
		component: () => import('./components/sport/SportPage.vue'),
		meta: { title: 'Sport' },
	},
	{
		// unlinked while the teaser homepage is up; reachable by URL for dev
		path: '/game',
		component: () => import('./components/game/GamePage.vue'),
		meta: { title: 'Signal Lost' },
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('./components/NotFound.vue'),
		meta: { title: '404' },
	},
]

const router = createRouter({
	history: createWebHistory('/'),
	routes,
})

// per-route titles so tabs and history entries are distinguishable
const DEFAULT_TITLE = 'Karl Querel • Software Engineer'
router.afterEach(to => {
	document.title = to.meta.title ? `${to.meta.title} • Karl Querel` : DEFAULT_TITLE
})

createApp(App).use(router).mount('#app')

// warm prefetch-flagged chunks at idle; Firebase-carrying routes stay on-demand.
// Skipped under automation: the prerender snapshot would otherwise capture every
// prefetched route's CSS as render-blocking <link> tags in the static HTML.
function prefetchRouteChunks() {
	for (const route of routes) {
		if (route.meta?.prefetch && typeof route.component === 'function') route.component()
	}
}
if (!navigator.webdriver) {
	if ('requestIdleCallback' in window) {
		window.requestIdleCallback(prefetchRouteChunks, { timeout: 3000 })
	} else {
		window.setTimeout(prefetchRouteChunks, 2000)
	}
}
