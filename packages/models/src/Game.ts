import mongoose, { type Document } from "mongoose";
import type { Types } from "mongoose";

export interface IGameDocument extends Document {
  _id: Types.ObjectId;
  start_date: Date;
  home_team: Types.ObjectId;
  away_team: Types.ObjectId;
  home_points: Number;
  away_points: Number;
}

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
  home_points: {
    type: Number,
    required: true,
  },
  away_points: {
    type: Number,
    required: true,
  },
  beltName: {
    type: String,
    required: true,
  },
});

const Game =
  mongoose.models.Game || mongoose.model<IGameDocument>("Game", gameSchema);

export default Game;
