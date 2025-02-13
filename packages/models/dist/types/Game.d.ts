import mongoose, { type Document } from 'mongoose';
import type { Types } from 'mongoose';
export interface IGameDocument extends Document {
    _id: Types.ObjectId;
    start_date: Date;
    home_team: Types.ObjectId;
    away_team: Types.ObjectId;
    home_points: Number;
    away_points: Number;
}
declare const Game: mongoose.Model<IGameDocument, {}, {}, {}, mongoose.Document<unknown, {}, IGameDocument> & IGameDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Game;
