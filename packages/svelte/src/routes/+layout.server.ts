import { db, reignsTable, teamTable, reignGamesTable, gamesTable } from '@cfb/db';
import { asc, desc, eq, count } from 'drizzle-orm';

export const prerender = true;

const emptyHolder = {
	current: null,
	currentHolderTotalReigns: 0,
	currentDefenseCount: 0,
	beltWon: null,
};

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

		if (!current) return emptyHolder;

		const [defenseCount, totalReigns, firstGame] = await Promise.all([
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
			// The first game of the reign is the one that won the belt.
			db
				.select({
					startDate: gamesTable.startDate,
					homeTeamId: gamesTable.homeTeamId,
					homeTeamName: gamesTable.homeTeamName,
					awayTeamName: gamesTable.awayTeamName,
					homePoints: gamesTable.homePoints,
					awayPoints: gamesTable.awayPoints,
				})
				.from(reignGamesTable)
				.innerJoin(gamesTable, eq(reignGamesTable.gameId, gamesTable.id))
				.where(eq(reignGamesTable.reignId, current.id))
				.orderBy(asc(gamesTable.startDate))
				.limit(1)
				.then((r) => r[0] ?? null),
		]);

		const holderIsHome = firstGame?.homeTeamId === current.teamId;
		const beltWon = firstGame
			? {
					opponentName: (holderIsHome ? firstGame.awayTeamName : firstGame.homeTeamName) ?? '',
					holderPoints: holderIsHome ? firstGame.homePoints : firstGame.awayPoints,
					opponentPoints: holderIsHome ? firstGame.awayPoints : firstGame.homePoints,
					startDate: firstGame.startDate,
				}
			: null;

		return {
			current,
			currentHolderTotalReigns: totalReigns,
			currentDefenseCount: Math.max(0, defenseCount - 1),
			beltWon,
		};
	} catch (error) {
		console.error('Error loading current holder:', error);
		return emptyHolder;
	}
}
