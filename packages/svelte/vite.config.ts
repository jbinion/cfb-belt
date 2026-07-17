import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { findUp } from 'find-up';
import dotenv from 'dotenv';

const envPath = await findUp('.env');
if (envPath) {
	dotenv.config({ path: envPath });
}

export default defineConfig({
	plugins: [sveltekit()],

	ssr: {
		// better-sqlite3 is a native CJS addon; bundling it into the ESM SSR
		// output breaks its `bindings` loader, which relies on __filename.
		external: ['better-sqlite3'],
	},

	test: {
		include: ['test/**/*.{test,spec}.{js,ts}'],
	},
});
