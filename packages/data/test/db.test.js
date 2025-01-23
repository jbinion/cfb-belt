import getTeamData from '../src/db/getTeamData';
import saveGames from '../src/db/saveGames';
import saveReign from '../src/db/saveReign';
import saveTeams from '../src/db/saveTeams';
import initMongoose from '../src/mongoose';
import demoReigns, { demoTeams } from './demoReigns';

beforeAll(async () => {
  await initMongoose();
});

test('getTeamData', async () => {
  const teamData = await getTeamData(demoTeams);
  expect(teamData.length).toBe(demoTeams.length);
  expect(teamData[0]).toStrictEqual({
    name: 'UCLA',
    displayName: 'UCLA Bruins',
    color: '2774ae',
    alternateColor: 'f2a900',
    espnLogo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/26.png',
    logoFile: '26.png',
  });
});

test('saveTeams', async () => {
  const teamData = await getTeamData(demoTeams);
  console.log(teamData);
  expect(await saveTeams(teamData)).resolves();
});

test('saveGames', async () => {
  const testGames = demoReigns[0].games;
  const x = await saveGames(testGames);
  console.log(x);
  expect(x.length).toBe(testGames.length);
});
test('saveReign', async () => {
  console.log(demoReigns[0]);
  const result = await saveReign(demoReigns[0], 'testBelt');
  console.log(result);
  expect(result).toBeTruthy();
});
