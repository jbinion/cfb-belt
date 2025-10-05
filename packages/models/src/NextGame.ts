import mongoose, { type Document } from "mongoose";
import type { Types } from "mongoose";

export interface INextGameDocument extends Document {
  _id: Types.ObjectId;
  start_date: Date;
  home_team: Types.ObjectId;
  away_team: Types.ObjectId;
  home_points: Number;
  away_points: Number;
}

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
    ref: "Team",
  },
  home_team_name: {
    type: String,
  },
  away_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  away_team_name: {
    type: String,
  },
});

const NextGame =
  mongoose.models.NextGame ||
  mongoose.model<INextGameDocument>("NextGame", nextGameSchema);

export default NextGame;
