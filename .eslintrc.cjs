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
	  'vue/html-indent': ['error', 'tab'],
	  'vue/script-indent': ['error', 'tab'],
	  'vue/html-closing-bracket-newline': ['error', {
		'singleline': 'never',
		'multiline': 'always'
	  }],
	  'vue/max-attributes-per-line': ['error', {
		'singleline': 3,
		'multiline': 1
	  }],
	  'vue/html-self-closing': ['error', {
		'html': {
		  'void': 'always',
		  'normal': 'always',
		  'component': 'always'
		}
	  }],
  
	  // General rules
	  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	  'indent': ['error', 'tab'],
	  'no-tabs': 'off',
	  'quotes': ['error', 'single'],
	  'semi': ['error', 'never'],
	  'comma-dangle': ['error', 'always-multiline'],
	  'object-curly-spacing': ['error', 'always'],
	  'array-bracket-spacing': ['error', 'never'],
	  'arrow-spacing': ['error', { 'before': true, 'after': true }],
	  'space-before-function-paren': ['error', {
		'anonymous': 'always',
		'named': 'never',
		'asyncArrow': 'always'
	  }],

	  // Unused variables and imports detection
	  'no-unused-vars': 'off', // Turn off base rule as it can report incorrect errors
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