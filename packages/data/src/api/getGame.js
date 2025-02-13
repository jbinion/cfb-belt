import config from '../utils/config.js';

const getGame = async ({ year, week, team, type }) => {
  const reqParams = {
    year: year,
    week: week,
    seasonType: type,
  };
  if (team) reqParams.team = team;
  const searchParams = new URLSearchParams(reqParams).toString();
  const url = config.baseUrl + '/games?' + searchParams;

  console.log(url);
  const res = await fetch(url, config.reqOptions);
  const data = await res.json();
  console.log(data);
  if (!data[0]) return null;
  // in olden days, teams would play multiple games in a week
  const results = data.map((x) => ({
    start_date: x.start_date,
    home_team: x.home_team,
    away_team: x.away_team,
    home_points: x.home_points,
    away_points: x.away_points,
    week,
    type,
    year,
  }));

  return results;
};
export default getGame;
