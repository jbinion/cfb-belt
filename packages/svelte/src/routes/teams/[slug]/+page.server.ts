import { connect } from '$lib/db/mongoose';

import { Reign, Team } from 'models';
import countTeamAppearances from '$lib/countTeamAppearances';
import { serialize } from '$lib/db/serialize';

export const prerender = true;

export const entries = async () => {
	await connect();
	const teams = await Team.find({}).select('slug');
	return teams.map((t) => ({ slug: decodeURIComponent(t.slug) }));
};

export async function load({ params }) {
	try {
		await connect();
		const decodedSlug = encodeURIComponent(params.slug);
		const team = await Team.findOne({ slug: decodedSlug });
		if (!team) throw new Error('Team not found');
		const reigns = await Reign.find({ team: team._id })
			.populate({
				path: 'games',
				populate: [{ path: 'home_team' }, { path: 'away_team' }],
			})
			.populate({
				path: 'beltLossGame',
				populate: [{ path: 'home_team' }, { path: 'away_team' }],
			})
			.sort({ startDate: -1 })
			.lean();

		const teamsBeatenForBelt = reigns
			.map((reign) => {
				console.log(reign);
				if (!reign.games || reign.games.length === 0) return null;

				const sortedGames = [...reign.games].sort(
					(a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
				);

				return sortedGames[0].home_team.name === team.name
					? sortedGames[0].away_team
					: sortedGames[0].home_team;
			})
			.filter(Boolean);

		const teamsDefendedAgainst = reigns.reduce((acc, cur) => {
			const sortedGames = [...cur.games].sort(
				(a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
			);
			if (sortedGames.length > 1) {
				let gamesExceptFirst = sortedGames.slice(1);

				gamesExceptFirst.forEach((game) => {
					const otherTeam = game?.away_team?.name === team.name ? game.home_team : game?.away_team;
					acc.push(otherTeam);
				});
			}

			return acc;
		}, []);

		const teamsLostTo = reigns
			.map((reign) => {
				if (!reign.beltLossGame) return null;
				return reign.beltLossGame.away_team.name === team.name
					? reign.beltLossGame.home_team
					: reign.beltLossGame.away_team;
			})
			.filter(Boolean);

		return {
			team: serialize(team),

			reigns: serialize(reigns),
			teamsBeatenForBelt: serialize(countTeamAppearances(teamsBeatenForBelt)),
			teamsDefended: serialize(countTeamAppearances(teamsDefendedAgainst)),
			teamsLostTo: serialize(countTeamAppearances(teamsLostTo)),
		};
	} catch (error) {
		console.error(`Error loading team from params ${JSON.stringify(params)}`, error);
		return {
			teams: [],
		};
	}
}
