// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Cart from '../../../models/Cart'
import CartItem from '../../../models/CartItem'
import Product from '../../../models/Product'



const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'POST':
            try {
                User; Cart; CartItem; Product;
                const user = await User.findByIdAndUpdate(req.user._id, {
                    $set: {
                        name: req.body.name,
                        username: req.body.username,
                        phone: req.body.phone,
                        email: req.body.email,
                        bio: req.body.bio,
                    }
                }, { new: true });
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
export default withAuth(handler);
