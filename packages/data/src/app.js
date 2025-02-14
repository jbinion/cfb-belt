import 'dotenv/config';
import mongoose from './mongoose.js';
import populateTeamData from './populateTeamData.js';
import saveTeams from './db/saveTeams.js';
import saveReign from './db/saveReign.js';
import crawler from './crawler.js';

const app = async ({ startTeam, startYear, endYear, title }) => {
  try {
    await mongoose();
    console.log('connected');

    // create belt lineage
    const { reigns, teams } = await crawler({ startTeam, startYear, endYear });
    const teamArray = Array.from(teams);
    console.log(JSON.stringify(reigns, null, 2));
    console.log(teams);

    const { teamData, noData } = await populateTeamData(teamArray);
    await saveTeams(teamData);
    await Promise.all(
      reigns.map(async (reign) => {
        await saveReign(reign, title);
      })
    );
    console.log('done');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

const settings = {
  startTeam: 'Rutgers',
  startYear: '1869',
  endYear: '2025',
  title: 'og',
};

app(settings);
