import { expect, test } from 'vitest';
import { getReigns } from '../../src/lib/getReigns';

test('getReigns', async () => {
	const result = await getReigns();
	expect(result).toBeDefined();
	expect(result.length).toBe(10);
});
