/**
 * HTML Sanitization Utility
 * 
 * WARNING: v-html in Vue and dangerouslySetInnerHTML in React can be security risks
 * if content comes from user input or untrusted sources.
 * 
 * This utility provides basic sanitization. For production, consider using DOMPurify:
 * npm install dompurify
 * 
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string | null | undefined): string {
	if (!html || typeof html !== 'string') {
		return ''
	}

	// Basic sanitization - remove script tags and event handlers
	// For production, use DOMPurify library for comprehensive sanitization
	let sanitized = html

	// Remove script tags and their content
	sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

	// Remove event handlers (onclick, onerror, etc.)
	sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')

	// Remove javascript: protocol
	sanitized = sanitized.replace(/javascript:/gi, '')

	return sanitized
}

/**
 * Check if HTML content is safe to render
 * 
 * @param html - HTML string to check
 * @returns True if content appears safe
 */
export function isHtmlSafe(html: string | null | undefined): boolean {
	if (!html || typeof html !== 'string') {
		return true
	}

	// Check for dangerous patterns
	const dangerousPatterns = [
		/<script/i,
		/javascript:/i,
		/on\w+\s*=/i, // Event handlers
		/<iframe/i,
		/<object/i,
		/<embed/i,
	]

	return !dangerousPatterns.some(pattern => pattern.test(html))
}

/**
 * REACT MIGRATION NOTE:
 * 
 * In React, replace v-html with:
 * 
 * import DOMPurify from 'dompurify'
 * 
 * <span
 *   className={line.type}
 *   dangerouslySetInnerHTML={{
 *     __html: DOMPurify.sanitize(line.content)
 *   }}
 * />
 * 
 * Or use a React component library that handles sanitization automatically.
 */

