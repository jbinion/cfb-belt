import { connectDB } from '$lib/db/mongoose';
import { Game, NextGame, Reign, Team, type IReignDocument } from 'models';
import '$lib/models/index';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const reigns = (await Reign.find({})
			.populate('team')
			.limit(10)
			.sort({ startDate: -1 })) as IReignDocument[];

		// hero section stats
		const totalReigns = await Reign.find({}).countDocuments();
		const teamCount = await Reign.find({}).distinct('team');
		const totalGames = await Game.find({}).countDocuments();
		const currentDate = new Date();
		const firstReign = await Reign.findOne({}).sort({ startDate: 1 });
		const yearsSince = currentDate.getFullYear() - firstReign.startDate.getFullYear();

		// get next game challenger team info
		const nextGame = await NextGame.findOne().populate('home_team').populate('away_team');
		console.log(nextGame);
		let nextChallenger;
		nextGame.home_team_name === reigns[0].team.name
			? (nextChallenger = nextGame.away_team)
			: (nextChallenger = nextGame.home_team);
		//
		console.log(nextChallenger);
		return {
			reigns: JSON.parse(JSON.stringify(reigns)),
			totalReigns,
			teamCount: teamCount.length,
			yearsTracked: yearsSince,
			totalGames,
			nextGameStartDate: JSON.parse(JSON.stringify(nextGame.start_date)),
			nextChallenger: JSON.parse(JSON.stringify(nextChallenger))
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: []
		};
	}
}
