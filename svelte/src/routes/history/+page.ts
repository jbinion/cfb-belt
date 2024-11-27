// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import type { PageLoad } from './$types';
import data from './lineageWithGames.json';
export const load: PageLoad = async () => {
	return {
		data: data
	};
};
