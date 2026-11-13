import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				'background-secondary': 'var(--background-secondary)',
				foreground: 'var(--foreground)',
				'foreground-secondary': 'var(--foreground-secondary)',

				'foreground-muted': 'var(--foreground-muted)',
				border: 'var(--border)',
				link: 'var(--link)',
				'link-hover': 'var(--link-hover)',
				'card-hover': 'var(--card-hover)',
				accent: 'var(--accent)',
			},
		},
	},

	plugins: [typography],
} satisfies Config;
