import 'dotenv/config';
import config from './config.js';
import getWeeks from './api/getWeeks.js';

import { Reign } from 'models';
import mongoose from './mongoose.js';
import getGameById from './api/getGameById.js';
import crawler from './crawler.js';
import populateTeamData from './populateTeamData.js';
import saveReign from './db/saveReign.js';
import saveTeams from './db/saveTeams.js';

const main = async () => {
  await mongoose();
  console.log('db connected');

  const currentReign = await Reign.findOne({})
    .sort({ startDate: -1 })
    .populate('team')
    .populate('games');
  console.log(currentReign);
  console.log(currentReign.games.at(-1));
  const lastGameId = currentReign.games.at(-1).id;
  console.log(lastGameId);
  /// get most recent game details

  const { season, week, seasonType } = await getGameById(lastGameId);
  //   console.log(data);
  console.log(season);
  console.log(week);
  console.log(seasonType);

  // check if next game is this season
  const weeks = await getWeeks(season);
  console.log(weeks);

  const currentGameIndex = weeks.findIndex(
    (x) => x.week === week && x.type === seasonType
  );
  console.log('Current game index:', currentGameIndex);
  //   console.log(weeks.length);
  console.log('startTeam ', currentReign.team.name);
  console.log('startYear: ', season);
  console.log('startWeekIndex: ', currentGameIndex + 1);
  console.log('start reign id: ', currentReign._id);
  const { reigns, teams } = await crawler({
    team: currentReign.team.name,
    startYear: season,
    maxYear: 2026,
    startWeekIndex: currentGameIndex + 1,
    startReignId: currentReign._id,
  });
  // console.log(reigns);
  // console.log(teams);
  console.log('resulting reign(s)');
  console.log(JSON.stringify(reigns, null, 2));
  // const { teamData, noData } = await populateTeamData(teams);
  // if (noData.length) console.log('no data for: ', noData);
  // await saveTeams(teamData);
  await Promise.all(
    reigns.map(async (reign) => {
      await saveReign({
        reign,
        beltName: currentReign.beltName,
        _id: reign._id,
      });
    })
  );
};
main();
