import 'dotenv/config';
//import getGame from './api/getGame.js';
import Reign from './models/Reign.js';
// import Team from './models/Team.js';
// import Game from './models/Game.js';

import mongoose from './mongoose.js';

await mongoose();
console.log('db connected');

const currentHolder = await Reign.findOne({})
  .sort({ startDate: -1 })
  .populate('team')
  .populate('games');
console.log(currentHolder);

// const game = await getGame({
//   year: '2025',
//   week: '1',
//   team: currentHolder.team.name,
//   type: 'regular',
// });
// console.log(game);
