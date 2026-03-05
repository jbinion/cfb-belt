import { expect, test, beforeAll } from 'vitest';
import getNextChallenger from '../../src/lib/getNextChallenger';
import { connect } from '../../src/lib/db/mongoose';

beforeAll(async () => {
	await connect();
});

test('getReigns', async () => {
	const result = await getNextChallenger();
	console.log(result);
});
