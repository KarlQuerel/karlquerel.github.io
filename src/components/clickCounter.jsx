import { useState, useEffect } from 'react'
import { loadClicks, updateClicks } from '../js/firebase-setup.js'
import './clickCounter.scss'

function ClickCounter() {
	const [counter, setCounter] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadCounter() {
			const count = await loadClicks()
			setCounter(count)
			setLoading(false)
		}
		loadCounter()
	}, [])

	const handleIncrementCounter = async () => {
		const newCounter = counter + 1
		setCounter(newCounter)

		try {
			await updateClicks()
		} catch (error) {
			setCounter(counter)
		}
	}

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<div className="nes-container is-dark with-title is-centered is-rounded">
				<p className="title">Waste your time</p>

				<button
					id="clicker"
					className="nes-btn is-normal small-font"
					onClick={handleIncrementCounter}
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

