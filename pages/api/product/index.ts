import nextConnect from 'next-connect';
import multer from 'multer';
import Product from '../../../models/Product';
import mongoose from 'mongoose';
import { uploadDirectories } from '../../../uploadDirectories';

const upload = multer({
    storage: multer.diskStorage({
        destination: `./public/${uploadDirectories.product}`,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res: any) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req: any, res: any) => {
    try {
        const product = await Product.create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            image: req.file?.filename,
        });
        return res.send(product);
    }
    catch (err: any) {
        if (err.code === 11000) {
            return res.status(400).json({ message: `Team: ${req.body.name} has already registerd` });
        }
        return res.status(400).json({
            message: err.toString()
        })
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};