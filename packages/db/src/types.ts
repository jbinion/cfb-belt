import type { teamTable, gamesTable, reignsTable, nextGameTable } from './schema';

export type Team = typeof teamTable.$inferSelect;

export type GameRow = Omit<typeof gamesTable.$inferSelect, 'homeTeamId' | 'awayTeamId'> & {
	homeTeam: Team | null;
	awayTeam: Team | null;
};

export type ReignRow = typeof reignsTable.$inferSelect & {
	team: Team | null;
	games: GameRow[];
	beltLossGame: GameRow | null;
	defenseCount: number;
};

export type NextGameRow = typeof nextGameTable.$inferSelect & {
	homeTeam: Team | null;
	awayTeam: Team | null;
};
