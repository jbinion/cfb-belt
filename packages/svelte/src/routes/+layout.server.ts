import { connect } from '$lib/db/mongoose';
import { Reign } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connect();
		const current = await Reign.findOne({})
			.sort({ startDate: -1 })
			.populate('team')
			.populate('games');
		const currentHolderTotalReigns = await Reign.find({
			team: current.team._id
		}).countDocuments();
		return {
			current: JSON.parse(JSON.stringify(current)),
			currentHolderTotalReigns
		};
	} catch (error) {
		console.error('Error loading current holder:', error);
		return {
			current: null
		};
	}
}
