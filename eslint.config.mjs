import globals from 'globals'
import pluginJs from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		plugins: {
			prettier: prettierPlugin
		}
	},
	{
		ignores: ['node_module', 'dist'],
		...pluginJs.configs.recommended
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2021
			},
			parserOptions: {}
		}
	},
	{
		files: ['**/*.{js,mjs}'],
		rules: {
			...eslintConfigPrettier.rules,
			semi: 'off',
			'arrow-parens': 'off',
			'comma-dangle': 'off',
			'no-console': 0,
			'require-jsdoc': 'off',
			'no-tabs': 0,
			'no-trailing-spaces': 'off',
			indent: 'off',
			'no-debugger': 'off',
			'padded-blocks': 'off',
			'prefer-default-export': 'off',
			'no-prototype-builtins': 'off',
			'no-mixed-spaces-and-tabs': 'off'
		}
	}
]

// module.exports = {
// 	env: {
// 		browser: true,
// 		node: true,
// 		es2021: true
// 	},
// 	extends: 'eslint:recommended',
// 	overrides: [],
// 	parserOptions: {
// 		ecmaVersion: 'latest',
// 		sourceType: 'module'
// 	},
// 	rules: {
// 		semi: 'off',
// 		'arrow-parens': 'off',
// 		'comma-dangle': 'off',
// 		'no-console': 0,
// 		'require-jsdoc': 'off',
// 		'no-tabs': 0,
// 		'no-trailing-spaces': 'off',
// 		indent: 'off',
// 		'no-debugger': 'off',
// 		'padded-blocks': 'off',
// 		'prefer-default-export': 'off',
// 		'no-prototype-builtins': 'off',
// 		'no-mixed-spaces-and-tabs': 'off'
// 	},
// 	settings: {
// 		'import/resolver': {
// 			alias: {
// 				map: [['@', './src']]
// 			},
// 			extensions: ['.js']
// 		}
// 	}
// }
