import { connectDB } from '$lib/db/mongoose';
import { Reign, type IReignDocument } from 'models';
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
		const currentHolderTotalReigns = await Reign.find({
			team: reigns[0].team._id,
			beltName: config.beltName
		}).countDocuments();
		return {
			reigns: JSON.parse(JSON.stringify(reigns)),
			currentHolderTotalReigns
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: []
		};
	}
}
