import { describe, expect, it } from 'vitest';
import getGameById from '../../src/api/getGameById';

describe('getGameById', () => {
	it('should return a game', async () => {
		const result = await getGameById(1);
		expect(result.season).toEqual(1869);
	});
});
