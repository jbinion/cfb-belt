import getWeeks from '../../src/api/getWeeks';
import { describe, expect, it } from 'vitest';
const expectedResult = [
  { week: 1, type: 'regular' },
  { week: 2, type: 'regular' },
  { week: 3, type: 'regular' },
  { week: 4, type: 'regular' },
  { week: 5, type: 'regular' },
  { week: 6, type: 'regular' },
  { week: 7, type: 'regular' },
  { week: 8, type: 'regular' },
  { week: 9, type: 'regular' },
  { week: 10, type: 'regular' },
  { week: 11, type: 'regular' },
  { week: 12, type: 'regular' },
  { week: 13, type: 'regular' },
  { week: 14, type: 'regular' },
  { week: 15, type: 'regular' },

  { week: 1, type: 'postseason' },
];

describe('getWeeks', () => {
  it('should return data', async () => {
    try {
      const result = await getWeeks(2020);
      console.log(result);
      expect(result).toEqual([
        ...expectedResult,
        { week: 16, type: 'regular' },
        { week: 20, type: 'postseason' },
      ]);
    } catch (e) {
      console.log(e);
    }
  });
  it('should also return data', async () => {
    try {
      const result = await getWeeks(1992);
      console.log(result);
      expect(result).toEqual(expectedResult);
    } catch (e) {
      console.log(e);
    }
  });
});
