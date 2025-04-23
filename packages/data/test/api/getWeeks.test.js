import getWeeks from '../../src/api/getWeeks';

describe('getWeeks', () => {
  it('should return data', async () => {
    const result = await getWeeks(2018);
    console.log(result);
  });
});
