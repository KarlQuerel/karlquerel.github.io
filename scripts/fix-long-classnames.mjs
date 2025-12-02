#!/usr/bin/env node

/**
 * Script to automatically convert long className strings to template literals
 * This allows Prettier to format them across multiple lines
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const MAX_LINE_LENGTH = 100

function getAllTsFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir)

	for (const file of files) {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
			getAllTsFiles(filePath, fileList)
		} else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
			fileList.push(filePath)
		}
	}

	return fileList
}

function fixLongLines(content, filePath) {
	const lines = content.split('\n')
	const fixedLines = []
	let changed = false

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const originalLine = line

		// Skip if line is already short enough
		if (line.length <= MAX_LINE_LENGTH) {
			fixedLines.push(line)
			continue
		}

		// Check for className="..." or className='...' (but not already template literals)
		const classNameStringMatch = line.match(
			/(\s*)(.*?)className=(["'])([^"']+)\3(.*)/
		)

		// Also check for template literals that are too long
		const classNameTemplateMatch = line.match(
			/(\s*)(.*?)className=\{`([^`]+)`\}(.*)/
		)

		if (classNameStringMatch) {
			const [, indent, before, quote, classNameValue, after] = classNameStringMatch

			// Only convert if the line is too long
			if (line.length > MAX_LINE_LENGTH) {
				// Split className into logical groups
				const classes = classNameValue.split(/\s+/).filter(Boolean)
				const linesOfClasses = []
				let currentLine = ''
				const maxClassLineLength = 70 // Shorter to force multi-line

				for (const cls of classes) {
					if (currentLine.length + cls.length + 1 > maxClassLineLength && currentLine) {
						linesOfClasses.push(currentLine.trim())
						currentLine = cls
					} else {
						currentLine += (currentLine ? ' ' : '') + cls
					}
				}
				if (currentLine) {
					linesOfClasses.push(currentLine.trim())
				}

				// Build template literal with forced line breaks
				const tabIndent = indent + '\t\t\t'
				const newClassName = `className={\`
${tabIndent}${linesOfClasses.join(`\n${tabIndent}`)}
${indent}\t\t\`}`

				const newLine = before + newClassName + after
				fixedLines.push(newLine)
				changed = true
				continue
			}
		} else if (classNameTemplateMatch && line.length > MAX_LINE_LENGTH) {
			// Handle existing template literals that are too long
			const [, indent, before, classNameValue, after] = classNameTemplateMatch

			// Remove existing newlines and split by spaces
			const cleanValue = classNameValue.replace(/\s+/g, ' ').trim()
			const classes = cleanValue.split(/\s+/).filter(Boolean)
			const linesOfClasses = []
			let currentLine = ''
			const maxClassLineLength = 70

			for (const cls of classes) {
				if (currentLine.length + cls.length + 1 > maxClassLineLength && currentLine) {
					linesOfClasses.push(currentLine.trim())
					currentLine = cls
				} else {
					currentLine += (currentLine ? ' ' : '') + cls
				}
			}
			if (currentLine) {
				linesOfClasses.push(currentLine.trim())
			}

			const tabIndent = indent + '\t\t\t'
			const newClassName = `className={\`
${tabIndent}${linesOfClasses.join(`\n${tabIndent}`)}
${indent}\t\t\`}`

			const newLine = before + newClassName + after
			fixedLines.push(newLine)
			changed = true
			continue
		}

		// Check for other long strings that might need breaking
		// (but be more careful here)
		fixedLines.push(line)
	}

	return { content: fixedLines.join('\n'), changed }
}

function main() {
	const srcDir = path.join(__dirname, '..', 'src')
	const files = getAllTsFiles(srcDir)

	console.log(`Checking ${files.length} TypeScript files...\n`)

	let fixedCount = 0
	const fixedFiles = []

	for (const file of files) {
		try {
			const content = fs.readFileSync(file, 'utf8')
			const { content: fixed, changed } = fixLongLines(content, file)

			if (changed) {
				fs.writeFileSync(file, fixed, 'utf8')
				fixedCount++
				fixedFiles.push(path.relative(process.cwd(), file))
				console.log(`✓ Fixed: ${path.relative(process.cwd(), file)}`)
			}
		} catch (error) {
			console.error(`✗ Error processing ${file}:`, error.message)
		}
	}

	if (fixedCount > 0) {
		console.log(`\n✓ Fixed ${fixedCount} files`)
		console.log('\nRunning Prettier to format...')
		try {
			execSync('npm run format', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
		} catch (error) {
			console.error('Prettier error:', error.message)
		}
	} else {
		console.log('\n✓ No files needed fixing')
	}
}

main()

