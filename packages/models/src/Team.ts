import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	color: { type: String },
	logoFile: {
		type: String,
		default: 'default',
	},
	altColor: {
		type: String,
	},
	slug: {
		type: String,
		required: true,
	},
});

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export type TeamType = mongoose.InferSchemaType<typeof teamSchema>;
