import '../src/dotenv';
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
		console.log('teams ')
		console.log(teams);
		console.log('\n\n\n')
		console.log(reigns);
		console.log('\n\n\n')

		console.log(reigns.at(-1).games);
		expect(teams).toHaveLength(3);

		// this has been changed from 3 to 2 under the assumption that ohio state looses the first game, and thus a reign for ohio state is never created. how this logic works with continued, ie when added new games, is not tested
		expect(reigns).toHaveLength(2);
	},
	{ timeout: 60000 }
);
