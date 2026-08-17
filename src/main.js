import './styles/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { prefersReducedMotion } from './composables/usePrefersReducedMotion.js'
import App from './App.vue'

// every route is lazy so the Firebase-carrying pages stay out of the entry chunk
const routes = [
	{
		// the landing journey: hero → WORK → LIFE → contact, one scroll-driven flight
		path: '/',
		component: () => import('./components/HomeJourney.vue'),
	},
	{
		// hidden dev route: the full hero cinematic that transitions into /game.
		// Develop here while the journey fronts `/`; swap `/` to it to go live.
		path: '/preview',
		component: () => import('./components/HeroIntro.vue'),
		meta: { title: 'Preview' },
	},
	{
		path: '/terminal',
		component: () => import('./components/Terminal.vue'),
		meta: { title: 'Terminal' },
	},
	// the old standalone pages fold into the journey's stations
	{ path: '/about', redirect: { path: '/', hash: '#work' } },
	{ path: '/contact', redirect: { path: '/', hash: '#contact' } },
	{ path: '/secret_link', component: () => import('./components/SecretRedirect.vue') },
	{
		// unlisted personal page: reachable by URL, so it never warms on a public visit
		path: '/sport',
		component: () => import('./components/sport/SportPage.vue'),
		meta: { title: 'Sport' },
	},
	{
		// unlinked while the journey fronts the site; reachable by URL for dev
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
	// hash links land on their station; back/forward restores; the rest start at
	// the top. The glide is for in-page hops only — a fresh visit (no matched
	// `from`) lands instantly, and reduced motion always does.
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		if (to.hash) {
			const instant = from.matched.length === 0 || prefersReducedMotion()
			return { el: to.hash, behavior: instant ? 'auto' : 'smooth' }
		}
		return { top: 0 }
	},
})

// per-route titles so tabs and history entries are distinguishable
const DEFAULT_TITLE = 'Karl Querel • Software Engineer'
router.afterEach(to => {
	document.title = to.meta.title ? `${to.meta.title} • Karl Querel` : DEFAULT_TITLE
})

createApp(App).use(router).mount('#app')
