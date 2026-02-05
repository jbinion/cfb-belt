import { Reign } from 'models';
import mongoose from './mongoose.js';
import './dotenv';

const main = async () => {
  await mongoose();
  console.log('db connected');

  const allReigns = await Reign.find({})
    .populate('games')
    .sort({ startDate: 1 });
  //   console.log(allReigns.map((x) => x.startDate));

  await Promise.all(
    allReigns.map(async (reign) => {
      const nextReign = await Reign.findOne({
        startDate: { $gt: reign.startDate },
      })
        .populate('games')
        .sort({ startDate: 1 })
        .exec();
      if (nextReign) {
        console.log(reign.games.at(-1));
        console.log(nextReign?.games[0]);
        const query = { _id: reign._id };
        const update = { beltLossGame: nextReign.games[0]._id };
        console.log(query);
        console.log(update);
        return await Reign.findOneAndUpdate(query, update);
      }
    })
  );
  console.log('done');
};
main();
