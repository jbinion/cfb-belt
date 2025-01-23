import { connectDB } from '$lib/db/mongoose';
// Import all models to ensure schemas are registered
import '$lib/models/index';
import { Reign } from '$lib/models/index';
import Team from '$lib/models/Team';

export const prerender = true;

export async function load({ params }) {
	try {
		await connectDB();
		console.log(params);
		const team = await Team.findOne({ slug: params.slug });
		if (!team) throw new Error('Team not found');
		const reigns = await Reign.find({ team: team._id }).populate('games');
		console.log(team);
		console.log(reigns);
		return {
			team: JSON.parse(JSON.stringify(team)),
			reigns: JSON.parse(JSON.stringify(reigns))
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			teams: []
		};
	}
}
