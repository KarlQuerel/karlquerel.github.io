import ClickCounter from './clickCounter'
import './underConstruction.scss'

function UnderConstruction() {
	return (
		<div className="content">
			<div className="nes-container is-dark is-rounded">
				<p>Under Construction</p>
				<img
					src="/assets/img/construction.gif"
					alt="construction GIF"
					className="construction-gif"
				/>
				<p />
			</div>

			<ClickCounter />
		</div>
	)
}

export default UnderConstruction

