import { connectDB } from '$lib/db/mongoose';
import { Reign, type IReignDocument } from 'models';
// Import all models to ensure schemas are registered
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
