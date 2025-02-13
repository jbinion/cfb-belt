import mongoose from 'mongoose';
const reignSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    ],
    startDate: {
        type: Date,
        required: true
    },
    beltName: {
        type: String
    }
});
const Reign = mongoose.model('Reign', reignSchema);
export default Reign;
//# sourceMappingURL=Reign.js.map