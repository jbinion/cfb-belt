import { connect } from '$lib/db/mongoose';
import { Reign } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connect();
		const reigns = await Reign.find().populate('team').sort({ startDate: -1 });
		return {
			reigns: JSON.parse(JSON.stringify(reigns)),
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: [],
		};
	}
}
