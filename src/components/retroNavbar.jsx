import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFooterVisibility } from '../contexts/FooterVisibilityContext'
import './retroNavbar.scss'

function RetroNavbar() {
	const location = useLocation()
	const { toggleFooter } = useFooterVisibility()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isHidden, setIsHidden] = useState(false)

	const isGameRoute = location.pathname === '/game'

	const handleToggleMenu = () => {
		setIsMenuOpen(prev => !prev)
	}

	const handleCloseMenu = () => {
		setIsMenuOpen(false)
	}

	const handleToggleNavbar = () => {
		setIsHidden(prev => !prev)
		toggleFooter()
	}

	useEffect(() => {
		const handleHideNavbarEvent = () => {
			handleToggleNavbar()
		}

		window.addEventListener('hide-navbar', handleHideNavbarEvent)

		return () => {
			window.removeEventListener('hide-navbar', handleHideNavbarEvent)
		}
	}, [])

	return (
		<nav className={`navbar ${isMenuOpen ? 'menu-active' : ''} ${isHidden ? 'navbar-hidden' : ''}`}>
			<div className="navbar-container">
				<Link to="/" className="logo" onClick={handleCloseMenu}>
					<img src="/assets/img/Yako_logo_128.png" className="default-img" alt="Logo" />
					<img src="/assets/img/Yako_logo_128.png" className="glitch-img" alt="Logo Glitch" />
				</Link>
				<div className="menu-toggle" onClick={handleToggleMenu}>
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
				</div>
				<ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
					<li>
						<Link
							to="/game"
							className="glitch-button"
							data-text="GAME"
							onClick={handleCloseMenu}
						>
							<span>GAME</span>
						</Link>
					</li>
					<li>
						<Link
							to="/under_construction"
							className="glitch-button"
							data-text="COMING SOON"
							onClick={handleCloseMenu}
						>
							<span>COMING<br />SOON</span>
						</Link>
					</li>
					<div className="share">
						<a href="mailto:karlquerel@gmail.com" target="_blank" rel="noreferrer">
							<i className="nes-icon gmail is-medium" />
						</a>
						<a href="https://github.com/KarlQuerel" target="_blank" rel="noreferrer">
							<i className="nes-icon github is-medium" />
						</a>
						<a href="https://www.linkedin.com/in/karlquerel" target="_blank" rel="noreferrer">
							<i className="nes-icon linkedin is-medium" />
						</a>
					</div>
				</ul>
			</div>
			{isGameRoute && (
				<button
					className={`hide-navbar-btn ${isHidden ? 'hidden' : ''}`}
					onClick={handleToggleNavbar}
				>
					<img
						src="/assets/img/navbar-arrow.png"
						alt="Toggle Navbar"
						className={`arrow-icon ${isHidden ? 'arrow-up' : 'arrow-down'}`}
					/>
				</button>
			)}
		</nav>
	)
}

export default RetroNavbar

