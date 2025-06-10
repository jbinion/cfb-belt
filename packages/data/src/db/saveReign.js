import { Reign, Team } from 'models';
import saveGames from './saveGames.js';

const saveReign = async ({ reign, beltName }) => {
  const gameIds = await saveGames(reign.games, beltName);
  const teamId = await Team.findOne({ name: reign.team }).select('_id');
  console.log(teamId);

  return Reign.findOneAndUpdate(
    { team: teamId._id, startDate: reign.startDate },
    {
      games: gameIds,
      beltName,
      startDate: reign.startDate,
      endDate: reign.endDate,
    },
    { upsert: true, new: true }
  );
};
export default saveReign;
