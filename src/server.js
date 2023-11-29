import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.js';
import IssueRouter from './router/issue.js';
import AuthRouter from './router/auth.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Auth Router
app.use(AuthRouter);

// REST APIs
app.use('/issues', authMiddleware ,IssueRouter);


const PORT = process.env.PORT || 3000;

connectToDB(process.env.MONGODB_URL).then(async () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`IssueTracker app listening on port ${PORT}!`);
    });
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});