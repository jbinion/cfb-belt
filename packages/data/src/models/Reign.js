import mongoose from 'mongoose';

const reignSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  beltName: {
    type: String,
  },
});
reignSchema.index({ team: 1, startDate: 1 }, { unique: true });
const Reign = mongoose.model('reign', reignSchema);

export default Reign;
