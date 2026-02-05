import getTeamsFromEspn from '../../src/api/getTeamsFromEspn';

test('getTeamsFromEspn', async () => {
	const teams = await getTeamsFromEspn();
	console.log(teams);
	expect(teams.length).toBeGreaterThan(1);
});
