


import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

mongoose.connect("mongodb://localhost:27017/nodejs");

app.use(express.json());

app.use('/users', userRoutes);

app.use('/posts', postRoutes);

app.listen(3000);

