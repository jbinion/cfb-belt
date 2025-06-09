// the first batch of game db items were created without a 'beltName'
// this adds a belt name to all games without one
import 'dotenv/config';
import { Game } from 'models';
import mongoose from '../src/mongoose.js';

const main = async () => {
  await mongoose();
  console.log('connected');
  return await Game.updateMany(
    { beltName: { $exists: false } },
    { beltName: 'og' }
  );
};

main();
console.log('done');
process.exit();
