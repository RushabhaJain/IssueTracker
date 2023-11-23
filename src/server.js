import express from 'express';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`IssueTracker app listening on port ${PORT}!`);
});