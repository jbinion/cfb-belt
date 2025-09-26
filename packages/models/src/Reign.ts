import mongoose, { type Document } from "mongoose";
import type { Types } from "mongoose";

export interface IReignDocument extends Document {
  _id: Types.ObjectId;
  team: Types.ObjectId;
  games: Types.ObjectId[];
  startDate: Date;
}

const reignSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
  beltLossGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  startDate: {
    type: Date,
    required: true,
  },
});

const Reign =
  mongoose.models.Reign || mongoose.model<IReignDocument>("Reign", reignSchema);
export default Reign;
