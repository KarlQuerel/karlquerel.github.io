import { createContext, useContext, useState, ReactNode } from 'react'

interface FooterVisibilityContextType {
	isFooterVisible: boolean
	toggleFooter: () => void
	hideFooter: () => void
	showFooter: () => void
}

const FooterVisibilityContext = createContext<FooterVisibilityContextType | undefined>(undefined)

interface FooterVisibilityProviderProps {
	children: ReactNode
}

export function FooterVisibilityProvider({ children }: FooterVisibilityProviderProps) {
	const [isFooterVisible, setIsFooterVisible] = useState<boolean>(true)

	const toggleFooter = (): void => {
		setIsFooterVisible(prev => !prev)
	}

	const hideFooter = (): void => {
		setIsFooterVisible(false)
	}

	const showFooter = (): void => {
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

export function useFooterVisibility(): FooterVisibilityContextType {
	const context = useContext(FooterVisibilityContext)
	if (!context) {
		throw new Error(
			'useFooterVisibility must be used within FooterVisibilityProvider'
		)
	}
	return context
}

