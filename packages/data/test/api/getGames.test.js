import getGames from '../../src/api/getGame';

describe('getGames', () => {
  it('getGames:should return data', async () => {
    try {
      const result = await getGames({
        year: 2019,
        team: 'Clemson',
        week: '1',
        type: 'postseason',
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
});
