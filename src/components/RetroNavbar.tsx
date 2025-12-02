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
			// prettier-ignore
			className={`fixed left-1/2 top-0 z-[1020] h-[10vh] min-h-[60px] w-[60%] -translate-x-1/2 rounded-b-[20px] border-[0.3vh] border-t-0 border-dashed border-retro-green bg-black/90 shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out ${
				isMenuOpen ? 'border-0 bg-transparent shadow-none' : ''
			} ${isHidden ? '-translate-y-full' : ''} xs:w-full sm:w-[95%] md:w-[95%] lg:w-[80%]`}
		>
			<div
				// prettier-ignore
				className={`xs:px-2 xs:justify-between mx-auto flex h-full max-w-full flex-row items-center justify-between px-8 sm:justify-between sm:gap-0 sm:px-4 md:px-4 lg:px-6`}
			>
				<Link
					to="/"
					// prettier-ignore
					className={`navbar-logo xs:max-w-[20%] xs:h-full xs:p-[0.2rem] relative flex h-full min-w-[40px] max-w-[20%] items-center md:h-full md:max-w-[25%] md:p-[0.3rem]`}
					onClick={closeMenu}
				>
					<img
						src="/assets/img/Yako_logo_128.png"
						className="navbar-logo-default relative h-full w-full rounded-[15%] object-contain"
						alt="Logo"
					/>
					<img
						src="/assets/img/Yako_logo_128.png"
						className="navbar-logo-glitch"
						alt="Logo Glitch"
					/>
				</Link>
				<div
					// prettier-ignore
					className={`xs:w-[25px] xs:h-[18px] xs:p-[1px] xs:border xs:border-retro-green xs:shadow-[2px_2px_0_#00ff00] relative z-[1030] hidden h-[21px] w-[35px] flex-col justify-between rounded-[5px] border-2 border-retro-green bg-black/80 p-[2px] shadow-[3px_3px_0_#00ff00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:flex lg:hidden`}
					onClick={toggleMenu}
				>
					<div
						// prettier-ignore
						className={`xs:h-[2px] relative h-[3px] w-full bg-retro-green transition-all duration-300 ease-in-out`}
					/>
					<div
						// prettier-ignore
						className={`xs:h-[2px] relative h-[3px] w-full bg-retro-green transition-all duration-300 ease-in-out`}
					/>
					<div
						// prettier-ignore
						className={`xs:h-[2px] relative h-[3px] w-full bg-retro-green transition-all duration-300 ease-in-out`}
					/>
				</div>
				<ul
					// prettier-ignore
					className={`md:border-l-dashed md:border-b-dashed m-0 hidden list-none p-0 md:pointer-events-none md:invisible md:fixed md:left-[85%] md:top-0 md:h-[90vh] md:w-[20%] md:flex-col md:justify-end md:gap-8 md:rounded-bl-[20px] md:border-b-[0.3vh] md:border-l-[0.3vh] md:border-b-retro-green md:border-l-retro-green md:bg-black/95 md:p-8 md:opacity-0 md:transition-all md:duration-300 md:ease-in-out lg:pointer-events-auto lg:visible lg:static lg:left-auto lg:top-auto lg:flex lg:h-auto lg:w-auto lg:translate-x-0 lg:flex-row lg:items-center lg:gap-12 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:opacity-100 ${
						isMenuOpen ? 'md:pointer-events-auto md:visible md:opacity-100' : ''
					} xs:w-[50%] xs:left-[50%]`}
				>
					<li>
						<Link
							to="/game"
							// prettier-ignore
							className={`glitch-button relative flex min-h-[50px] min-w-[50px] items-center justify-center text-white no-underline transition-all duration-200 ease-in-out`}
							data-text="GAME"
							onClick={closeMenu}
						>
							<span className="relative z-[1]">GAME</span>
						</Link>
					</li>
					<li>
						<Link
							to="/under_construction"
							// prettier-ignore
							className={`glitch-button relative flex min-h-[50px] min-w-[50px] items-center justify-center text-white no-underline transition-all duration-200 ease-in-out`}
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
					<div
						// prettier-ignore
						className={`mr-0 mt-0 flex flex-row items-center gap-8 md:mr-[2vh] md:mt-8 md:flex-col lg:mr-0 lg:mt-0 lg:flex-row`}
					>
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
					// prettier-ignore
					className={`absolute -bottom-[47.5px] left-1/2 z-[1020] -translate-x-1/2 cursor-pointer border-none bg-transparent p-0 outline-none transition-all duration-300 ease-in-out focus:border-none focus:shadow-none focus:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none active:border-none active:shadow-none active:outline-none ${
						isHidden ? 'rotate-180' : ''
					} md:hidden`}
					onClick={toggleNavbar}
				>
					<img
						src="/assets/img/navbar-arrow.png"
						alt="Toggle Navbar"
						// prettier-ignore
						className={`hover:scale-115 h-10 w-10 rounded-[10px] border-2 border-dashed border-retro-green bg-transparent transition-transform duration-300 ease-in-out hover:shadow-[0_0_8px_#ffbd2e] ${
							isHidden ? 'rotate-180' : ''
						}`}
						style={{
							filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)',
						}}
					/>
				</button>
			)}
		</nav>
	)
}

export default RetroNavbar
