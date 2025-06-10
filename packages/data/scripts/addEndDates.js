import 'dotenv/config';

import { Reign } from 'models';
import mongoose from '../src/mongoose.js';

const main = async () => {
  await mongoose();
  const reigns = await Reign.find({ endDate: { $exists: false } }).populate(
    'games'
  );
  console.log(reigns);
  await Promise.all(
    reigns.map(async (r) => {
      console.log(r.startDate);
      console.log(r.games.at(-1).start_date);
      return Reign.findOneAndUpdate(
        {
          _id: r._id,
        },
        { endDate: r.games.at(-1).start_date }
      );
    })
  );
  console.log('done');
};
main();
