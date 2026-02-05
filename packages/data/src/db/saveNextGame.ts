import { NextGame, Team } from 'models';

const saveNextGame = async ({ home_team, away_team, gameId, start_date }) => {
  const homeTeamId = await Team.findOne({ name: home_team }).select('_id');
  const awayTeamId = await Team.findOne({ name: away_team }).select('_id');

  return await NextGame.findOneAndUpdate(
    {
      start_date: start_date,
      home_team: homeTeamId._id,
      away_team: awayTeamId?._id || null,
    },
    {
      away_team_name: away_team,
      home_team_name: home_team,

      id: gameId,
    },
    { upsert: true, new: true }
  );
};
export default saveNextGame;
