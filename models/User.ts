import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from './../utilities/utility'




const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    phone: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        optional: true,
        autopopulate: true,
    }],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        autopopulate: true
    },
    password: String,
});

// UserSchema.set('toObject', { virtuals: true })

UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.set('toJSON', { virtuals: true })


export default mongoose.models.User || mongoose.model('User', UserSchema)