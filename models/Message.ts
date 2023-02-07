import mongoose from 'mongoose';
import User from './User';


const Message = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    status: {
        type: String,
        default: 'sent'
    },
    text: String,
})

export default mongoose.models.Message || mongoose.model('Message', Message)