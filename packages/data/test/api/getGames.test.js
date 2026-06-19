import '../../src/dotenv';
import getGame from '../../src/api/getGame';
import { describe, expect, it } from 'vitest';

describe('getGame', () => {
	it('returns formatted game data', async () => {
		const result = await getGame({
			year: 2019,
			team: 'Clemson',
			week: '1',
			type: 'postseason',
		});
		expect(result).not.toBeNull();
		expect(Array.isArray(result)).toBe(true);
		expect(result[0]).toMatchObject({
			id: expect.any(Number),
			home_team: expect.any(String),
			away_team: expect.any(String),
		});
	});
});
