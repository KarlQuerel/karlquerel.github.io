import { Routes, Route } from 'react-router-dom'
import { FooterVisibilityProvider } from './contexts/FooterVisibilityContext'
import RetroNavbar from './components/retroNavbar'
import RetroFooter from './components/retroFooter'
import Home from './components/home'
import NotFound from './components/notFound'
import UnderConstruction from './components/underConstruction'
import SecretRedirect from './components/secretRedirect'
import Game from './components/game/Game'

function App() {
	return (
		<FooterVisibilityProvider>
			<div id="app">
				<RetroNavbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/under_construction" element={<UnderConstruction />} />
					<Route path="/secret_link" element={<SecretRedirect />} />
					<Route path="/game" element={<Game />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<RetroFooter />
			</div>
		</FooterVisibilityProvider>
	)
}

export default App

