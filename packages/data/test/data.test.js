import { expect, test } from 'vitest';
import getWeeks from '../src/api/getWeeks';
import getGame from '../src/api/getGame';
test('first test', () => {
  expect(1).toBe(1);
});

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
  expect(game).toEqual({ test: 'e' });
});
