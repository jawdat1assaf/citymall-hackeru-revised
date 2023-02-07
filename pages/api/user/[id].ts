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
            const { id } = req.query
            try {
                const user = await User.findById(id, { password: 0 }).populate('friends');
                return res.status(200).json(user);
            }
            catch (err: any) {
                return res.status(400).json({
                    message: err.toString()
                })
            }

        default:
            return res.status(400).json({ success: false });
    }
}
export default handler
