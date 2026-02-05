import { expect, test } from 'vitest';
import getWeeks from '../src/api/getWeeks';
import getGame from '../src/api/getGame';

test('get weeks', async () => {
	const weeks = await getWeeks(2002);

	expect(weeks.length).toBe(17);
});

test('get game', async () => {
	const game = await getGame({
		year: 2025,
		week: 1,
		team: 'Florida',
		type: 'regular',
	});
	console.log(game);
	expect(game).toEqual([
		{
			away_points: 0,
			away_team: 'Long Island University',
			completed: true,
			home_points: 55,
			home_team: 'Florida',
			id: 401752668,
			start_date: '2025-08-30T23:00:00.000Z',
			type: 'regular',
			week: 1,
			year: 2025,
		},
	]);
});
