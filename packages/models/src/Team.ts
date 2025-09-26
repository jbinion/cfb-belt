import mongoose, { type Document } from "mongoose";
import type { Types } from "mongoose";

export interface ITeamDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  displayName: string;
  color: string;
  logoFile: string;
  altColor: string;
}

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
    default: "default",
  },
  altColor: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Team =
  mongoose.models.Team || mongoose.model<ITeamDocument>("Team", teamSchema);

export default Team;
