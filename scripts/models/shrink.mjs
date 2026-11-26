// Shrink the game's models for the web, in place: unused data pruned, textures capped at TEXTURE_PX as WebP, a
// still mesh simplified within SIMPLIFY_ERROR of its radius (a skinned or animated one never, its clips
// resampled instead), then meshopt-compressed. Nothing is merged or renamed: the game finds nodes, materials,
// bones and clips by name, empty nodes included. A model already shrunk is left as it is. Run it on every model
// before it is committed; the test suite fails on one that skipped it.
// usage: node scripts/models/shrink.mjs [model.glb ...]   (default: every model the game ships)

import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { glbJson, isShrunk, models } from './glb.mjs'

const CLI = '@gltf-transform/cli@4.5.1'
const TEXTURE_PX = 1024
const SIMPLIFY_ERROR = 0.001

const mb = path => (statSync(path).size / 1e6).toFixed(2)

function shrink(path) {
	const json = glbJson(path)
	if (isShrunk(json)) return console.warn(`${basename(path)}: already shrunk`)
	const moving = Boolean(json.skins?.length || json.animations?.length)
	const dir = mkdtempSync(join(tmpdir(), 'shrink-'))
	let at = path
	// each step reads the last one's output
	const step = (command, ...flags) => {
		const out = join(dir, `${command}.glb`)
		execFileSync('npx', ['-y', CLI, command, at, out, ...flags], {
			stdio: ['ignore', 'ignore', 'inherit'],
		})
		at = out
	}
	step('prune', '--keep-leaves', 'true', '--keep-attributes', 'false')
	if (moving) step('resample')
	else {
		step('weld')
		step('simplify', '--error', String(SIMPLIFY_ERROR))
	}
	if (json.images?.length) {
		step('resize', '--width', String(TEXTURE_PX), '--height', String(TEXTURE_PX))
		step('webp')
	}
	step('meshopt')
	const before = mb(path)
	copyFileSync(at, path)
	rmSync(dir, { recursive: true })
	console.warn(`${basename(path)}: ${before} MB -> ${mb(path)} MB`)
}

const paths = process.argv.slice(2)
for (const path of paths.length ? paths : models()) shrink(path)
