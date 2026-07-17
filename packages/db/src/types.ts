export type TeamRow = {
	id: number;
	name: string;
	displayName: string;
	color: string | null;
	logoFile: string;
	altColor: string | null;
	slug: string;
};

export type GameRow = {
	id: string;
	startDate: string;
	homePoints: number;
	awayPoints: number;
	homeTeamName: string | null;
	awayTeamName: string | null;
	homeTeam: TeamRow | null;
	awayTeam: TeamRow | null;
};

export type ReignRow = {
	id: number;
	startDate: string;
	teamId: number;
	beltLossGameId: string | null;
	team: TeamRow | null;
	games: GameRow[];
	beltLossGame: GameRow | null;
	defenseCount: number;
};

export type NextGameRow = {
	id: string;
	startDate: string;
	homeTeamId: number | null;
	homeTeamName: string | null;
	awayTeamId: number | null;
	awayTeamName: string | null;
	homeTeam: TeamRow | null;
	awayTeam: TeamRow | null;
};
