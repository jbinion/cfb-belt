// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import type { PageLoad } from './$types';
import { data } from './final.json';
export const load: PageLoad = async () => {
	const workingData = [...data];
	const sorted = workingData.sort(
		(a, b) => new Date(b.games[0].start_date).getTime() - new Date(a.games[0].start_date).getTime()
	);
	return {
		data: sorted
	};
};
