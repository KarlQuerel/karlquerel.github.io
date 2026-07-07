import './styles/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SecretRedirect from './components/secretRedirect.vue'
import NotFound from './components/notFound.vue'
import UnderConstruction from './components/underConstruction.vue'

const routes = [
	{
		path: '/',
		component: () => import('./components/HeroIntro.vue'),
	},
	{
		path: '/terminal',
		component: () => import('./components/terminal.vue'),
	},
	{
		path: '/about',
		component: () => import('./components/About.vue'),
	},
	{ path: '/under_construction', component: UnderConstruction },
	{ path: '/secret_link', component: SecretRedirect },
	{
		path: '/contact',
		component: () => import('./components/Contact.vue'),
	},
	{
		path: '/sport',
		component: () => import('./components/sport/SportPage.vue'),
	},
	{ path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
	history: createWebHistory('/'),
	routes,
})

createApp(App).use(router).mount('#app')

// Warm the lazy-loaded route chunks once the app is idle so the *first*
// navigation to any page resolves the component from the module cache instead
// of waiting on a network fetch (the perceptible bit of lag on a cold route).
// The chunks are tiny and this only runs when the main thread is free, so it
// never competes with the initial render.
function prefetchRouteChunks() {
	for (const route of routes) {
		if (typeof route.component === 'function') route.component()
	}
}
if ('requestIdleCallback' in window) {
	window.requestIdleCallback(prefetchRouteChunks, { timeout: 3000 })
} else {
	window.setTimeout(prefetchRouteChunks, 2000)
}
