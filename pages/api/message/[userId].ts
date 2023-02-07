// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Message from '../../../models/Message'
import User from '../../../models/User'


const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const messages = await Message.find({
                    $or: [
                        { "to": req.user._id, from: req.query.userId },
                        { "from": req.user._id, to: req.query.userId },
                    ]
                });
                return res.send(messages);
            }
            catch (err: any) {
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break;
        case 'POST':
            try {
                const message = await Message.create({
                    _id: new mongoose.Types.ObjectId(),
                    from: req.user,
                    to: req.query.userId,
                    text: req.body.text
                });
                return res.status(201).json(message);
            }
            catch (err: any) {
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break;

        default:
            return res.status(400).json({ success: false });
    }
}
export default withAuth(handler);
