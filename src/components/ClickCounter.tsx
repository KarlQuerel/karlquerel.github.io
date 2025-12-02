import React, { useState, useEffect } from 'react'
import { loadClicks, updateClicks } from '../js/firebase-setup'

function ClickCounter(): React.JSX.Element {
	const [counter, setCounter] = useState<number | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	async function incrementCounter(): Promise<void> {
		if (counter === null) return
		setCounter(prev => (prev === null ? 0 : prev + 1))

		try {
			await updateClicks()
		} catch {
			setCounter(prev => (prev === null ? 0 : prev - 1))
		}
	}

	useEffect(() => {
		async function loadCounter(): Promise<void> {
			const count = await loadClicks()
			setCounter(count)
			setLoading(false)
		}
		loadCounter()
	}, [])

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<div
				// prettier-ignore
				className={`nes-container is-dark with-title is-centered is-rounded rounded-[20px] border-[0.3vh] border-dashed border-retro-green bg-black/50 uppercase`}
			>
				<p className="title">Waste your time</p>

				<button
					id="clicker"
					className="nes-btn is-normal text-base"
					onClick={incrementCounter}
				>
					ONE CLICK AT A TIME
				</button>

				<p>
					<span>{counter}</span>
				</p>
			</div>
		</div>
	)
}

export default ClickCounter
