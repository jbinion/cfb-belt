class BeltTracker {
  static instance = null;

  static getInstance(startTeam, startReignId = null) {
    if (!BeltTracker.instance) {
      BeltTracker.instance = new BeltTracker(startTeam, startReignId);
    }
    return BeltTracker.instance;
  }
  constructor(startTeam, startReignId) {
    this.currentHolder = startTeam;
    this.startReignId = startReignId;
    this.teams = new Set([]);
    this.reigns = [];
  }

  addGame(game) {
    console.log('adding game ' + game.home_team + ' vs ' + game.away_team);
    if (
      game.home_team !== this.currentHolder &&
      game.away_team !== this.currentHolder
    ) {
      console.log('Invalid game: ' + JSON.stringify(game));
      throw new Error('Game does not involve current belt holder');
    }
    // handle refecthing current week when belt holder losses
    if (this.reigns.at(-1)?.games.at(-1).id === game.id) return;

    this.teams.add(game.home_team);
    this.teams.add(game.away_team);

    const winner = getGameWinner(game, this.currentHolder);
    console.log('game winner: ' + winner);

    if (this.reigns.length === 0 && winner === this.currentHolder) {
      console.log('\n\n\n here \n\n\n');
      this.reigns.push({
        team: winner,
        games: [{ ...game, type: 'win' }],
        startDate: game.start_date,
        _id: this.startReignId || null, // this breaks on updates. if the current team loses, we will still create a new reign with the old id
      });
      return;
    }
    if (winner === this.reigns.at(-1)?.team) {
      this.reigns.at(-1).games.push({ ...game, type: 'defense' });
      return;
    }
    this.reigns.push({
      team: winner,
      games: [{ ...game, type: 'win' }],
      startDate: game.start_date,
    });
    this.currentHolder = winner;
  }
}

export default BeltTracker;

export const getGameWinner = (game, currentHolder) => {
  if (game.home_points === game.away_points) return currentHolder;
  return game.home_points > game.away_points ? game.home_team : game.away_team;
};
