import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    color: { type: String },
    logoFile: {
        type: String
    },
    altColor: {
        type: String
    },
    slug: {
        type: String,
        required: true
    }
});
const Team = mongoose.model('Team', teamSchema);
export default Team;
//# sourceMappingURL=Team.js.map