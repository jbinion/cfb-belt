import { db, teamTable, nextGameTable } from '@cfb/db';
import { eq } from 'drizzle-orm';

const saveNextGame = async ({
	home_team,
	away_team,
	gameId,
	start_date,
}: {
	home_team: string;
	away_team: string;
	gameId: string;
	start_date: string;
}) => {
	const homeTeam = await db
		.select({ id: teamTable.id })
		.from(teamTable)
		.where(eq(teamTable.name, home_team))
		.then((r) => r[0] ?? null);

	const awayTeam = away_team
		? await db
				.select({ id: teamTable.id })
				.from(teamTable)
				.where(eq(teamTable.name, away_team))
				.then((r) => r[0] ?? null)
		: null;

	await db.delete(nextGameTable);

	await db.insert(nextGameTable).values({
		id: String(gameId),
		startDate: start_date,
		homeTeamId: homeTeam?.id ?? null,
		homeTeamName: home_team,
		awayTeamId: awayTeam?.id ?? null,
		awayTeamName: away_team,
	});
};

export default saveNextGame;
