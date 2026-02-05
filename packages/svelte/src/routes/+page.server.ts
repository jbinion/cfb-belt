import { connect } from '$lib/db/mongoose';
import { serialize } from '$lib/db/serialize';
import { Game, NextGame, Reign } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connect();
		const reigns = await Reign.find()
			.populate('team')
			.limit(10)
			.sort({ startDate: -1 })
			.lean()
			.exec();

		// hero section stats
		const totalReigns = await Reign.countDocuments();
		const teamCount = await Reign.distinct('team');
		const totalGames = await Game.countDocuments();
		const currentDate = new Date();
		const firstReign = await Reign.findOne({}).sort({ startDate: 1 });
		const yearsSince = firstReign
			? currentDate.getFullYear() - firstReign.startDate.getFullYear()
			: 0;

		const nextGame = await NextGame.findOne().populate('home_team').populate('away_team');
		let nextChallenger;
		if (nextGame && reigns[0] && nextGame.home_team_name === reigns[0].team.name) {
			nextChallenger = nextGame.away_team;
		} else {
			nextChallenger = nextGame?.home_team;
		}
		//
		console.log(nextChallenger);
		return {
			reigns: reigns.map(serialize),
			totalReigns,
			teamCount: teamCount.length,
			yearsTracked: yearsSince,
			totalGames,
			nextGameStartDate: nextGame.start_date.toISOString(),
			nextChallenger: JSON.parse(JSON.stringify(nextChallenger))
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: []
		};
	}
}
