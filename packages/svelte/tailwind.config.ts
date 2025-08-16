import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'background-color': 'var(--background-color)',
				foreground: 'var(--foreground)',
				'foreground-muted': 'var(--foreground-muted)',
				border: 'var(--border)',
				link: 'var(--link)',
				'link-hover': 'var(--link-hover)',
				'card-hover': 'var(--card-hover)'
			}
		}
	},

	plugins: [typography]
} satisfies Config;
