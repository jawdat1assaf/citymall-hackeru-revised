import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../../middlewares/withAuth'
import FriendRequest from '../../../../models/FriendRequest'
import User from '../../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req


    await dbConnect();
    switch (method) {

        case 'DELETE':
            try {
                const { deletedCount } = await FriendRequest.deleteOne({ _id: req.query.id });
                if (deletedCount > 0) {
                    return res.status(204).json({ message: `Friend request deleted` });
                }
                throw Error("Couldn't delete");
            }
            catch (err: any) {
                if (err.code === 11000) {
                    return res.status(400).json({ message: `Friend request has already been sent` });
                }
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break;

        case 'PATCH':
            try {
                const friendRequest = await FriendRequest.findById(req.query.id);
                if (!friendRequest) { return res.status(404).json({ message: `Friend request not found` }); }
                const newFriend = await User.findById(friendRequest.from);
                const user = await User.findById(req.user._id);
        
                if (user) {
                    user.friends.push(newFriend);
                    newFriend.friends.push(user);
                    user.save();
                    newFriend.save();
                    friendRequest.remove();
                }
        
        
                return res.send(user);
            }
            catch (err: any) {
                if (err.code === 11000) {
                    return res.status(400).json({ message: `Friend request has already been sent` });
                }
                return res.status(400).json({
                    message: err.toString()
                })
            }

        default:
            return res.status(405).json({ success: false });
    }
}
export default withAuth(handler);
