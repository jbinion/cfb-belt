import { expect, test } from 'vitest';
import getWeeks from '../src/api/getWeeks';
import getGame from '../src/api/getGame';
import getTeamsFromEspn from '../src/api/getTeamsFromEspn';

test('first test', () => {
  expect(1).toBe(1);
});

test('get weeks', async () => {
  const weeks = await getWeeks(2002);
  console.log(weeks);
  expect(weeks.length).toBe(17);
});

test('getTeamsFromEspn', async () => {
  const teams = await getTeamsFromEspn();
  console.log(teams);
  expect(teams.length).toBeGreaterThan(1);
});

test('get game', async () => {
  const game = await getGame({
    year: 2025,
    week: 1,
    team: 'Florida',
    type: 'regular',
  });
  console.log(game);
});
