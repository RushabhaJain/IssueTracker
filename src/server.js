import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.js';
import IssueRouter from './router/issue.js';
import AuthRouter from './router/auth.js';
import cookieParser from 'cookie-parser';
import { authGraphQLMiddleware, authMiddleware } from './middlewares/authMiddleware.js';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as ApolloMiddleware } from '@apollo/server/express4'
import { resolvers } from './graphql/resolvers.js';
import { readFileSync } from 'node:fs';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Add common middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Auth Router
app.use(AuthRouter);
// REST APIs
app.use('/issues', authMiddleware ,IssueRouter);

// GraphQL API
const typeDefs = await readFileSync('./src/graphql/schema.graphql', 'utf8');
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

await apolloServer.start();

function getContext({req}) {
    return {
        user: req.user
    }
}

app.use('/graphql', authGraphQLMiddleware, ApolloMiddleware(apolloServer, {context: getContext}));

// Connect to MongoDB and start the server
connectToDB(process.env.MONGODB_URL).then(async () => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`IssueTracker app listening on port ${PORT}!`);
    });
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});