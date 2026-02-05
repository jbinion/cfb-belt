import config from '../config.js';

const getGameById = async (gameId) => {
	const searchParams = new URLSearchParams({ id: gameId }).toString();
	const url = config.baseUrl + '/games?' + searchParams;

	console.log(url);
	const res = await fetch(url, config.reqOptions);
	const data = await res.json();
	console.log(data[0]);
	return data[0];
};
export default getGameById;
