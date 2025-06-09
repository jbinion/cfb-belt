import 'dotenv/config';
import mongoose from './mongoose.js';
import populateTeamData from './populateTeamData.js';
import saveTeams from './db/saveTeams.js';
import saveReign from './db/saveReign.js';
import crawler from './crawler.js';
import fs from 'fs';

const app = async ({ startTeam, startYear, maxYear, title }) => {
  try {
    await mongoose();
    console.log('connected');

    // create belt lineage
    const { reigns, teams } = await crawler({ startTeam, startYear, maxYear });
    fs.writeFileSync('./out/results.json', JSON.stringify(reigns));
    const teamArray = Array.from(teams);
    console.log(JSON.stringify(reigns, null, 2));
    console.log(teams);

    const { teamData, noData } = await populateTeamData(teamArray);
    console.log(noData);
    await saveTeams(teamData);
    await Promise.all(
      reigns.map(async (reign) => {
        await saveReign({ reign, beltName: title });
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
  maxYear: '2025',
  title: 'v2',
};

app(settings);
// const testSave = async () => {
//   await mongoose();
//   console.log('connected');
//   const fileContent = await fs.readFileSync('./out/results.json');
//   const reigns = JSON.parse(fileContent.toString());
//   const teams = [
//     ...new Set(
//       reigns.flatMap((reign) =>
//         reign.games.flatMap((game) => [game.home_team, game.away_team])
//       )
//     ),
//   ];
//   console.log(teams);
//   const { teamData, noData } = await populateTeamData(teams);
//   console.log(noData);
//   // await saveTeams(teamData);
//   // await Promise.all(
//   //   reigns.map(async (reign) => {
//   //     await saveReign({ reign, beltName: 'v2' });
//   //   })
//   // );
//   console.log('done');
// };
// testSave();
