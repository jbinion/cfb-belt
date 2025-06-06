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
      await delay(400);
      const games = await getGame({
        year,
        week: weeks[i].week,
        team: beltTracker.currentHolder || null,
        type: weeks[i].type,
      });
      if (!games) continue;
      console.log(games);
      if (games.length === 1) {
        beltTracker.addGame(games[0]);
        continue;
      }
      // a team can play more than one game per 'week'
      // if the current belt holder loses the first game,
      // we need to refetch the week for the new belt holder to get the second game, likely a championship
      if (games) {
        games.forEach((game) => beltTracker.addGame(game));
      }
    }
    year++;
    if (year >= maxYear) active = false;
  }
  return { reigns: beltTracker.reigns, teams: Array.from(beltTracker.teams) };
};

export default crawler;
