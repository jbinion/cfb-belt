import { connectDB } from '$lib/db/mongoose';
import '$lib/models/index';
import { Game, Reign } from 'models';
import config from '../config';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const current = await Reign.findOne({ beltName: config.beltName })
			.sort({ startDate: -1 })
			.populate('team');
		const totalReigns = await Reign.find({ beltName: config.beltName }).countDocuments(); // Get the total count of reigns for pagination or other purposes
		const teamCount = await Reign.find({ beltName: config.beltName }).distinct('team'); // Count distinct teams that have held the belt
		const firstReign = await Reign.findOne({ beltName: config.beltName }).sort({ startDate: 1 });
		const currentDate = new Date();

		const yearsSince = currentDate.getFullYear() - firstReign.startDate.getFullYear();
		const totalGames = await Game.find({ beltName: config.beltName }).countDocuments();
		return {
			current: JSON.parse(JSON.stringify(current)),
			totalReigns,
			// totalGames,
			teamCount: teamCount.length, // Return the count of distinct teams that have held the belt
			yearsTracked: yearsSince,
			totalGames
		};
	} catch (error) {
		console.error('Error loading current holder:', error);
		return {
			current: null
		};
	}
}
