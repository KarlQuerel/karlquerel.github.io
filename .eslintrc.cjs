module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'prettier'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	plugins: ['vue', 'unused-imports'],
	ignorePatterns: ['dist/*', 'node_modules/*', 'public/*'],
	rules: {
		// Vue specific rules
		'vue/multi-word-component-names': 'off',
		
		// Disable all formatting rules - let Prettier handle them
		'indent': 'off',
		'vue/html-indent': 'off',
		'vue/script-indent': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'quotes': 'off',
		'comma-dangle': 'off',
		'semi': 'off',
		'object-curly-spacing': 'off',
		'array-bracket-spacing': 'off',
		'arrow-spacing': 'off',
		'space-before-function-paren': 'off',
		
		// vue/max-attributes-per-line conflicts with Prettier (Prettier keeps a tag
		// on one line when it fits printWidth; the rule caps attributes per line) —
		// let Prettier own attribute wrapping. See 'prettier' in `extends`.
		'vue/max-attributes-per-line': 'off',
		'vue/html-self-closing': ['error', {
			'html': {
				'void': 'always',
				'normal': 'always',
				'component': 'always'
			}
		}],

		// General rules (non-formatting)
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': 'off',

		// Unused variables and imports detection
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				'vars': 'all',
				'varsIgnorePattern': '^_',
				'argsIgnorePattern': '^_'
			}
		],
		'vue/no-unused-vars': 'error',
		'no-unused-expressions': 'error',
		'vue/no-unused-components': 'error',
		'vue/no-unused-properties': 'error'
	}
}