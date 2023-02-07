// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import Cart from '../../../models/Cart'
import CartItem from '../../../models/CartItem'
import Product from '../../../models/Product'

interface MulterNextRequest extends NextApiRequest {
    file: any;
}

const handler = async (req: MulterNextRequest, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'POST':
            try {
                User; Cart; CartItem; Product;
                const cart = await Cart.create({ items: [] });
                const user = await User.create({
                    _id: new mongoose.Types.ObjectId(),
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password, 10),
                    wishlist: [],
                    cart: cart.id,
                })
                return res.send(user);
            }
            catch (err: any) {
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break

        default:
            return res.status(400).json({ success: false });
    }
}
export default handler


