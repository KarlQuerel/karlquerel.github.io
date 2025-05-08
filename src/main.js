/***	IMPORTS		***/
import './styles/main.scss';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import NotFound from './components/notFound.vue';
import UnderConstruction from './components/underConstruction.vue';
import './js/firebase-setup.js';


/***	ROUTES		***/
const routes = [
	{ path: '/', component: UnderConstruction },
	{ path: '/:pathMatch(.*)*', component: NotFound }
  ];

const router = createRouter({
	history: createWebHistory('/karlquerel.github.io/'),
	routes,
});

createApp(App).use(router).mount('#app');
