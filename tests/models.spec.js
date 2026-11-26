import { test, expect } from '@playwright/test'
import { glbJson, isShrunk, models } from '../scripts/models/glb.mjs'

// Every model the game ships has been through `npm run models:shrink`: a fresh download from Sketchfab is
// often several MB of raw geometry that the pixel pass would never show.
for (const path of models())
	test(`${path} is shrunk`, () => {
		expect(isShrunk(glbJson(path)), 'run npm run models:shrink').toBe(true)
	})
