import { db, teamTable, reignsTable, reignGamesTable } from '@cfb/db';
import { eq } from 'drizzle-orm';
import saveGames from './saveGames';

const saveReign = async ({
	reign,
	id = null,
}: {
	reign: any;
	id?: number | null;
}): Promise<number> => {
	const team = await db
		.select({ id: teamTable.id })
		.from(teamTable)
		.where(eq(teamTable.name, reign.team))
		.then((r) => r[0] ?? null);

	if (!team) throw new Error(`Team not found: ${reign.team}`);

	const gameIds = await saveGames(reign.games);

	let reignId: number;

	if (id) {
		reignId = id;
		if (gameIds.length) {
			await db
				.insert(reignGamesTable)
				.values(gameIds.map((gId) => ({ reignId, gameId: gId })))
				.onConflictDoNothing();
		}
	} else {
		const [inserted] = await db
			.insert(reignsTable)
			.values({ teamId: team.id, startDate: reign.startDate })
			.onConflictDoUpdate({
				target: [reignsTable.teamId, reignsTable.startDate],
				set: { teamId: team.id },
			})
			.returning({ id: reignsTable.id });

		reignId = inserted.id;

		if (gameIds.length) {
			await db
				.insert(reignGamesTable)
				.values(gameIds.map((gId) => ({ reignId, gameId: gId })))
				.onConflictDoNothing();
		}
	}

	return reignId;
};

export default saveReign;
