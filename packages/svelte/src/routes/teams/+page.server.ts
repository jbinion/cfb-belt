import { db, reignsTable, teamTable, reignGamesTable, gamesTable } from '@cfb/db';
import { count, eq, inArray } from 'drizzle-orm';
import reignDays from '$lib/reignDays';

export const prerender = true;

export async function load() {
	try {
		// One row per reign: when it ended (the game that lost the belt, none if still held)
		// and how many games it had.
		const reigns = await db
			.select({
				teamId: reignsTable.teamId,
				startDate: reignsTable.startDate,
				endDate: gamesTable.startDate,
				games: count(reignGamesTable.gameId),
			})
			.from(reignsTable)
			.leftJoin(gamesTable, eq(gamesTable.id, reignsTable.beltLossGameId))
			.leftJoin(reignGamesTable, eq(reignGamesTable.reignId, reignsTable.id))
			.groupBy(reignsTable.id);

		const stats = new Map<
			number,
			{ reigns: number; defenses: number; daysHeld: number; longestReignDays: number }
		>();
		for (const { teamId, startDate, endDate, games } of reigns) {
			const days = reignDays(startDate, endDate);
			const s = stats.get(teamId) ?? { reigns: 0, defenses: 0, daysHeld: 0, longestReignDays: 0 };
			s.reigns += 1;
			// The first game of a reign wins the belt; every game after it is a defense.
			s.defenses += Math.max(0, games - 1);
			s.daysHeld += days;
			s.longestReignDays = Math.max(s.longestReignDays, days);
			stats.set(teamId, s);
		}

		const teams = await db
			.select()
			.from(teamTable)
			.where(inArray(teamTable.id, [...stats.keys()]));

		return { teams: teams.map((team) => ({ ...team, ...stats.get(team.id)! })) };
	} catch (error) {
		console.error('Error loading teams:', error);
		return { teams: [] };
	}
}
