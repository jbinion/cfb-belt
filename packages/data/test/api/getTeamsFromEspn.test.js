import getTeamsFromEspn from '../../src/api/getTeamsFromEspn';

test('getTeamsFromEspn', async () => {
  const teams = await getTeamsFromEspn();

  expect(teams.length).toBeGreaterThan(1);
});
