import { connectDB } from '$lib/db/mongoose';
import '$lib/models/index';
import { Reign } from '$lib/models/index';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const current = await Reign.findOne().sort({ startDate: -1 }).populate('team');
		return {
			current: JSON.parse(JSON.stringify(current))
		};
	} catch (error) {
		console.error('Error loading current holder:', error);
		return {
			current: null
		};
	}
}
