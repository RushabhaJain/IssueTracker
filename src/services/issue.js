import mongoose from "mongoose";
import { Issue } from "../models/issue.js";

// Create an issue
export const createIssue = async (issue) => {
    return await Issue.create(issue);
}

// Get all issues create by the specific user
export const getIssuesCreatedByUser = async (userId) => {
    return await getIssues({ createdBy: userId });
}

// Get all issues based on the filter input
export const getIssues = async (filter) => {
    return await Issue.find(filter);
}

// Update the issue
export const updateIssue = async (id, issue) => {
    // Get existing issue
    const existingIssue = await getIssueById(id);
    if (!existingIssue) {
        throw new NotFoundError(`Issue not found with id: ${id}`);
    }
    // Update the issue
    for (let key in issue) {
        existingIssue[key] = issue[key];
    }
    existingIssue.lastUpdatedAt = Date.now();
    return existingIssue.save();
};

// Delete the issue
export const deleteIssue = async (id) => {
    const issue = await getIssueById(id);
    if (!issue) {
        throw new NotFoundError(`Issue not found with id: ${id}`);
    }
    await Issue.deleteOne({ _id: id });
    return issue;
}

// Get issue by id
export const getIssueById = async (id) => {
    return await Issue.findById(id);
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}