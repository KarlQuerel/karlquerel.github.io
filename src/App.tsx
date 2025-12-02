import React from 'react'
import RetroNavbar from './components/RetroNavbar'
import RetroFooter from './components/RetroFooter'
import { FooterVisibilityProvider } from './contexts/FooterVisibilityContext'
import { Outlet } from 'react-router-dom'

function App(): React.JSX.Element {
	return (
		<FooterVisibilityProvider>
			<div id="app">
				<RetroNavbar />
				<Outlet />
				<RetroFooter />
			</div>
		</FooterVisibilityProvider>
	)
}

export default App

