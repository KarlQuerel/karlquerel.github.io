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
	},
	{
		path: '/about',
		component: () => import('./components/About.vue'),
		meta: { prefetch: true },
	},
	{ path: '/secret_link', component: () => import('./components/SecretRedirect.vue') },
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
	{ path: '/:pathMatch(.*)*', component: () => import('./components/NotFound.vue') },
]

const router = createRouter({
	history: createWebHistory('/'),
	routes,
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
