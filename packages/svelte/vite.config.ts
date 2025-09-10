import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import findConfig from 'find-config';
import dotenv from 'dotenv';

const envPath = findConfig('.env');
if (envPath) {
	dotenv.config({ path: envPath });
}

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
