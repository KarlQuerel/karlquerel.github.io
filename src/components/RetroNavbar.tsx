import React, { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFooterVisibility } from '../contexts/FooterVisibilityContext'

function RetroNavbar(): React.JSX.Element {
	const location = useLocation()
	const { toggleFooter } = useFooterVisibility()
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [isHidden, setIsHidden] = useState<boolean>(false)

	const isGameRoute = useMemo<boolean>(() => location.pathname === '/game', [location.pathname])

	const toggleMenu = (): void => {
		setIsMenuOpen(prev => !prev)
	}

	const closeMenu = (): void => {
		setIsMenuOpen(false)
	}

	const toggleNavbar = (): void => {
		setIsHidden(prev => !prev)
		toggleFooter()
	}

	// Listen for custom hide-navbar event (same as clicking hide button)
	useEffect(() => {
		const handleHideNavbarEvent = (): void => {
			setIsHidden(prev => {
				const newValue = !prev
				toggleFooter()
				return newValue
			})
		}

		window.addEventListener('hide-navbar', handleHideNavbarEvent)

		return () => {
			window.removeEventListener('hide-navbar', handleHideNavbarEvent)
		}
	}, [toggleFooter])

	return (
		<nav
			className={`fixed top-0 left-1/2 -translate-x-1/2 z-[1020] w-[60%] min-h-[60px] h-[10vh] bg-black/90 border-[0.3vh] border-dashed border-retro-green border-t-0 rounded-b-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out ${
				isMenuOpen ? 'border-0 bg-transparent shadow-none' : ''
			} ${isHidden ? '-translate-y-full' : ''} lg:w-[80%] md:w-[95%] sm:w-[95%] xs:w-full`}
		>
			<div className="max-w-full mx-auto h-full flex flex-row items-center justify-between px-8 lg:px-6 md:px-4 sm:px-4 sm:justify-between sm:gap-0 xs:px-2 xs:justify-between">
				<Link
					to="/"
					className="navbar-logo h-full flex items-center relative max-w-[20%] min-w-[40px] md:max-w-[25%] md:h-full md:p-[0.3rem] xs:max-w-[20%] xs:h-full xs:p-[0.2rem]"
					onClick={closeMenu}
				>
					<img
						src="/assets/img/Yako_logo_128.png"
						className="navbar-logo-default w-full h-full object-contain relative rounded-[15%]"
						alt="Logo"
					/>
					<img
						src="/assets/img/Yako_logo_128.png"
						className="navbar-logo-glitch"
						alt="Logo Glitch"
					/>
				</Link>
				<div
					className="hidden lg:hidden md:flex flex-col justify-between w-[35px] h-[21px] z-[1030] relative p-[2px] border-2 border-retro-green rounded-[5px] bg-black/80 shadow-[3px_3px_0_#00ff00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none xs:w-[25px] xs:h-[18px] xs:p-[1px] xs:border xs:border-retro-green xs:shadow-[2px_2px_0_#00ff00]"
					onClick={toggleMenu}
				>
					<div className="w-full h-[3px] bg-retro-green transition-all duration-300 ease-in-out relative xs:h-[2px]" />
					<div className="w-full h-[3px] bg-retro-green transition-all duration-300 ease-in-out relative xs:h-[2px]" />
					<div className="w-full h-[3px] bg-retro-green transition-all duration-300 ease-in-out relative xs:h-[2px]" />
				</div>
				<ul
					className={`list-none p-0 m-0 hidden lg:flex lg:flex-row lg:gap-12 lg:items-center lg:static lg:opacity-100 lg:visible lg:pointer-events-auto lg:bg-transparent lg:border-0 lg:rounded-none lg:p-0 lg:h-auto lg:w-auto lg:left-auto lg:top-auto lg:translate-x-0 md:fixed md:top-0 md:left-[85%] md:w-[20%] md:h-[90vh] md:bg-black/95 md:flex-col md:justify-end md:gap-8 md:transition-all md:duration-300 md:ease-in-out md:border-l-[0.3vh] md:border-l-dashed md:border-l-retro-green md:border-b-[0.3vh] md:border-b-dashed md:border-b-retro-green md:rounded-bl-[20px] md:p-8 md:opacity-0 md:invisible md:pointer-events-none ${
						isMenuOpen ? 'md:opacity-100 md:visible md:pointer-events-auto' : ''
					} xs:w-[50%] xs:left-[50%]`}
				>
					<li>
						<Link
							to="/game"
							className="glitch-button text-white no-underline transition-all duration-200 ease-in-out relative flex items-center justify-center min-w-[50px] min-h-[50px]"
							data-text="GAME"
							onClick={closeMenu}
						>
							<span className="relative z-[1]">GAME</span>
						</Link>
					</li>
					<li>
						<Link
							to="/under_construction"
							className="glitch-button text-white no-underline transition-all duration-200 ease-in-out relative flex items-center justify-center min-w-[50px] min-h-[50px]"
							data-text="COMING SOON"
							onClick={closeMenu}
						>
							<span className="relative z-[1]">
								COMING
								<br />
								SOON
							</span>
						</Link>
					</li>
					<div className="mt-0 mr-0 flex flex-row gap-8 items-center lg:flex-row lg:mt-0 lg:mr-0 md:mt-8 md:mr-[2vh] md:flex-col">
						<a
							href="mailto:karlquerel@gmail.com"
							target="_blank"
							rel="noreferrer"
							className="scale-125 transition-transform duration-300 ease-in-out hover:scale-150"
						>
							<i className="nes-icon gmail is-medium" />
						</a>
						<a
							href="https://github.com/KarlQuerel"
							target="_blank"
							rel="noreferrer"
							className="scale-125 transition-transform duration-300 ease-in-out hover:scale-150"
						>
							<i className="nes-icon github is-medium" />
						</a>
						<a
							href="https://www.linkedin.com/in/karlquerel"
							target="_blank"
							rel="noreferrer"
							className="scale-125 transition-transform duration-300 ease-in-out hover:scale-150"
						>
							<i className="nes-icon linkedin is-medium" />
						</a>
					</div>
				</ul>
			</div>
			{isGameRoute && (
				<button
					className={`absolute -bottom-[47.5px] left-1/2 -translate-x-1/2 bg-transparent cursor-pointer z-[1020] transition-all duration-300 ease-in-out border-none outline-none p-0 focus:outline-none focus-visible:outline-none active:outline-none focus:border-none focus-visible:border-none active:border-none focus:shadow-none focus-visible:shadow-none active:shadow-none ${
						isHidden ? 'rotate-180' : ''
					} md:hidden`}
					onClick={toggleNavbar}
				>
					<img
						src="/assets/img/navbar-arrow.png"
						alt="Toggle Navbar"
						className={`w-10 h-10 bg-transparent border-2 border-dashed border-retro-green rounded-[10px] transition-transform duration-300 ease-in-out hover:scale-115 hover:shadow-[0_0_8px_#ffbd2e] ${
							isHidden ? 'rotate-180' : ''
						}`}
						style={{
							filter:
								'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)',
						}}
					/>
				</button>
			)}
		</nav>
	)
}

export default RetroNavbar

