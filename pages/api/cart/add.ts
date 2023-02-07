// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Cart from '../../../models/Cart'
import CartItem from '../../../models/CartItem'
import Team from '../../../models/Team'
import User from '../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    const productId = req.query.productId;

    await dbConnect();
    switch (method) {

        case 'POST':
            try {
                Cart; CartItem;
                const user = await User.findById(req.user._id);
                const cartItem = await CartItem.create({
                    product: req.body.product_id,
                    quantity: req.body.quantity
                })
                user.cart.items.push(cartItem);
                await user.cart.save();
                return res.send({ user });
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