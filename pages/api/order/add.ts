// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Cart from '../../../models/Cart'
import CartItem from '../../../models/CartItem'
import Order from '../../../models/Order'
import Product from '../../../models/Product'
import Team from '../../../models/Team'
import User from '../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    const productId = req.query.productId;

    await dbConnect();
    switch (method) {

        case 'POST':
            try {
                User; Cart; CartItem; Product;
                const order = await Order.create({
                    user: req.user._id,
                    transaction: req.body.transaction,
                    cart: req.body.cart_id,
                    address: req.body.address
                });

                const newCart = await Cart.create({ items: [] });
                const user = await User.findByIdAndUpdate(req.user._id, { cart: newCart.id }, { new: true })
                return res.send({ order, user });
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
export default withAuth(handler);