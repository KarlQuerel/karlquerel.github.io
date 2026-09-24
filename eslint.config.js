import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import unusedImports from 'eslint-plugin-unused-imports'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
	{ ignores: ['dist/', 'public/', 'test-results/'] },
	js.configs.recommended,
	...vue.configs['flat/essential'],
	// prettier owns formatting; everything after it re-enables only what it must not switch off
	prettier,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: { 'unused-imports': unusedImports },
		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/html-self-closing': [
				'error',
				{ html: { void: 'always', normal: 'always', component: 'always' } },
			],

			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',

			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{ vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
			],
			'vue/no-unused-vars': 'error',
			'no-unused-expressions': 'error',
			'vue/no-unused-components': 'error',
			'vue/no-unused-properties': 'error',
		},
	},
]
