import { connectDB } from '$lib/db/mongoose';
import { Reign, type IReignDocument } from '$lib/models/index';
// Import all models to ensure schemas are registered
import '$lib/models/index';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const reigns = (await Reign.find()
			.populate('team')
			.sort({ startDate: -1 })) as IReignDocument[];

		return {
			reigns: JSON.parse(JSON.stringify(reigns))
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: []
		};
	}
}
