import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from './../utilities/utility'


const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true
    },
    quantity: Number
});

CartItemSchema.plugin(require('mongoose-autopopulate'));
CartItemSchema.set('toJSON', { virtuals: true })

CartItemSchema.virtual('sub_total').get(function () {
    return (this.product as any)?.price * (this.quantity as any);
})



export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema)