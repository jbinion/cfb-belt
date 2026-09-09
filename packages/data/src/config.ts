import dotenv from 'dotenv';
import { findUp } from 'find-up';

dotenv.config({ path: await findUp('.env') });

const config = {
	baseUrl: 'https:api.collegefootballdata.com',
	startYear: 1869,
	maxYear: process.env.MAX_YEAR,
	reqOptions: {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + process.env.API_KEY,
		},
	},
	delayAmount: 300,
};
export default config;
