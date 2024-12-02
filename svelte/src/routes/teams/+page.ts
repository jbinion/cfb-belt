export const prerender = true;
import type { PageLoad } from './$types';
import { data } from '../final.json';

export const load: PageLoad = async () => {
	const teams = data.map((x) => x.holder);
	const uniqueTeams = [...new Set(teams)];
	// console.log(uniqueTeams);
	const teamData = uniqueTeams.map((t) => {
		const index = data.findIndex((x) => x.holder === t);
		const { displayName, color, alternateColor, logo, name } = data[index];
		return {
			displayName,
			color,
			alternateColor,
			logo,
			name
		};
	});
	console.log(teamData);
	return {
		teams: teamData
	};
};
