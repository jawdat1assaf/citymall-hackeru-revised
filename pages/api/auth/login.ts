// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import Cart from '../../../models/Cart'
import CartItem from '../../../models/CartItem'
import Product from '../../../models/Product'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'POST':
            try {
                User; Cart; CartItem; Product;
                let user = await User.findOne({
                    email: req.body.email,
                }).exec();
                if (!user || !await bcrypt.compare(req.body.password, user.password)) return res.status(404).json({
                    message: 'Credentials does not match with our records'
                })
                const access_token = jwt.sign(JSON.stringify({
                    email: user.email,
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                }), process.env.JWT_SECRET_KEY as any)
                return res.send({ access_token, user });
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
