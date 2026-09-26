// relative on purpose: keeps this pure-data module loadable outside Vite (no alias)
import { BADGE_LABELS, SUPERSET_STEPS } from './sportLabels.js'

const tag = cls => ({ class: cls, label: BADGE_LABELS[cls] })
const lines = meta => meta.map(([strong, text]) => ({ strong, text }))

// Every lift carries [muscle, level, drop set?, rest]. `badge` tags a lift with a muscle other than
// the one it is filed under. The stylesheet orders the badges, so the data never has to.
function exercise(name, muscle, level, rest, meta, { drop = false, badge = muscle } = {}) {
	return {
		name,
		muscle,
		badges: [
			{ class: badge },
			tag(level),
			...(drop ? [tag('drop-set')] : []),
			{ class: 'rest', label: rest },
		],
		meta: lines(meta),
	}
}

function warmup(name, muscle, time, meta) {
	return {
		name,
		muscle,
		badges: [tag('warm-up'), tag('easy'), { class: 'warmup-time', label: time }],
		meta: lines(meta),
	}
}

// A block with `exercises` is a superset; the steps letter them in order.
const superset = (muscle, lifts) => ({
	muscle,
	exercises: lifts.map((lift, i) => ({ ...lift, step: SUPERSET_STEPS[i] })),
})

export const BASE_WARMUP = warmup('Base Warm-up', 'shoulders', '5 min', [
	['Joint Circles', 'Wrists, neck, and elbows — smooth circles in both directions'],
	['Shoulders', 'Goalpost rotations and band pulleys — light tension, full range'],
])

