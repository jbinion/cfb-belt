import { connect } from '$lib/db/mongoose';
import { serialize } from '$lib/db/serialize';
import { Reign } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connect();
		const reigns = await Reign.find().populate('team').sort({ startDate: -1 });
		return {
			reigns: serialize(reigns),
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: [],
		};
	}
}
