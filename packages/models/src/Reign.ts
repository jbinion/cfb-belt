import mongoose, { Model } from "mongoose";

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

export type ReignType = mongoose.InferSchemaType<typeof reignSchema>;

export const Reign: Model<ReignType> =
  (mongoose.models.Reign as Model<ReignType>) ??
  mongoose.model<ReignType>("Reign", reignSchema);
