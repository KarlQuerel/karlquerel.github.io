// The storyboard in order (GAME_STORY.md section 4). Every shot is a module of one shape:
//   key, frag (+ chunks), duration in s (0 waits on ready(t, io)), card { at, text },
//   marks { name: seconds } the overlays key off, params(t, io, gl, grid) -> { p, q, h, mask },
//   hud(clock, marks, choices) -> IntroHud props, choice(clock, marks, choices) -> { key, options },
//   enter(io), setup(gl), resize(gl, grid), release(gl).
import { year } from './year.js'
import { earth } from './earth.js'
import { sun } from './sun.js'
import { fields } from './fields.js'
import { chamber } from './chamber.js'
import { shipyard } from './shipyard.js'
import { corridor } from './corridor.js'
import { cryo } from './cryo.js'
import { board } from './board.js'
import { wake } from './wake.js'
import { crash } from './crash.js'
import { title } from './title.js'

export const INTRO_SHOTS = [
	year,
	earth,
	sun,
	fields,
	chamber,
	shipyard,
	corridor,
	cryo,
	board,
	wake,
	crash,
	title,
]
