import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	start_date: {
		type: Date,
		required: true,
	},
	home_team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team',
	},
	home_team_name: {
		type: String,
	},
	away_team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team',
	},
	away_team_name: {
		type: String,
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

export const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);
export type GameType = mongoose.InferSchemaType<typeof gameSchema>;