export const WEEKLY_SPLIT = [
	{
		id: 'monday',
		day: 'MONDAY',
		kind: 'Push',
		accent: 'chest',
		chips: ['chest', 'shoulders', 'triceps', 'legs', 'abs'],
		blocks: [
			exercise('Hack Squat Calf Raises', 'legs', 'hard', '1.5 min', [
				['Setup', 'Face outward on the hack squat; legs straight with soft knees'],
				['Form', 'Rise onto your toes; pause at the bottom for a deep calf stretch'],
			]),
			exercise('Seated Calf Raises', 'legs', 'easy', '1 min', [
				['Focus', 'Lighter weight, higher reps — chase the pump, not max load'],
			]),
			warmup('Specific', 'shoulders', '3 min', [
				['Drill', 'Scapular push-ups — 12 slow reps, protract and retract fully'],
			]),
			exercise('Cable Flyes', 'chest', 'easy', '1 min', [
				['Setup', 'Arms wide; cables at chest height'],
				['Tempo', '2-second pause at the deepest stretch'],
				['Focus', 'Squeeze your chest at the top — not your hands'],
			]),
			exercise(
				'Incline Bench Press',
				'chest',
				'hard',
				'3 min',
				[
					['Setup', 'Bench at setting 2 with a weight plate under the back'],
					['Form', 'Pin shoulder blades to the bench throughout the set'],
					['Cue', 'Drive feet into the floor for stability on heavy sets'],
				],
				{ drop: true }
			),
			exercise(
				'Weighted Dips',
				'chest',
				'hard',
				'3 min',
				[
					['Form', 'Lean forward slightly; flare elbows to target the chest'],
					['Range', 'Lower until shoulders sit just below elbows — no bouncing'],
				],
				{ drop: true }
			),
			exercise(
				'Skullcrushers',
				'triceps',
				'medium',
				'2 min',
				[
					['Form', 'Lower dumbbells to ear level behind the head'],
					['Grip', 'Neutral (palms facing) to protect wrists and elbows'],
					['Cue', 'Keep elbows tucked and fixed in place'],
				],
				{ drop: true }
			),
			superset('shoulders', [
				exercise('Lateral Raises', 'shoulders', 'easy', '10s', [
					['Form', 'Lead with elbows — hands stay below elbow height'],
					['Tempo', 'Slow on the way down; no swinging or momentum'],
				]),
				exercise('Incline Rear Delt Fly', 'shoulders', 'easy', '2 min', [
					['Setup', 'Incline bench at setting 2; chest on the pad'],
					['Cue', 'Pinky finger is the highest point of each hand'],
				]),
			]),
		],
	},
	{
		id: 'tuesday',
		day: 'TUESDAY',
		kind: 'Pull',
		accent: 'back',
		chips: ['back', 'biceps', 'forearms', 'shoulders', 'abs'],
		blocks: [
			warmup('Specific', 'back', '3 min', [
				['Drill', 'Dead hangs — 2 sets × 45 seconds; relax the shoulders'],
			]),
			exercise('Bodyweight Pull-ups', 'back', 'medium', '3 min', [
				['Volume', '3 sets × ~12 clean reps; full range, no kipping'],
			]),
			exercise(
				'Single-Arm Machine Row',
				'back',
				'hard',
				'3 min',
				[
					['Form', 'Start with the left arm; match reps on the right for symmetry'],
					['Cue', 'Sternum glued to the pad — pull elbow to hip, hands are just hooks'],
					['Setup', 'Grip the machine frame with your free hand for stability'],
				],
				{ drop: true }
			),
			exercise(
				'Neutral-Grip Lat Pulldown',
				'back',
				'medium',
				'2 min',
				[
					['Focus', 'Pull with elbows; avoid leaning back excessively'],
					['Form', 'Squeeze shoulder blades down at the bottom of each rep'],
				],
				{ drop: true }
			),
			superset('back', [
				exercise('Straight Arm Pulldown', 'back', 'easy', '10s', [
					['Form', "Flat back, abs braced — don't arch or stick hips out"],
					['Cue', 'Slight bend in elbows; pull with lats, not arms'],
				]),
				exercise('Bayesian Curl', 'biceps', 'easy', '2 min', [
					['Setup', 'Step forward from the pulley for constant tension'],
					['Form', 'Full stretch behind the body at the bottom of each rep'],
				]),
			]),
			exercise(
				'Hammer Curl',
				'biceps',
				'easy',
				'1 min',
				[
					['Cue', 'Crush the handles hard for forearm activation'],
					['Tempo', 'Controlled negatives — no swinging at the shoulder'],
				],
				{ drop: true, badge: 'forearms' }
			),
			exercise('Dumbbell Shrugs', 'shoulders', 'easy', '2 min', [
				['Volume', '3 sets × 12–15 reps'],
				['Tempo', '2-second hold at the top of each shrug'],
			]),
		],
	},
	{
		id: 'thursday',
		day: 'THURSDAY',
		kind: 'Legs + Shoulders',
		accent: 'legs',
		chips: ['legs', 'shoulders', 'abs'],
		blocks: [
			warmup('Specific', 'legs', '3 min', [
				['Drill', 'Leg swings — 15 reps per leg, front-to-back and side-to-side'],
				['Drill', 'Deep goblet squat hold — 45 seconds, elbows push knees out'],
			]),
			exercise('Seated Calf Raises', 'legs', 'hard', '1.5 min', [
				['Tempo', '2-second pause at the bottom; explosive up, 3-second eccentric'],
				['Form', 'Squeeze hard at the top; drive through the big toe'],
			]),
			exercise('Hack Squat Calf Raises', 'legs', 'easy', '1 min', [
				['Focus', 'Lighter weight, high reps — flush the muscle with blood'],
			]),
			exercise('Hack Squat', 'legs', 'hard', '3 min', [
				['Form', 'Full depth — ass to ground without rounding the lower back'],
				['Cue', 'Feet mid-platform; push through heels on the way up'],
			]),
			exercise(
				'Leg Extension',
				'legs',
				'medium',
				'2 min',
				[
					['Tempo', '1-second hold at the top; slow controlled eccentric'],
					['Focus', 'Point toes up at the top to fully contract the quads'],
				],
				{ drop: true }
			),
			exercise(
				'Leg Curl',
				'legs',
				'easy',
				'1 min',
				[
					['Focus', "Feel the hamstrings working — don't lean forward into the pad"],
					['Tempo', 'Pause briefly at the top; control the weight on the way down'],
				],
				{ drop: true }
			),
			exercise('Hip Abduction', 'legs', 'easy', '1 min', [
				['Focus', 'Outer hip and glute medius — press knees out against the pads'],
			]),
			exercise('Overhead Press', 'shoulders', 'medium', '2 min', [
				['Setup', 'Seated on bench at setting 3; dumbbells at shoulder height'],
				['Form', "Press straight up; don't flare elbows excessively"],
			]),
		],
	},
	{
		id: 'friday',
		day: 'FRIDAY',
		kind: 'Upper Body',
		accent: 'triceps',
		chips: ['chest', 'back', 'biceps', 'triceps', 'forearms'],
		blocks: [
			warmup('Specific', 'chest', '3 min', [
				['Drill', 'Push-ups — 15 reps, full range, controlled tempo'],
			]),
			exercise(
				'Bench Press',
				'chest',
				'hard',
				'3 min',
				[
					['Form', 'Pin shoulder blades back and down before each rep'],
					['Cue', 'Drive feet into the floor; touch chest to the bar'],
				],
				{ drop: true }
			),
			exercise(
				'Bodyweight Pull-ups',
				'back',
				'hard',
				'3 min',
				[
					['Volume', 'Work to failure — every rep counts'],
					['Form', 'Full hang at the bottom; chin clears the bar at the top'],
				],
				{ drop: true }
			),
			exercise(
				'Pec Flyes',
				'chest',
				'medium',
				'2 min',
				[
					['Setup', 'Machine or cable — whichever gives the best stretch'],
					['Focus', "Squeeze chest at the top; don't let shoulders roll forward"],
				],
				{ drop: true }
			),
			superset('triceps', [
				exercise('Overhead Cable Triceps Extension', 'triceps', 'medium', '15s', [
					['Setup', 'Low pulley; rope or bar behind the head'],
					['Focus', 'Deep stretch at the bottom of each rep'],
				]),
				exercise('Cable Rope Pushdowns', 'triceps', 'medium', '1.5 min', [
					['Setup', 'High pulley with rope attachment'],
					['Form', 'Split the rope apart at full extension'],
				]),
			]),
			superset('biceps', [
				exercise('Seated Bicep Curl', 'biceps', 'easy', '15s', [
					['Form', 'Clean reps with controlled negatives — no body English'],
				]),
				exercise('High Plank', 'waist', 'medium', '1.5 min', [
					['Volume', 'Hold until failure'],
					['Cue', 'Pull belly button in; maintain a straight line head to heels'],
				]),
			]),
		],
	},
]
