// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import cookie from 'cookie';
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

                res.setHeader('Set-Cookie', [
                    cookie.serialize('token', '', {
                        maxAge: -1,
                        path: '/',
                    }),
                ]);
                return res.send({});
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
