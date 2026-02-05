import { expect } from 'vitest';
import crawler from '../src/crawler';
import { test } from 'vitest';
test(
	'crawler',
	async () => {
		const options = {
			startYear: '2019',
			team: 'Ohio State',
			maxYear: '2020',
			startWeekIndex: '16',
		};

		const { reigns, teams } = await crawler(options);
		console.log(teams);
		console.log(reigns);
		console.log(reigns.at(-1).games);
		expect(teams).toHaveLength(3);
		expect(reigns).toHaveLength(3);
	},
	{ timeout: 60000 }
);
