const formatGame = (game) => {
	return {
		id: game.id,
		start_date: game.startDate,
		home_team: game.homeTeam,
		away_team: game.awayTeam,
		home_points: game.homePoints,
		away_points: game.awayPoints,
		week: game.week,
		type: game.seasonType,
		year: game.season,
		completed: game.completed,
	};
};

export default formatGame;
