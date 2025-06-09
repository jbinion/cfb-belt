import { connectDB } from '$lib/db/mongoose';
// Import all models to ensure schemas are registered
import '$lib/models/index';
import { Reign, Team, type ITeamDocument } from 'models';
import config from '../../../config';

export const prerender = true;

export const entries = async () => {
	await connectDB();
	const teams = (await Team.find({}).select('slug')) as ITeamDocument[];
	return teams.map((t) => ({ slug: decodeURIComponent(t.slug) }));
};

export async function load({ params }) {
	try {
		await connectDB();
		console.log(params);
		const decodedSlug = encodeURIComponent(params.slug);
		console.log(decodedSlug);
		const team = await Team.findOne({ slug: decodedSlug });
		if (!team) throw new Error('Team not found');
		const reigns = await Reign.find({ team: team._id, beltName: config.beltName })
			.populate({
				path: 'games',
				populate: [{ path: 'home_team' }, { path: 'away_team' }],
				options: { sort: { start_date: -1 } }
			})
			.sort({ startDate: -1 });
		console.log(team);
		console.log(reigns);
		return {
			team: JSON.parse(JSON.stringify(team)),
			reigns: JSON.parse(JSON.stringify(reigns))
		};
	} catch (error) {
		console.error(`Error loading team from params ${JSON.stringify(params)}`, error);
		return {
			teams: []
		};
	}
}
