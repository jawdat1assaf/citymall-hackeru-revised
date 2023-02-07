import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from '../utilities/utility'

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    image: String
});

ProductSchema.set('toJSON', { virtuals: true })

ProductSchema.virtual('imagePath').get(function () {
    return this.image ? getPath(path.join(uploadDirectories.product, this.image)) : null;
})


export default mongoose.models.Product || mongoose.model('Product', ProductSchema)