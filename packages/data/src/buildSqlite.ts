import './dotenv';
import crawler from './crawler';
import populateTeamData from './populateTeamData';
import saveTeams from './sqlite/saveTeams';
import saveReign from './sqlite/saveReign';
import addGameLost from './sqlite/addGameLost';

const settings = {
  startTeam: 'Rutgers',
  startYear: '1869',
  maxYear: '2025',
};

const main = async () => {
  try {
    const { reigns, teams } = await crawler(settings);
    const { teamData, noData } = await populateTeamData(teams);
    if (noData.length) console.log('no data for:', noData);
    await saveTeams(teamData);
    for (const reign of reigns) {
      await saveReign({ reign });
    }
    await addGameLost();
    console.log('done');
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
