import { connectDB } from '$lib/db/mongoose';
import { Game, NextGame, Reign, type IReignDocument } from 'models';
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
		const currentHolderTotalReigns = await Reign.find({
			team: reigns[0].team._id,
			beltName: config.beltName
		}).countDocuments();
		const nextGame = await NextGame.findOne();
		console.log(nextGame);

		const totalReigns = await Reign.find({ beltName: config.beltName }).countDocuments();
		const teamCount = await Reign.find({ beltName: config.beltName }).distinct('team');
		const firstReign = await Reign.findOne({ beltName: config.beltName }).sort({ startDate: 1 });
		const currentDate = new Date();

		const yearsSince = currentDate.getFullYear() - firstReign.startDate.getFullYear();
		const totalGames = await Game.find({ beltName: config.beltName }).countDocuments();
		return {
			reigns: JSON.parse(JSON.stringify(reigns)),
			currentHolderTotalReigns,
			nextGame: JSON.parse(JSON.stringify(nextGame)),
			totalReigns,
			teamCount: teamCount.length,
			yearsTracked: yearsSince,
			totalGames
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: []
		};
	}
}
