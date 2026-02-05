import config from '../config.js';
import formatGame from './formatGame.js';

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
	//  teams can play multiple games in a "week"
	const results = data.map((x) => formatGame(x));

	return results;
};
export default getGame;
