import { COWSAY_MASCOT, SECRET_GAME_SPIN_MS, SECRET_GAME_URL } from '@/constants/terminal'
import { markup, plain } from './terminalText'

// Easter eggs: greetings, the dog, cowsay, sudo, matrix and the secret game.
export function createFunCommands({ spinFor, print, onMatrix }) {
	const greeting = () => [plain('Hello there.')]

	return {
		greeting,
		hello: greeting,
		hi: greeting,
		hey: greeting,

		yako: () => [{ type: 'typewriter', image: '/assets/img/Yako_Animations/Idle.gif' }],

		cowsay: args => {
			const text = args.trim() || 'woof.'
			return [
				' ' + '_'.repeat(text.length + 2),
				`< ${text} >`,
				' ' + '-'.repeat(text.length + 2),
				...COWSAY_MASCOT,
			].map(plain)
		},

		sudo: () => [
			markup('<span class="text-red">You have no power here, Gandalf Storm Crow!</span>'),
		],

		matrix: () => {
			onMatrix()
			return []
		},

		secret_game: () =>
			spinFor(SECRET_GAME_SPIN_MS, () => {
				print(plain('Redirecting to scratch game'))
				window.open(SECRET_GAME_URL, '_blank')
			}),
	}
}
