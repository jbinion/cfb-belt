import { connectDB } from '$lib/db/mongoose';
// Import all models to ensure schemas are registered
import '$lib/models/index';
import { Reign } from '$lib/models/index';
import Team from '$lib/models/Team';

export const prerender = true;

export async function load() {
	try {
		await connectDB();

		const teamsThatHeldBelt = await Reign.find().distinct('team');

		const teams = await Team.find({ _id: { $in: teamsThatHeldBelt } }).sort({ name: 1 });
		console.log(teams);
		return {
			teams: JSON.parse(JSON.stringify(teams))
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			teams: []
		};
	}
}
