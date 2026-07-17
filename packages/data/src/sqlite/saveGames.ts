import { db, teamTable, gamesTable } from '@cfb/db';
import { eq } from 'drizzle-orm';

const saveGame = async (game: any): Promise<string> => {
	const homeTeam = await db
		.select({ id: teamTable.id })
		.from(teamTable)
		.where(eq(teamTable.name, game.home_team))
		.then((r) => r[0] ?? null);

	const awayTeam = game.away_team
		? await db
				.select({ id: teamTable.id })
				.from(teamTable)
				.where(eq(teamTable.name, game.away_team))
				.then((r) => r[0] ?? null)
		: null;

	await db
		.insert(gamesTable)
		.values({
			id: String(game.id),
			startDate: game.start_date,
			homeTeamId: homeTeam?.id ?? null,
			homeTeamName: game.home_team ?? null,
			awayTeamId: awayTeam?.id ?? null,
			awayTeamName: game.away_team ?? null,
			homePoints: game.home_points,
			awayPoints: game.away_points,
		})
		.onConflictDoUpdate({
			target: gamesTable.id,
			set: {
				homePoints: game.home_points,
				awayPoints: game.away_points,
				homeTeamId: homeTeam?.id ?? null,
				awayTeamId: awayTeam?.id ?? null,
			},
		});

	return String(game.id);
};

const saveGames = async (games: any[]): Promise<string[]> => {
	return Promise.all(games.map(saveGame));
};

export default saveGames;
