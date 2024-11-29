// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import type { PageLoad } from './$types';
import { data } from './final.json';
export const load: PageLoad = async () => {
	const lastTen = data.reverse().slice(0, 10);
	const teams = lastTen.map((x) => ({
		name: x.name,
		color: x.color,
		alternatColor: x.alternateColor,
		logo: x.logo,
		key: x.games[0].start_date
	}));
	return {
		current: teams[0],
		recent: teams.slice(1)
	};
};
