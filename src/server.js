import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

connectToDB(process.env.MONGODB_URL).then(async () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`IssueTracker app listening on port ${PORT}!`);
    });
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});