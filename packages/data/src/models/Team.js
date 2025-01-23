import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  color: { type: String },
  logoFile: {
    type: String,
    unique: true,
    sparse: true,
  },
  altColor: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
