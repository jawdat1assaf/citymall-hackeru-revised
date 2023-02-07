// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../../middlewares/withAuth'
import Team from '../../../../models/Team'
import User from '../../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    const productId = req.query.productId;

    await dbConnect();
    switch (method) {

        case 'PATCH':
            try {
                const user = await User.findById(req.user._id);

                
                user.wishlist.pop(productId);
                await user.save();
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