import mongoose from 'mongoose';
import User from './User';


const Team = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, unique: true },
    image: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }]
});


export default mongoose.models.Team || mongoose.model('Team', Team)