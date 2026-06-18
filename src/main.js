/***	IMPORTS		***/
import './styles/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SecretRedirect from './components/secretRedirect.vue'
import NotFound from './components/notFound.vue'
import UnderConstruction from './components/underConstruction.vue'

/***	ROUTES		***/
const routes = [
	{
		path: '/',
		component: () => import('./components/HeroIntro.vue'),
	},
	{
		path: '/terminal',
		component: () => import('./components/home.vue'),
	},
	{
		path: '/about',
		component: () => import('./components/About.vue'),
	},
	{ path: '/under_construction', component: UnderConstruction },
	{ path: '/secret_link', component: SecretRedirect },
	{
		path: '/game',
		component: () => import('./components/game/Game.vue'),
	},
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
