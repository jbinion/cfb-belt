import { Reign } from 'models';

export const getReigns = async () => {
	const reigns = await Reign.find()
		.populate('team')
		.limit(10)
		.sort({ startDate: -1 })
		.lean()
		.exec();
	return reigns;
};
