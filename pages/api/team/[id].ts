// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Team from '../../../models/Team'
import User from '../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    const teamId = req.query.id;

    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const team = await Team.findById(teamId).populate(['admin', 'members']);
                return res.send(team);
            }
            catch (err: any) {
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break

        case 'PATCH':
            try {
                // return res.send({'hi': 'hi'});
                const team = await Team.findByIdAndUpdate(teamId, {
                    $set: {
                        name: req.body.name,
                        members: req.body.members,
                    }
                }, { new: true });
                return res.send(team);
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
