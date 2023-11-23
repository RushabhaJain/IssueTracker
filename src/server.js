import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.js';
import IssueRouter from './router/issue.js';
import UserRouter from './router/user.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// REST APIs
app.use('/issues', IssueRouter);
app.use('/users', UserRouter);


const PORT = process.env.PORT || 3000;

connectToDB(process.env.MONGODB_URL).then(async () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`IssueTracker app listening on port ${PORT}!`);
    });
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});