import { useState } from 'react'

interface UseAssetPreloaderReturn {
	isLoading: boolean
	loadingProgress: number
	totalAssets: number
	loadedAssets: number
	preloadAssets: () => Promise<void>
	isPreloadingComplete: () => boolean
}

export function useAssetPreloader(): UseAssetPreloaderReturn {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [loadingProgress, setLoadingProgress] = useState<number>(0)
	const [totalAssets, setTotalAssets] = useState<number>(0)
	const [loadedAssets, setLoadedAssets] = useState<number>(0)

	const criticalAssets: string[] = [
		'/assets/game/menu-background.gif',
		'/assets/game/tavern.gif',
		'/assets/game/menu.png',
	]

	const secondaryAssets: string[] = [
		'/assets/game/hole.gif',
		'/assets/game/dead.gif',
		'/assets/game/credits.gif',
		'/assets/game/castle.gif',
	]

	const loadAsset = (assetPath: string): Promise<string> => {
		return new Promise(resolve => {
			const img = new Image()

			img.onload = () => {
				setLoadedAssets(prev => {
					const newCount = prev + 1
					setLoadingProgress(Math.round((newCount / totalAssets) * 100))
					return newCount
				})
				resolve(assetPath)
			}

			img.onerror = () => {
				console.warn(`Failed to load asset: ${assetPath}`)
				setLoadedAssets(prev => {
					const newCount = prev + 1
					setLoadingProgress(Math.round((newCount / totalAssets) * 100))
					return newCount
				})
				resolve(assetPath)
			}

			img.src = assetPath
		})
	}

	const preloadAssets = async (): Promise<void> => {
		setIsLoading(true)
		setLoadingProgress(0)
		const total = criticalAssets.length + secondaryAssets.length
		setTotalAssets(total)
		setLoadedAssets(0)

		try {
			await Promise.all(criticalAssets.map(loadAsset))

			await Promise.all(secondaryAssets.map(loadAsset))
		} catch (error) {
			console.error('Error preloading assets:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const isPreloadingComplete = (): boolean => {
		return !isLoading && loadedAssets === totalAssets
	}

	return {
		isLoading,
		loadingProgress,
		totalAssets,
		loadedAssets,
		preloadAssets,
		isPreloadingComplete,
	}
}

