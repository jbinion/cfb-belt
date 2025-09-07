import { Reign, Team } from 'models';
import saveGames from './saveGames.js';

const saveReign = async ({ reign, beltName, _id = null }) => {
  if (_id) console.log('updating reign id: ', _id);
  if (!_id) console.log('creating new reign for team: ', reign.team);
  const gameIds = await saveGames(reign.games, beltName);
  const teamId = await Team.findOne({ name: reign.team }).select('_id');
  console.log(teamId);

  if (_id) {
    return Reign.findByIdAndUpdate(
      _id,
      {
        $push: { games: { $each: gameIds } },
        endDate: reign.endDate,
      },
      { new: true }
    );
  }

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
