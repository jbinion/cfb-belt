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

	test: {
		include: ['test/**/*.{test,spec}.{js,ts}'],
	},
});
