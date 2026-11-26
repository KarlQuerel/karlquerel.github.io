// The props that dress HERMES-8's rooms (dev only, the ship lab). Each model is readied by
// claude-ship/props/prep.py (metres, standing on y 0, centred, its front toward +z), then npm run models:shrink.
// Downloads from Sketchfab, each CC BY 4.0 and modified: credits in public/assets/CREDITS.txt.

export const SHIP_PROP_MODELS = {
	// "Medical Props" by coawhite (sketchfab.com/3d-models/4b2e1a4c3f13432b9a0bc15355b27632): an instrument trolley
	medicalTrolley: '/assets/game/models/ship-medical_props.glb',
}

// Each prop: a model in a room, `at` [x, z] m from the room's middle, turned `turn` rad about up (0: its front
// toward the nose, +z; π/2: toward +x), standing on the room's floor. The walk keeps clear of its footprint.
const QUARTER = Math.PI / 2

export const SHIP_PROPS = [
	// med bay: the instrument trolley against the outer wall
	{ model: 'medicalTrolley', room: 'med', at: [1.4, -2.8], turn: QUARTER },
]
