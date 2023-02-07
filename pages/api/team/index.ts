// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Team from '../../../models/Team'
import User from '../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const teams = await Team.find({ "members": { $in: [ req.user._id] }}).populate(['admin', 'members']);
                return res.send(teams);
            }
            catch (err: any) {
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break

        case 'POST':
            try {
                const team = await Team.create({
                    _id: new mongoose.Types.ObjectId(),
                    admin: req.user._id,
                    name: req.body.name,
                    // image: req.file?.filename,
                    members: [req.user._id, ...req.body.members]
                });
                return res.send(team);
            }
            catch (err: any) {
                if (err.code === 11000) {
                    return res.status(400).json({ message: `Team: ${req.body.name} has already registerd` });
                }
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
