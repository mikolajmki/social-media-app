import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './Routes/Auth.js';
import UserRoutes from './Routes/User.js';
import PostRoutes from './Routes/Post.js';
import UploadRoutes from './Routes/Upload.js';

const app = express();

// images for public

app.use(express.static('public'));
app.use('/images', express.static('images'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors());

dotenv.config();

// try {
//     await mongoose.connect('mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@node-rest-shop.7xmmw98.mongodb.net/?retryWrites=true&w=majority');
//     app.listen(process.env.PORT);
// } catch {
//     throw Error('Error connecting to database.');
// }

try {
    await mongoose.connect('mongodb://localhost:27017');
    app.listen(process.env.PORT);
} catch (err) {
    throw Error(err);
}

app.use('/upload', UploadRoutes);
app.use('/auth', AuthRoutes);
app.use('/user', UserRoutes);
app.use('/post', PostRoutes);