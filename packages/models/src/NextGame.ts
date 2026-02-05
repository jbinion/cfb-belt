import mongoose from 'mongoose';

const nextGameSchema = new mongoose.Schema({
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
});

export const NextGame = mongoose.models.NextGame || mongoose.model('NextGame', nextGameSchema);
export type NextGameType = mongoose.InferSchemaType<typeof nextGameSchema>;
