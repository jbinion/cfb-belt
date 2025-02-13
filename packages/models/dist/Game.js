import mongoose from 'mongoose';
const gameSchema = new mongoose.Schema({
    start_date: {
        type: Date,
        required: true
    },
    home_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    away_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    home_points: {
        type: Number,
        required: true
    },
    away_points: {
        type: Number,
        required: true
    }
});
const Game = mongoose.model('Game', gameSchema);
export default Game;
//# sourceMappingURL=Game.js.map