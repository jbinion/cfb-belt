import getGame from './api/getGame';
import getWeeks from './api/getWeeks';
import BeltTracker from './beltTracker';
import delay from './utils/delay';

const crawler = async ({ team, startYear, maxYear }) => {
  console.log(`creating lineage for team ${team} from year ${startYear}`);
  const beltTracker = BeltTracker.getInstance(team);
  let active = true;
  let year = startYear;

  while (active) {
    const weeks = await getWeeks(year);
    for (let i = 0; i < weeks.length; i++) {
      const games = await getGame({
        year,
        week: weeks[i].week,
        team: beltTracker.currentHolder || null,
        type: weeks[i].type,
      });
      console.log(games);
      if (games) {
        games.forEach((game) => beltTracker.addGame(game));
      }
      await delay(400);
    }
    year++;
    if (year >= maxYear) active = false;
  }
  return { reigns: beltTracker.reigns, teams: Array.from(beltTracker.teams) };
};

export default crawler;
