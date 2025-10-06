export type Team = {
	_id: string;
	name: string;
	color: string;
	displayName: string;
	logoFile: string;
	slug: string;
};

export type Game = {
	_id: string;
	away_team: Team;
	home_team: Team;
	id: string;
	start_date: Date;
	away_points: number;
	home_points: number;
};
