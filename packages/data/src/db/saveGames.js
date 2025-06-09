import { Game, Team } from 'models';

const saveGames = async (gameArray, beltName) => {
  const games = await Promise.all(
    gameArray.map(async (g) => {
      console.log(g);
      const homeTeamId = await Team.findOne({ name: g.home_team }).select(
        '_id'
      );
      const awayTeamId = await Team.findOne({ name: g.away_team }).select(
        '_id'
      );

      return await Game.findOneAndUpdate(
        {
          start_date: g.start_date,
          home_team: homeTeamId._id,
          away_team: awayTeamId?._id || null,
        },
        {
          home_points: g.home_points,
          away_points: g.away_points,
          away_team_name: g.away_team,
          home_team_name: g.home_team,
          beltName,
          id: g.id,
        },
        { upsert: true, new: true }
      );
    })
  );
  return games.map((g) => g._id);
};
export default saveGames;
