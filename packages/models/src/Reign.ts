import mongoose, { type Document } from 'mongoose';
import type { Types } from 'mongoose';

export interface IReignDocument extends Document {
	_id: Types.ObjectId;
	team: Types.ObjectId;
	games: Types.ObjectId[];
	startDate: Date;
	beltName?: string;
}

const reignSchema = new mongoose.Schema({
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team'
	},
	games: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game'
		}
	],
	startDate: {
		type: Date,
		required: true
	},
	beltName: {
		type: String
	}
});

const Reign = mongoose.model<IReignDocument>('Reign', reignSchema);
export default Reign