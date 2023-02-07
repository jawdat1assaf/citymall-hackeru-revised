import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from './../utilities/utility'



const CartSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        optional: true,
        autopopulate: true
    }]
});

CartSchema.plugin(require('mongoose-autopopulate'));
CartSchema.set('toJSON', { virtuals: true })


CartSchema.virtual('total').get(function () {
    return this.items.reduce((total, item) => total + (item as any).sub_total, 0);
})



export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)