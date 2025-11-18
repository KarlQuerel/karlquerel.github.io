module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'eslint:recommended',
		'prettier'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		},
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	plugins: ['react', 'react-hooks', 'unused-imports'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	ignorePatterns: ['dist/*', 'node_modules/*', 'public/*'],
	rules: {
		// React specific rules
		'react/react-in-jsx-scope': 'off', // Not needed in React 17+
		'react/prop-types': 'off', // We're using JavaScript, not TypeScript
		
		// Disable all formatting rules - let Prettier handle them
		'indent': 'off',
		'quotes': 'off',
		'comma-dangle': 'off',
		'semi': 'off',
		'object-curly-spacing': 'off',
		'array-bracket-spacing': 'off',
		'arrow-spacing': 'off',
		'space-before-function-paren': 'off',

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
		'no-unused-expressions': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn'
	}
}