import { getIssuesCreatedByUser, getIssueById, createIssue, updateIssue, deleteIssue } from "../services/issue.js";
import { getUserById } from "../services/user.js";

export const resolvers = {
    Query: {
        issues: async (_, params, { user }) => {
            return await getIssuesCreatedByUser(user._id);
        },
        issue: async (_, { id }) => {
            return await getIssueById(id);
        },
        user: async (_, params, { user }) => {
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
            const issue = {
                ...input,
                createdBy: user._id
            };
            return await createIssue(issue);
        },
        updateIssue: async (_, { id, input }) => {
            return await updateIssue(id, input);
        },
        deleteIssue: async (_, { id }) => {
            return await deleteIssue(id);
        }
    }
};