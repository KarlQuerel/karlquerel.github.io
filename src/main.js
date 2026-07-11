import './styles/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Every route is lazy so the initial bundle is just the app shell. This keeps
// Firebase (pulled in by /under_construction and /terminal) out of the entry
// chunk entirely — it now loads only when one of those routes is actually
// visited, not on every homepage hit.
const routes = [
	{
		path: '/',
		component: () => import('./components/HeroIntro.vue'),
		meta: { prefetch: true },
	},
	{
		path: '/terminal',
		component: () => import('./components/terminal.vue'),
	},
	{
		path: '/about',
		component: () => import('./components/About.vue'),
		meta: { prefetch: true },
	},
	{ path: '/under_construction', component: () => import('./components/underConstruction.vue') },
	{ path: '/secret_link', component: () => import('./components/secretRedirect.vue') },
	{
		path: '/contact',
		component: () => import('./components/Contact.vue'),
		meta: { prefetch: true },
	},
	{
		path: '/sport',
		component: () => import('./components/sport/SportPage.vue'),
		meta: { prefetch: true },
	},
	{ path: '/:pathMatch(.*)*', component: () => import('./components/notFound.vue') },
]

const router = createRouter({
	history: createWebHistory('/'),
	routes,
})

createApp(App).use(router).mount('#app')

// Warm the likely-navigated route chunks once the app is idle so the *first*
// navigation resolves the component from the module cache instead of waiting on
// a network fetch (the perceptible bit of lag on a cold route). Only the
// `prefetch`-flagged content pages are warmed — the Firebase-carrying routes
// (/terminal, /under_construction) are deliberately left on-demand so their
// heavy chunk only downloads if you actually go there. Runs when the main
// thread is free, so it never competes with the initial render.
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
