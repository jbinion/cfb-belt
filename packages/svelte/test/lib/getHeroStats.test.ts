import { expect, test } from 'vitest';
import getHeroStats from '../../src/lib/getHeroStats';

test('get Hero Stats', async () => {
	const result = await getHeroStats();

	expect(result).toBeDefined();
	expect(result).toHaveProperty('totalReigns');
	expect(result).toHaveProperty('teamCount');
	expect(result).toHaveProperty('yearsTracked');
	expect(result).toHaveProperty('totalGames');
	expect(typeof result.totalReigns).toBe('number');
	expect(typeof result.teamCount).toBe('number');
	expect(typeof result.yearsTracked).toBe('number');
	expect(typeof result.totalGames).toBe('number');
});
