import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.js';
import IssueRouter from './router/issue.js';
import AuthRouter from './router/auth.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Auth Router
app.use(AuthRouter);

// REST APIs
app.use('/issues', IssueRouter);


const PORT = process.env.PORT || 3000;

connectToDB(process.env.MONGODB_URL).then(async () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`IssueTracker app listening on port ${PORT}!`);
    });
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});