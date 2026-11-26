// The game's models as the shrink script and the test read them: a .glb's JSON chunk, and whether it is shrunk.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const MODELS_DIR = 'public/assets/game/models'

// every model the game ships
export const models = () =>
	readdirSync(MODELS_DIR)
		.filter(name => name.endsWith('.glb'))
		.map(name => join(MODELS_DIR, name))

// a .glb's JSON chunk: the 12-byte header, then the chunk's length and type, then the JSON
export function glbJson(path) {
	const bytes = readFileSync(path)
	return JSON.parse(bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString())
}

export const isShrunk = json => (json.extensionsUsed ?? []).includes('EXT_meshopt_compression')
