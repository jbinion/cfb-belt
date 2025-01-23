import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: true,
  },
  home_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  away_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  home_points: {
    type: Number,
    required: true,
  },
  away_points: {
    type: Number,
    required: true,
  },
});
gameSchema.index(
  { start_date: 1, home_team: 1, away_team: 1 },
  { unique: true }
);
const Game = mongoose.model('Game', gameSchema);

export default Game;
