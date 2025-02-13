import mongoose, { type Document } from 'mongoose';
import type { Types } from 'mongoose';
export interface ITeamDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    displayName: string;
    color: string;
    logoFile: string;
    altColor: string;
}
declare const Team: mongoose.Model<ITeamDocument, {}, {}, {}, mongoose.Document<unknown, {}, ITeamDocument> & ITeamDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Team;
