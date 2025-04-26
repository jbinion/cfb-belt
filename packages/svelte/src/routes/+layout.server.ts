import { connectDB } from '$lib/db/mongoose';
import '$lib/models/index';
import { Game, Reign } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const current = await Reign.findOne().sort({ startDate: -1 }).populate('team');
		const totalReigns = await Reign.countDocuments(); // Get the total count of reigns for pagination or other purposes
		const totalGames = await Game.countDocuments(); // Get the total count of games for potential use in UI or logic
		const teamCount = await Reign.distinct('team'); // Count distinct teams that have held the belt

		return {
			current: JSON.parse(JSON.stringify(current)),
			totalReigns,
			totalGames,
			teamCount: teamCount.length // Return the count of distinct teams that have held the belt
		};
	} catch (error) {
		console.error('Error loading current holder:', error);
		return {
			current: null
		};
	}
}
