import 'dotenv/config';
import mongoose from './mongoose.js';
import populateTeamData from './populateTeamData.js';
import saveTeams from './db/saveTeams.js';
import saveReign from './db/saveReign.js';
import crawler from './crawler.js';
import fs from 'fs';

const app = async ({ startTeam, startYear, maxYear }) => {
  try {
    await mongoose();
    console.log('connected');

    // create belt lineage
    const { reigns, teams } = await crawler({ startTeam, startYear, maxYear });
    fs.writeFileSync('./out/results.json', JSON.stringify(reigns));
    // const teamArray = Array.from(teams);
    console.log(JSON.stringify(reigns, null, 2));
    console.log(teams);

    const { teamData, noData } = await populateTeamData(teams);
    console.log(noData);
    await saveTeams(teamData);
    await Promise.all(
      reigns.map(async (reign) => {
        await saveReign({ reign });
      })
    );
    console.log('done');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

const settings = {
  startTeam: 'Rutgers', // should start with first ever game, so no initial team
  startYear: '1869',
  maxYear: '2025',
};

app(settings);
