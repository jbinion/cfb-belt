import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { findUp } from 'find-up';

const envPath = findUp('.env');
if (envPath) {
	dotenv.config({ path: envPath });
}

export default defineConfig({
	root: '.',
	esbuild: {
		tsconfigRaw: '{}',
	},
	test: {
		clearMocks: true,
		globals: true,
	},
	resolve: {
		alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
	},
});
