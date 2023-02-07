// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'GET':
            const query = req.query.q as string;
            try {
                const users = await User.find({
                    $or: [
                        { "name": { $regex: new RegExp(query, 'i') } },
                        { "username": { $regex: new RegExp(query, 'i') } },
                        { "email": { $regex: new RegExp(query, 'i') } },
                        { "phone": { $regex: new RegExp(query, 'i') } },
                    ]
                }, { password: 0 });
                return res.status(200).json(users);
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
