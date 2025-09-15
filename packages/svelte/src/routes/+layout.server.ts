import { connectDB } from '$lib/db/mongoose';
import '$lib/models/index';
import { Reign } from 'models';
import config from '../config';

export const prerender = true;

export async function load() {
	try {
		await connectDB();
		const current = await Reign.findOne({ beltName: config.beltName })
			.sort({ startDate: -1 })
			.populate('team')
			.populate('games');

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
