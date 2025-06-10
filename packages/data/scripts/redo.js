import 'dotenv/config';
import mongoose from '../src/mongoose.js';

import { Reign, Team } from 'models';

const fixLogoFileNames = async () => {
  try {
    await mongoose();
    const teams = await Team.find({});
    console.log(teams);
    for (let idx in teams) {
      console.log(teams[idx]);
      const query = { _id: teams[idx]._id };
      if (teams[idx].logoFile === '' || !teams[idx].logoFile) {
        const update = { logoFile: 'default' };
        console.log(update);
        await Team.findOneAndUpdate(query, update);
        continue;
      }

      const newLogoFile = teams[idx].logoFile.split('.')[0];
      const update = { logoFile: newLogoFile };
      console.log(update);
      await Team.findOneAndUpdate(query, update);
    }

    console.log('done');
  } catch (e) {
    console.log(e);
  }
};

const addEndGames = async () => {
  await mongoose();
  const allReigns = await Reign.find({}).populate('games');
  console.log(allReigns);
  console.log(allReigns[0]);
  console.log(allReigns[0].games.at(-1).start_date);

  await Promise.all(
    allReigns.map(async (reign) => {
      const endDate = reign.games.at(-1).start_date;
      console.log(endDate);
      return Reign.findOneAndUpdate({ _id: reign._id }, { endDate });
    })
  );
  console.log('done');
};

addEndGames();
