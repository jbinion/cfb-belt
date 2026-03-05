import { expect, test, beforeAll } from 'vitest';
import { getReigns } from '../../src/lib/getReigns';
import { connect } from '../../src/lib/db/mongoose';

beforeAll(async () => {
	await connect();
});

test('getReigns', async () => {
	const result = await getReigns();
	expect(result).toBeDefined();
	expect(result.length).toBe(10);
});
