import { createContext, useContext, useState } from 'react'

const FooterVisibilityContext = createContext(null)

export function FooterVisibilityProvider({ children }) {
	const [isFooterVisible, setIsFooterVisible] = useState(true)

	const toggleFooter = () => {
		setIsFooterVisible(prev => !prev)
	}

	const hideFooter = () => {
		setIsFooterVisible(false)
	}

	const showFooter = () => {
		setIsFooterVisible(true)
	}

	return (
		<FooterVisibilityContext.Provider
			value={{
				isFooterVisible,
				toggleFooter,
				hideFooter,
				showFooter,
			}}
		>
			{children}
		</FooterVisibilityContext.Provider>
	)
}

export function useFooterVisibility() {
	const context = useContext(FooterVisibilityContext)
	if (!context) {
		return {
			isFooterVisible: true,
			toggleFooter: () => {},
			hideFooter: () => {},
			showFooter: () => {},
		}
	}
	return context
}

