class BeltTracker {
  static instance;

  static getInstance(startTeam) {
    if (!BeltTracker.instance) {
      BeltTracker.instance = new BeltTracker(startTeam);
    }
    return BeltTracker.instance;
  }
  constructor(startTeam) {
    this.currentHolder = startTeam;
    this.teams = new Set([]);
    this.reigns = [];
  }

  addGame(game) {
    if (
      game.home_team !== this.currentHolder &&
      game.away_team !== this.currentHolder
    ) {
      console.log(game);
      throw new Error('Invalid game: ' + game);
    }
    this.teams.add(game.home_team);
    this.teams.add(game.away_team);

    const winner = getGameWinner(game, this.currentHolder);
    this.currentHolder = winner;
    if (winner === this.reigns.at(-1).team) {
      this.reigns.at(-1).games.push({ ...game, type: 'defense' });
      return;
    }
    this.reigns.at(-1).endDate = game.start_date;
    this.reigns.push({
      team: winner,
      games: [{ ...game, type: 'win' }],
      startDate: game.start_date,
    });
  }
}

export default BeltTracker;

const getGameWinner = (game, currentHolder) => {
  if (game.home_points === game.away_points) return currentHolder;
  return game.home_points > game.away_points ? game.home_team : game.away_team;
};
