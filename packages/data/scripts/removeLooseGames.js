import 'dotenv/config';
import mongoose from '../src/mongoose.js';
import { Game, Reign } from 'models';

const removeLooseGames = async () => {
  await mongoose();

  const games = await Game.find()
    .populate('away_team')
    .populate('home_team')
    .lean();
  for (const game of games) {
    const r = await Reign.findOne({ games: game._id });

    if (!r) {
      await Game.findOneAndDelete({ _id: game._id });
    }
  }
  process.exit();
};
removeLooseGames();
