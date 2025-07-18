import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import authRegisterRoutes from './routes/authRegister';
import authLoginRoutes from './routes/authLogin';
import forgotPasswordRoutes from './routes/forgotPassword';
import resetPasswordRoutes from './routes/resetPassword';
app.use(authRegisterRoutes);
app.use(authLoginRoutes);
app.use('/auth',forgotPasswordRoutes);
app.use('/auth',resetPasswordRoutes);

import postUserRoute from './routes/postUser';
import getAllUsersRoute from './routes/getAllUsers';
import updateUserRoute from './routes/updateUser';
import deleteUserRoute from './routes/deleteUser';
import changePasswordRoute from './routes/changePassword';
app.use('/user', postUserRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', updateUserRoute);
app.use('/user', deleteUserRoute);
app.use('/user', changePasswordRoute);

import postTodoRoute from './routes/postTodo';
import listTodoRoute from './routes/listTodo';
import getTodoByIdRoute from './routes/getTodoById';
import updateTodoRoute from './routes/updateTodo';
import deleteTodoRoute from './routes/deleteTodo';
import { changePassword } from "./controllers/user/changePassword";
app.use('/todo', postTodoRoute);
app.use('/todo', listTodoRoute);
app.use('/todo', getTodoByIdRoute);
app.use('/todo', updateTodoRoute);
app.use('/todo', deleteTodoRoute);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong' });
});

const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.PORT || 3001;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
