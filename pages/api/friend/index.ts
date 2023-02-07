// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import User from '../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'GET':
            const query = req.query.q as string;
            try {
                const user = await User.findById(req.user._id).populate('friends');
                if (user) {
                    res.send(user.friends);
                }
            }
            catch (err: any) {
                res.status(400).json({
                    message: err.toString()
                })
            }
            break

        default:
            return res.status(400).json({ success: false });
    }
}
export default withAuth(handler);
