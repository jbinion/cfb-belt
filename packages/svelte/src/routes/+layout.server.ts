import { db, reignsTable, teamTable, reignGamesTable } from '@cfb/db';
import { desc, eq, count } from 'drizzle-orm';

export const prerender = true;

export async function load() {
	try {
		const current = await db
			.select({
				id: reignsTable.id,
				startDate: reignsTable.startDate,
				teamId: reignsTable.teamId,
				team: {
					id: teamTable.id,
					name: teamTable.name,
					displayName: teamTable.displayName,
					color: teamTable.color,
					logoFile: teamTable.logoFile,
					altColor: teamTable.altColor,
					slug: teamTable.slug,
				},
			})
			.from(reignsTable)
			.leftJoin(teamTable, eq(reignsTable.teamId, teamTable.id))
			.orderBy(desc(reignsTable.startDate))
			.limit(1)
			.then((r) => r[0] ?? null);

		if (!current) return { current: null, currentHolderTotalReigns: 0, currentDefenseCount: 0 };

		const [defenseCount, totalReigns] = await Promise.all([
			db
				.select({ count: count() })
				.from(reignGamesTable)
				.where(eq(reignGamesTable.reignId, current.id))
				.then((r) => r[0]?.count ?? 0),
			db
				.select({ count: count() })
				.from(reignsTable)
				.where(eq(reignsTable.teamId, current.teamId))
				.then((r) => r[0]?.count ?? 0),
		]);

		return {
			current,
			currentHolderTotalReigns: totalReigns,
			currentDefenseCount: Math.max(0, defenseCount - 1),
		};
	} catch (error) {
		console.error('Error loading current holder:', error);
		return { current: null, currentHolderTotalReigns: 0, currentDefenseCount: 0 };
	}
}
