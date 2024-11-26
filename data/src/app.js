import 'dotenv/config';
import Beltracker from './beltTracker.js';
import config from './utils/config.js';
import getWeeks from './api/getWeeks.js';
import getGame from './api/getGame.js';
import writeData from './utils/writeData.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  const beltTracker = Beltracker.getInstance();
  const maxYear = config.maxYear;
  let active = true;
  let year = config.startYear;

  while (active) {
    const weeks = await getWeeks(year);
    for (let i = 0; i < weeks.length; i++) {
      const games = await getGame({
        year,
        week: weeks[i].week,
        team: beltTracker.currentHolder || null,
        type: weeks[i].type,
      });
      if (games) {
        games.forEach((game) => beltTracker.addGame(game));
      }
      await delay(500);
    }

    year++;
    if (year >= maxYear) active = false;
  }
  console.log(beltTracker.currentHolder);
  writeData(beltTracker.games);
};
process.on('SIGINT', () => {
  const beltTracker = Beltracker.getInstance();
  writeData(beltTracker.games);
  process.exit();
});

main();
