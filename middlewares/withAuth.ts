
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import jwt from 'jsonwebtoken'
import { Callback } from 'mongoose';

export interface NextApiRequestWithAuth extends NextApiRequest {
  user: any;
}


const withAuth = (handler: any) => {
  return  (req: NextApiRequestWithAuth, res: NextApiResponse) => {
    if (!req.headers["authorization"]) return res.status(401).json({message: "Invalid Token"});
    const [type, token] = req.headers["authorization"]?.split(' ') as string[];
  
    if (type !== 'Bearer' || !token) {
      return res.status(403).json({message: "A token is required for authentication"});
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({message: "Invalid Token"});
    }
    return handler(req, res);
  };
};


export default withAuth;