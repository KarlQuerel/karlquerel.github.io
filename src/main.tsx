/***	IMPORTS		***/
import './styles/tailwind.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import NotFound from './components/NotFound'
import UnderConstruction from './components/UnderConstruction'
import SecretRedirect from './components/SecretRedirect'
import Home from './components/Home'
import Game from './components/game/Game'
import './js/firebase-setup'

/***	ROUTES		***/
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'under_construction', element: <UnderConstruction /> },
			{ path: 'secret_link', element: <SecretRedirect /> },
			{ path: 'game', element: <Game /> },
			{ path: '*', element: <NotFound /> },
		],
	},
])

/***	RENDER		***/
const rootElement = document.getElementById('app')
if (rootElement) {
	const root = createRoot(rootElement)
	root.render(<RouterProvider router={router} />)
}
