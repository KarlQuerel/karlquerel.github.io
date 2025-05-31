/***	IMPORTS		***/
import './styles/main.scss';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import SecretRedirect from './components/secretRedirect.vue';
import NotFound from './components/notFound.vue';
import UnderConstruction from './components/underConstruction.vue';
import GameTest from './components/gameTest.vue';
import Home from './components/home.vue';
import './js/firebase-setup.js';


/***	ROUTES		***/
const routes = [
	{ path: '/', component: Home },
	{ path: '/under_construction', component: UnderConstruction },
	{ path: '/secret_link', component: SecretRedirect },
	{ path: '/gametest', component: GameTest },
	{ path: '/:pathMatch(.*)*', component: NotFound },
  ];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

createApp(App).use(router).mount('#app');
