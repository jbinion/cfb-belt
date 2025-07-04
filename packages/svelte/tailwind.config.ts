import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'background-color': 'var(--background-color)',
				accent: 'var(--accent)',
				navBackground: 'var(--nav-background)'
			}
		}
	},

	plugins: [typography]
} satisfies Config;
