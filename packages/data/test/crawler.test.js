import { expect } from 'vitest';
import crawler from '../src/crawler';
import { test } from 'vitest';
test(
  'crawler',
  async () => {
    const options = {
      startYear: '1995',
      team: 'Alabama',
      maxYear: '1996',
    };

    const { reigns, teams } = await crawler(options);
    console.log(teams);
    console.log(reigns);
    expect(teams).toHaveLength(9);
    expect(reigns).toHaveLength(3);
  },
  { timeout: 60000 }
);
