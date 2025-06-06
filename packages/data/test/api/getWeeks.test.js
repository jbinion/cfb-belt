import getWeeks from '../../src/api/getWeeks';

describe('getWeeks', () => {
  it('should return data', async () => {
    try {
      const result = await getWeeks(2020);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
});
