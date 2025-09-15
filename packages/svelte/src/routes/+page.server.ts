import { connectDB } from '$lib/db/mongoose';
import { Game, NextGame, Reign, Team, type IReignDocument } from 'models';
import '$lib/models/index';
import config from '../config';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const reigns = (await Reign.find({ beltName: config.beltName })
			.populate('team')
			.limit(10)
			.sort({ startDate: -1 })) as IReignDocument[];

		// hero section stats
		const totalReigns = await Reign.find({ beltName: config.beltName }).countDocuments();
		const teamCount = await Reign.find({ beltName: config.beltName }).distinct('team');
		const totalGames = await Game.find({ beltName: config.beltName }).countDocuments();
		const currentDate = new Date();
		const firstReign = await Reign.findOne({ beltName: config.beltName }).sort({ startDate: 1 });
		const yearsSince = currentDate.getFullYear() - firstReign.startDate.getFullYear();

		// get next game challenger team info
		const nextGame = await NextGame.findOne().populate('home_team').populate('away_team');
		let nextChallenger;
		nextGame.home_team_name === reigns[0].team.name
			? (nextChallenger = nextGame.away_team)
			: (nextChallenger = nextGame.home_team);
		//
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
