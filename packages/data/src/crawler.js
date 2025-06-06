import getGame from './api/getGame';
import getWeeks from './api/getWeeks';
import BeltTracker, { getGameWinner } from './beltTracker';
import delay from './utils/delay';

const crawler = async ({ team, startYear, maxYear, startWeekIndex = 0 }) => {
  console.log(`creating lineage for team ${team} from year ${startYear}`);
  const beltTracker = BeltTracker.getInstance(team);
  let active = true;
  let year = startYear;
  // used for testing
  let initialStart = startWeekIndex;

  while (active) {
    const weeks = await getWeeks(year);
    console.log(weeks);
    for (let i = initialStart; i < weeks.length; ) {
      await delay(400);
      const initalHolder = beltTracker.currentHolder || null;
      const games = await getGame({
        year,
        week: weeks[i].week,
        team: beltTracker.currentHolder || null,
        type: weeks[i].type,
      });
      console.log(games);
      if (!games || games.length == 0) {
        i++;
        continue;
      }
      console.log(games);
      if (games) {
        games.forEach((game) => beltTracker.addGame(game));
      }
      // a team can play more than one game per 'week'
      // if the current belt holder loses the first game,
      // we need to refetch the week for the new belt holder to get potential second games, likely a championship
      // this assumes there will never be more than 2 games in a week.
      let firstGameWinner = getGameWinner(games[0], initalHolder);
      if (firstGameWinner === initalHolder) {
        i++;
      }
    }

    //reset testing value which is meant to start crawler at season x week y
    initialStart = 0;
    year++;
    if (year >= maxYear) active = false;
  }
  return { reigns: beltTracker.reigns, teams: Array.from(beltTracker.teams) };
};

export default crawler;
