import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import * as eslintPluginImport from 'eslint-plugin-import';
import vitest from 'eslint-plugin-vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends('eslint:recommended'),
	{
		languageOptions: {
			globals: { ...globals.node },
			ecmaVersion: 12,
			sourceType: 'module',
		},

		rules: {
			indent: ['error', 2],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
		},
	},
	{
		plugins: {
			import: eslintPluginImport,
		},
	},
	{
		files: ['tests/**'], // or any other pattern
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
			'vitest/max-nested-describe': ['error', { max: 3 }], // you can also modify rules' behavior using option like this
		},
	},
];
