import dotenv from "dotenv";
import mongoose from "mongoose";
import express, {Request,Response,NextFunction} from 'express';

dotenv.config();
const app = express();

import postUserRoute from './routes/postUser';
import getAllUsersRoute from './routes/getAllUsers';
import updateUserRoute from './routes/updateUser';
import deleteUserRoute from './routes/deleteUser';

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.PORT || 3001;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connect to MongoDB');

        app.use(postUserRoute);
        app.use(getAllUsersRoute);
        app.use(updateUserRoute);
        app.use(deleteUserRoute);

        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(err.status || 500).json({ error: err.message || 'Something went wrong' });
        });

        app.listen(PORT, () => {
            console.log(`server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:',err);
    });

