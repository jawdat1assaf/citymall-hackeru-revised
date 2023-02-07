import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from '../utilities/utility'
import User from './User';


const ReviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        autopopulate: true
    },
    text: String,
    rating: Number,
});

ReviewSchema.plugin(require('mongoose-autopopulate'));
ReviewSchema.set('toJSON', { virtuals: true })




export default mongoose.models.Review || mongoose.model('Review', ReviewSchema)