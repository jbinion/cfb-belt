import { connectDB } from '$lib/db/mongoose';
import { Game, Reign, type IReignDocument } from 'models';
// Import all models to ensure schemas are registered
import '$lib/models/index';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const reigns = (await Reign.find()
			.populate('team')
			.limit(10)
			.sort({ startDate: -1 })) as IReignDocument[];

		const totalReigns = await Reign.countDocuments(); // Get the total count of reigns for pagination or other purposes
		const totalGames = await Game.countDocuments(); // Get the total count of games for potential use in UI or logic
		const teamCount = await Reign.distinct('team'); // Count distinct teams that have held the belt

		return {
			reigns: JSON.parse(JSON.stringify(reigns)),
			totalReigns,
			totalGames,
			teamCount: teamCount.length // Return the count of distinct teams that have held the belt
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: []
		};
	}
}
