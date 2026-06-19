import { db, reignsTable, reignGamesTable } from '@cfb/db';
import { count, countDistinct, asc } from 'drizzle-orm';

const getHeroStats = async () => {
	const currentDate = new Date();

	const [totalReigns, teamCount, totalGames, firstReign] = await Promise.all([
		db
			.select({ count: count() })
			.from(reignsTable)
			.then((r) => r[0]?.count ?? 0),
		db
			.select({ count: countDistinct(reignsTable.teamId) })
			.from(reignsTable)
			.then((r) => r[0]?.count ?? 0),
		db
			.select({ count: count() })
			.from(reignGamesTable)
			.then((r) => r[0]?.count ?? 0),
		db
			.select({ startDate: reignsTable.startDate })
			.from(reignsTable)
			.orderBy(asc(reignsTable.startDate))
			.limit(1)
			.then((r) => r[0] ?? null),
	]);

	const yearsTracked = firstReign
		? currentDate.getFullYear() - new Date(firstReign.startDate).getFullYear()
		: 0;

	return { totalReigns, teamCount, yearsTracked, totalGames };
};

export default getHeroStats;
