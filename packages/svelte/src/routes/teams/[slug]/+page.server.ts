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

		const teamsBeatenForBelt = reigns
			.map((reign) => {
				if (!reign.games || reign.games.length === 0) return null;

				const sortedGames = [...reign.games].sort(
					(a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
				);

				return sortedGames[0].home_team.name === team.name
					? sortedGames[0].away_team
					: sortedGames[0].home_team;
			})
			.filter(Boolean);

		const td = reigns.reduce((acc, cur) => {
			const sortedGames = [...cur.games].sort(
				(a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
			);
			let gamesExceptFirst = sortedGames.slice(1);
			const teams = gamesExceptFirst.map((game) => {
				const otherTeam = game.away_team.name === team.name ? game.home_team : game.away_team;

				return otherTeam;
			});

			teams.forEach((t) => {
				if (!acc.find((a) => a.name === t.name)) {
					acc.push(t);
				}
			});
			return acc;
		}, []);
		return {
			team: JSON.parse(JSON.stringify(team)),
			reigns: JSON.parse(JSON.stringify(reigns)),
			teamsBeatenForBelt: JSON.parse(JSON.stringify(teamsBeatenForBelt)),
			teamsDefended: JSON.parse(JSON.stringify(td))
		};
	} catch (error) {
		console.error(`Error loading team from params ${JSON.stringify(params)}`, error);
		return {
			teams: []
		};
	}
}
