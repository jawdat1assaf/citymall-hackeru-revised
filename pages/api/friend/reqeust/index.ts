import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../../middlewares/withAuth'
import FriendRequest from '../../../../models/FriendRequest'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const friendRequests = await FriendRequest.find({
                    $or: [
                        { "to": req.user._id },
                        { "from": req.user._id },
                    ]
                }).populate(['from', 'to']);
                return res.send(friendRequests);
            }
            catch (err: any) {
                return res.status(405).json({
                    message: err.toString()
                })
            }
            break

        case 'POST':
            const targetUserId = req.body.user_id;
            try {
                const newRequest = await FriendRequest.create({
                    _id: new mongoose.Types.ObjectId(),
                    from: req.user,
                    to: targetUserId,
                });
                return res.status(201).json({ message: `Friend request sent`, newRequest });
            }
            catch (err: any) {
                if (err.code === 11000) {
                    return res.status(400).json({ message: `Friend request has already been sent` });
                }
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break
        default:
            return res.status(405).json({ success: false });
    }
}
export default withAuth(handler);
