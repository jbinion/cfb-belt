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
		const decodedSlug = encodeURIComponent(params.slug);
		const team = await Team.findOne({ slug: decodedSlug });
		if (!team) throw new Error('Team not found');
		const reigns = await Reign.find({ team: team._id, beltName: config.beltName })
			.populate({
				path: 'games',
				populate: [{ path: 'home_team' }, { path: 'away_team' }],
				options: { sort: { start_date: -1 } }
			})
			.sort({ startDate: -1 });

		const teamsBeatenForBelt = reigns.map((reign) => {
			const firstGame = reign.games[0];
			console.log('First game for reign:', firstGame);
			console.log('home team id', firstGame.home_team._id);
			console.log('away team id', firstGame.away_team._id);
			console.log('team id', team._id);
			if (firstGame.home_team._id.toString() !== team._id.toString()) return firstGame.home_team;
			return firstGame.away_team;
		});
		console.log('Teams beaten for belt:', teamsBeatenForBelt);

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
