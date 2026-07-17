import { db, reignsTable, teamTable, reignGamesTable } from '@cfb/db';
import { count, eq, inArray } from 'drizzle-orm';

export const prerender = true;

export async function load() {
	try {
		const teamIds = await db
			.selectDistinct({ teamId: reignsTable.teamId })
			.from(reignsTable)
			.then((r) => r.map((x) => x.teamId));

		if (!teamIds.length) return { teams: [] };

		const [teams, reignCounts, allReigns] = await Promise.all([
			db.select().from(teamTable).where(inArray(teamTable.id, teamIds)),
			db
				.select({ teamId: reignsTable.teamId, count: count() })
				.from(reignsTable)
				.where(inArray(reignsTable.teamId, teamIds))
				.groupBy(reignsTable.teamId),
			db
				.select({ id: reignsTable.id, teamId: reignsTable.teamId })
				.from(reignsTable)
				.where(inArray(reignsTable.teamId, teamIds)),
		]);

		const reignIds = allReigns.map((r) => r.id);
		const gameCounts = await db
			.select({ reignId: reignGamesTable.reignId, count: count() })
			.from(reignGamesTable)
			.where(inArray(reignGamesTable.reignId, reignIds))
			.groupBy(reignGamesTable.reignId);

		const gameCountMap = new Map(gameCounts.map((gc) => [gc.reignId, gc.count]));
		const reignCountMap = new Map(reignCounts.map((rc) => [rc.teamId, rc.count]));

		const result = teams
			.map((team) => {
				const teamReigns = allReigns.filter((r) => r.teamId === team.id);
				const defenses = teamReigns.reduce(
					(acc, reign) => acc + Math.max(0, (gameCountMap.get(reign.id) ?? 1) - 1),
					0
				);
				return { ...team, reigns: reignCountMap.get(team.id) ?? 0, defenses };
			})
			.sort((a, b) => a.name.localeCompare(b.name));

		return { teams: result };
	} catch (error) {
		console.error('Error loading teams:', error);
		return { teams: [] };
	}
}
