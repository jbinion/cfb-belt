import { connect } from '$lib/db/mongoose';
import { Reign, Team } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connect();

		const teamsThatHeldBelt = await Reign.find().distinct('team');

		const teams = await Team.find({ _id: { $in: teamsThatHeldBelt } }).sort({ name: 1 });

		const result = await Promise.all(
			teams.map(async (team) => {
				const reigns = await Reign.find({ team: team._id }).sort({ startDate: -1 });
				const defenses = reigns.reduce((acc, reign) => acc + reign.games.length - 1, 0);
				return { ...team.toObject(), reigns: reigns.length, defenses };
			})
		);
		return {
			teams: JSON.parse(JSON.stringify(result)),
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			teams: [],
		};
	}
}
