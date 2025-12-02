#!/usr/bin/env node

/**
 * Script to add prettier-ignore comments to long className template literals
 * that Prettier keeps collapsing
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

function addPrettierIgnore(content) {
	const lines = content.split('\n')
	const fixedLines = []
	let changed = false

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const nextLine = i + 1 < lines.length ? lines[i + 1] : ''

		// Check if this line is too long and contains className template literal
		if (
			line.length > MAX_LINE_LENGTH &&
			line.includes('className') &&
			(line.includes('`') || nextLine.includes('`'))
		) {
			// Check if prettier-ignore is not already present
			const prevLine = i > 0 ? lines[i - 1] : ''
			if (!prevLine.includes('prettier-ignore')) {
				// Find the indentation of the current line
				const indent = line.match(/^(\s*)/)[1]
				fixedLines.push(`${indent}// prettier-ignore`)
				changed = true
			}
		}

		fixedLines.push(line)
	}

	return { content: fixedLines.join('\n'), changed }
}

function main() {
	const srcDir = path.join(__dirname, '..', 'src')
	const files = getAllTsFiles(srcDir)

	console.log(`Checking ${files.length} TypeScript files for long className lines...\n`)

	let fixedCount = 0

	for (const file of files) {
		try {
			const content = fs.readFileSync(file, 'utf8')
			const { content: fixed, changed } = addPrettierIgnore(content)

			if (changed) {
				fs.writeFileSync(file, fixed, 'utf8')
				fixedCount++
				console.log(`✓ Added prettier-ignore: ${path.relative(process.cwd(), file)}`)
			}
		} catch (error) {
			console.error(`✗ Error processing ${file}:`, error.message)
		}
	}

	if (fixedCount > 0) {
		console.log(`\n✓ Added prettier-ignore to ${fixedCount} files`)
	} else {
		console.log('\n✓ No files needed prettier-ignore')
	}
}

main()

