#!/usr/bin/env node

/**
 * Script to automatically fix long className strings by converting them to template literals
 * This allows Prettier to break them across multiple lines
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const MAX_LINE_LENGTH = 100
const TAB_WIDTH = 4

// Get all TypeScript/TSX files
function getAllTsFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir)

	files.forEach(file => {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
			getAllTsFiles(filePath, fileList)
		} else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
			fileList.push(filePath)
		}
	})

	return fileList
}

// Fix long className strings in a file
function fixLongClassNameStrings(content) {
	const lines = content.split('\n')
	const fixedLines = []
	let inJsx = false
	let braceDepth = 0

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const trimmedLine = line.trim()

		// Check if line exceeds max length and contains className
		if (line.length > MAX_LINE_LENGTH && trimmedLine.includes('className=')) {
			// Check if it's a simple string className (not already a template literal)
			const classNameMatch = line.match(/className=["']([^"']+)["']/)

			if (classNameMatch) {
				const classNameValue = classNameMatch[1]
				const indent = line.match(/^(\s*)/)[1]

				// Convert to template literal format
				const beforeClassName = line.substring(0, line.indexOf('className='))
				const afterClassName = line.substring(
					line.indexOf('className=') + `className="${classNameValue}"`.length
				)

				// Split className into logical groups (approximately 80 chars per line)
				const classes = classNameValue.split(/\s+/)
				const linesOfClasses = []
				let currentLine = ''

				for (const cls of classes) {
					if (currentLine.length + cls.length + 1 > 80) {
						if (currentLine) linesOfClasses.push(currentLine.trim())
						currentLine = cls
					} else {
						currentLine += (currentLine ? ' ' : '') + cls
					}
				}
				if (currentLine) linesOfClasses.push(currentLine.trim())

				// Build the new multi-line className
				const newClassName = `className={\`
${indent}\t\t\t${linesOfClasses.join(`\n${indent}\t\t\t`)}
${indent}\t\t\`}`

				fixedLines.push(beforeClassName + newClassName + afterClassName)
				continue
			}
		}

		fixedLines.push(line)
	}

	return fixedLines.join('\n')
}

// Main function
function main() {
	const srcDir = path.join(__dirname, '..', 'src')
	const files = getAllTsFiles(srcDir)

	console.log(`Found ${files.length} TypeScript files to check...`)

	let fixedCount = 0

	for (const file of files) {
		try {
			const content = fs.readFileSync(file, 'utf8')
			const fixed = fixLongClassNameStrings(content)

			if (content !== fixed) {
				fs.writeFileSync(file, fixed, 'utf8')
				fixedCount++
				console.log(`Fixed: ${path.relative(process.cwd(), file)}`)
			}
		} catch (error) {
			console.error(`Error processing ${file}:`, error.message)
		}
	}

	console.log(`\nFixed ${fixedCount} files.`)
	console.log('Running Prettier to format...')
	execSync('npm run format', { stdio: 'inherit' })
	console.log('Running ESLint to check...')
	execSync('npm run lint:fix', { stdio: 'inherit' })
}

if (require.main === module) {
	main()
}

module.exports = { fixLongClassNameStrings }

