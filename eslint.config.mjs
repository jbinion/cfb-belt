import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';

import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default tseslint.config(
	// Respect the repo .gitignore, plus build output that isn't always ignored.
	includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
	{
		ignores: ['**/build/', '**/.svelte-kit/', '**/dist/', '**/node_modules/'],
	},

	// Base rule sets. Prettier owns formatting, so no stylistic rules live here.
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	...svelte.configs['flat/prettier'],
	prettier,

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
		},
	},

	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},

	// Vitest rules for test files (previously only in packages/data).
	{
		files: ['**/*.{test,spec}.{js,ts}', '**/tests/**'],
		plugins: { vitest },
		rules: {
			...vitest.configs.recommended.rules,
			'vitest/max-nested-describe': ['error', { max: 3 }],
		},
	}
);
