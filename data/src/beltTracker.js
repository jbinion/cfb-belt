class Beltracker {
  static instance;

  static getInstance() {
    if (!Beltracker.instance) {
      Beltracker.instance = new Beltracker();
    }
    return Beltracker.instance;
  }
  constructor() {
    this.currentHolder = null;
    this.games = [];
  }

  addGame(game) {
    if (this.currentHolder !== null) {
      if (
        !game.home_team === this.currentHolder &&
        !game.away_team === this.currentHolder
      ) {
        throw new Error('Invalid game: ' + game);
      }
    }
    // handle tie
    let newHolder = this.currentHolder;
    if (game.home_points === game.away_points) {
      newHolder = this.currentHolder;
    } else if (game.home_points > game.away_points) {
      newHolder = game.home_team;
    } else {
      newHolder = game.away_team;
    }
    if (newHolder !== this.currentHolder) console.log(newHolder);
    this.currentHolder = newHolder;
    this.games.push(game);
  }
}

export default Beltracker;
