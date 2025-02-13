import mongoose, { type Document } from 'mongoose';
import type { Types } from 'mongoose';
export interface IReignDocument extends Document {
    _id: Types.ObjectId;
    team: Types.ObjectId;
    games: Types.ObjectId[];
    startDate: Date;
    beltName?: string;
}
declare const Reign: mongoose.Model<IReignDocument, {}, {}, {}, mongoose.Document<unknown, {}, IReignDocument> & IReignDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Reign;
