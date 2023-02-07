import mongoose from 'mongoose';
import User from './User';

const FriendRequest = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
}).index({ from: 1, to: 1}, { unique: true});


export default mongoose.models.FriendRequest || mongoose.model('FriendRequest', FriendRequest)