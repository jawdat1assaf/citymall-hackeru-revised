import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from '../utilities/utility'
import User from './User';


const OrderSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        autopopulate: true
    },
    address: mongoose.Schema.Types.Mixed,
    transaction: mongoose.Schema.Types.Mixed,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        autopopulate: true
    }
});

OrderSchema.plugin(require('mongoose-autopopulate'));
OrderSchema.set('toJSON', { virtuals: true })




export default mongoose.models.Order || mongoose.model('Order', OrderSchema)