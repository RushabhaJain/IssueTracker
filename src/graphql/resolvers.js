import { GraphQLError } from "graphql";
import { getIssuesCreatedByUser, getIssueById, createIssue, updateIssue, deleteIssue } from "../services/issue.js";
import { getUserById } from "../services/user.js";

export const resolvers = {
    Query: {
        issues: async (_, params, { user }) => {
            if (!user) {
                throw unauthorizedError("You must be logged in to view issues");
            }
            return await getIssuesCreatedByUser(user._id);
        },
        issue: async (_, { id }, { user }) => {
            if (!user) {
                throw unauthorizedError("You must be logged in to view issues");
            }
            return await getIssueById(id);
        },
        user: async (_, params, { user }) => {
            if (!user) {
                throw unauthorizedError("You must be logged in to view issues");
            }
            return await getUserById(user._id);
        }
    },
    Issue: {
        createdBy: async (issue) => {
            return await getUserById(issue.createdBy);
        },
        assignedTo: async (issue) => {
            return await getUserById(issue.assignedTo);
        }
    },
    Mutation: {
        createIssue: async (_, { input }, { user }) => {
            if (!user) {
                throw unauthorizedError("You must be logged in to view issues");
            }
            const issue = {
                ...input,
                createdBy: user._id
            };
            return await createIssue(issue);
        },
        updateIssue: async (_, { id, input }, { user }) => {
            if (!user) {
                throw unauthorizedError("You must be logged in to view issues");
            }
            return await updateIssue(id, input);
        },
        deleteIssue: async (_, { id }, { user }) => {
            if (!user) {
                throw unauthorizedError("You must be logged in to view issues");
            }
            return await deleteIssue(id);
        }
    }
};

const unauthorizedError = (msg) => {
    return new GraphQLError(msg, {
        statusCode: 401,
        extensions: {
            code: "UNAUTHORIZED"
        }
    });
};