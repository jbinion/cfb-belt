// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import type { PageLoad } from './$types';
import data from './old.lineage.json';
export const load: PageLoad = async () => {
	const lastTen = data.reverse().slice(0, 10);
	return {
		current: lastTen[0],
		recent: lastTen.slice(1)
	};
};
