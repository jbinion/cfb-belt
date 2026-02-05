const config = {
	baseUrl: 'https:api.collegefootballdata.com',
	startYear: 1869,
	maxYear: 2025,
	reqOptions: {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + process.env.API_KEY,
		},
	},
	delayAmount: 300,
};
export default config;
