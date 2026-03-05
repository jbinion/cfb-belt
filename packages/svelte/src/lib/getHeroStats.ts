import { Game, Reign } from 'models';

const getHeroStats = async () => {
	const currentDate = new Date();

	const [totalReigns, teamCount, totalGames, firstReign] = await Promise.all([
		Reign.countDocuments(),
		Reign.distinct('team'),
		Game.countDocuments(),
		Reign.findOne({}).sort({ startDate: 1 }),
	]);

	const yearsTracked = firstReign
		? currentDate.getFullYear() - firstReign.startDate.getFullYear()
		: 0;

	return { totalReigns, teamCount: teamCount.length, yearsTracked, totalGames };
};

export default getHeroStats;
