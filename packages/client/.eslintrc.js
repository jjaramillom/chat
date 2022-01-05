module.exports = {
	env: {
		browser: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:react/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'import', 'filenames', 'react', 'prettier'],
	rules: {
		'no-use-before-define': 'off',
		'@typescript-eslint/no-explicit-any': 2,
		'@typescript-eslint/no-unused-vars': ['error', {args: 'none', varsIgnorePattern: '^_'}],
		'@typescript-eslint/no-use-before-define': 0,
		'filenames/match-exported': [2, ['pascal', 'camel']],
		'react/jsx-filename-extension': [1, {extensions: ['.tsx', '.ts']}],
		'react/prop-types': 'off',
		'import/newline-after-import': 2,
		'import/no-duplicates': 2,
		'no-nested-ternary': 'error',
		'import/order': [
			2,
			{
				'newlines-between': 'always',
				groups: ['external'],
				alphabetize: {order: 'asc', caseInsensitive: true}
			}
		],
		'no-console': ['error', {allow: ['warn', 'error']}],
		'import/extensions': [
			2,
			{
				ts: 'never',
				tsx: 'never',
				css: 'ignorePackages'
			}
		]
	}
};
