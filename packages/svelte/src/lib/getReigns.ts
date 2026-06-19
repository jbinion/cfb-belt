import { db, reignsTable, teamTable, reignGamesTable } from '@cfb/db';
import { desc, eq, count, inArray } from 'drizzle-orm';

export const getReigns = async (limit?: number) => {
	const query = db
		.select({
			id: reignsTable.id,
			startDate: reignsTable.startDate,
			teamId: reignsTable.teamId,
			team: {
				id: teamTable.id,
				name: teamTable.name,
				displayName: teamTable.displayName,
				logoFile: teamTable.logoFile,
				slug: teamTable.slug,
				color: teamTable.color,
				altColor: teamTable.altColor,
			},
		})
		.from(reignsTable)
		.leftJoin(teamTable, eq(reignsTable.teamId, teamTable.id))
		.orderBy(desc(reignsTable.startDate));

	const reigns = limit ? await query.limit(limit) : await query;

	if (!reigns.length) return [];

	const reignIds = reigns.map((r) => r.id);

	const gameCounts = await db
		.select({ reignId: reignGamesTable.reignId, count: count() })
		.from(reignGamesTable)
		.where(inArray(reignGamesTable.reignId, reignIds))
		.groupBy(reignGamesTable.reignId);

	const countMap = new Map(gameCounts.map((gc) => [gc.reignId, gc.count]));

	return reigns.map((r) => ({
		...r,
		defenseCount: Math.max(0, (countMap.get(r.id) ?? 1) - 1),
	}));
};
