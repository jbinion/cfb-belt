import { test } from 'vitest';
import getNextChallenger from '../../src/lib/getNextChallenger';

test('getNextChallenger', async () => {
	const result = await getNextChallenger();
	console.log(result);
});
