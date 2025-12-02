module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint', 'unused-imports', 'prettier'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	ignorePatterns: ['dist/*', 'node_modules/*', 'public/*'],
	rules: {
		// React rules
		'react/react-in-jsx-scope': 'off', // Not needed in React 17+
		'react/prop-types': 'off', // Using TypeScript for prop validation

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
		'max-len': [
			'error',
			{
				code: 100,
				tabWidth: 4,
				ignoreUrls: true,
				ignoreStrings: false,
				ignoreTemplateLiterals: false,
				ignoreRegExpLiterals: true,
				ignoreComments: false
			}
		],
		'prettier/prettier': 'error',

		// TypeScript rules
		'@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports plugin
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',

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
		'no-unused-expressions': 'error'
	}
}
