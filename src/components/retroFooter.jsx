import { useFooterVisibility } from '../contexts/FooterVisibilityContext'
import './retroFooter.scss'

function RetroFooter() {
	const { isFooterVisible } = useFooterVisibility()

	return (
		<footer
			className={`footer ${!isFooterVisible ? 'footer-hidden' : ''}`}
			data-nosnippet
		>
			<div className="footer-copyright">
				<span>&copy; 2025 Karl Querel - All rights reserved</span>
			</div>
		</footer>
	)
}

export default RetroFooter

