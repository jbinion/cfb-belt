import 'dotenv/config';
import NewTracker from './newTracker.js';
import getWeeks from './api/getWeeks.js';
import getGame from './api/getGame.js';
import mongoose from './mongoose.js';
import delay from './utils/delay.js';
import getTeamData from './db/getTeamData.js';
import saveTeams from './db/saveTeams.js';
import saveReign from './db/saveReign.js';

await mongoose();
console.log('connected');

const createLineage = async (team, startYear, maxYear) => {
  console.log(`creating lineage for team ${team} from year ${startYear}`);
  const beltTracker = NewTracker.getInstance(team);
  console.log(beltTracker.currentHolder);
  // const maxYear = config.maxYear;
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
  return { reigns: beltTracker.reigns, teams: beltTracker.teams };
};

// create belt lineage
const { reigns, teams } = await createLineage('Nebraska', 1971, 2025);
const teamArray = Array.from(teams);
console.log(JSON.stringify(reigns, null, 2));
console.log(teams);

const teamData = await getTeamData(teamArray);
await saveTeams(teamData);
await Promise.all(
  reigns.map(async (reign) => {
    await saveReign(reign, '1971_Nebraska');
  })
);
console.log('done');
