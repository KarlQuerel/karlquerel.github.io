import './styles/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// every route is lazy so the Firebase-carrying pages stay out of the entry chunk
const routes = [
	{
		path: '/',
		component: () => import('./components/HeroIntro.vue'),
		meta: { prefetch: true },
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
		path: '/sport',
		component: () => import('./components/sport/SportPage.vue'),
		meta: { prefetch: true, title: 'Sport' },
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

// warm prefetch-flagged chunks at idle; Firebase-carrying routes stay on-demand
function prefetchRouteChunks() {
	for (const route of routes) {
		if (route.meta?.prefetch && typeof route.component === 'function') route.component()
	}
}
if ('requestIdleCallback' in window) {
	window.requestIdleCallback(prefetchRouteChunks, { timeout: 3000 })
} else {
	window.setTimeout(prefetchRouteChunks, 2000)
}
