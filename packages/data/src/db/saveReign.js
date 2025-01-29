import Reign from '../models/Reign.js';
import Team from '../models/Team.js';
import saveGames from './saveGames.js';

const saveReign = async (reign, beltName) => {
  const gameIds = await saveGames(reign.games);
  const teamId = await Team.findOne({ name: reign.team }).select('_id');
  console.log(teamId);

  return Reign.findOneAndUpdate(
    { team: teamId._id, startDate: reign.startDate },
    { games: gameIds, beltName, startDate: reign.startDate },
    { upsert: true, new: true }
  );
};
export default saveReign;
