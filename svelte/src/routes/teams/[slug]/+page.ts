export const prerender = true;
import type { PageLoad } from './$types';
import { data } from '../../final.json';

export async function entries() {
	const teams = data.map((x) => x.holder.toLowerCase());
	const uniqueTeams = [...new Set(teams)];
	return uniqueTeams.map((t) => ({ slug: t }));
}

export const load: PageLoad = ({ params }) => {
	const teamReigns = data.filter((reign) => reign.name.toLocaleLowerCase() === params.slug);
	console.log(teamReigns);
	if (!teamReigns.length) {
		return { reigns: null };
	}
	return {
		reigns: teamReigns.reverse()
	};
};
