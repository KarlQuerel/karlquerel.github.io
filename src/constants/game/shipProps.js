// The props that dress HERMES-8's rooms (dev only, the ship lab). Each model is readied by
// claude-ship/props/prep.py: metres, standing on y 0, centred, its front toward +z, textures capped at 1024.
// Downloads from Sketchfab, each CC BY 4.0 and modified: local only (.git/info/exclude) until the credits are on
// the site.

export const SHIP_PROP_MODELS = {
	// "Cryopod" by epilogueronin (sketchfab.com/3d-models/b24a4d1c4d93489ba5ced1a45d5cfa12): 0.87 x 2.2 x 1.19 m
	cryopod: '/assets/game/models/ship-cryopod.glb',
	// "Medical Kit" by tediuminteractive (sketchfab.com/3d-models/1c5c0905f9f34b939309cff3ecd00870)
	medicalKit: '/assets/game/models/ship-medical_kit.glb',
	// "Medical Props" by coawhite (sketchfab.com/3d-models/4b2e1a4c3f13432b9a0bc15355b27632): an instrument trolley
	medicalTrolley: '/assets/game/models/ship-medical_props.glb',
}

// Each prop: a model in a room, `at` [x, z] m from the room's middle, turned `turn` rad about up (0: its front
// toward the nose, +z; π/2: toward +x), standing on the room's floor. The walk keeps clear of its footprint.
const QUARTER = Math.PI / 2

export const SHIP_PROPS = [
	// cryo bay: five pods for the five who slept. Yours on the aft wall (the walk starts in front of it) beside the
	// commander's, the locked engineering door between them; the engineer's and the biologist's on the lab side;
	// the doctor's on the med side, by the door the doctor went through
	{ model: 'cryopod', room: 'cryo', at: [-1.3, -3.25] },
	{ model: 'cryopod', room: 'cryo', at: [1.3, -3.25] },
	{ model: 'cryopod', room: 'cryo', at: [-2.35, -1.8], turn: QUARTER },
	{ model: 'cryopod', room: 'cryo', at: [-2.35, 2.5], turn: QUARTER },
	{ model: 'cryopod', room: 'cryo', at: [2.35, -1.8], turn: -QUARTER },
	// a medical kit left on the floor by your pod
	{ model: 'medicalKit', room: 'cryo', at: [-0.55, -2.85], turn: 0.5 },
	// med bay: the instrument trolley against the outer wall
	{ model: 'medicalTrolley', room: 'med', at: [1.4, -2.8], turn: QUARTER },
]
