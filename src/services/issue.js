import { Issue } from "../models/issue.js";

// Create an issue
export const createIssue = (issue) => {
    issue['status'] = 'New';
    issue['priority'] = issue.priority || 'Low';
    return Issue.create(issue);
}

// Get all issues create by the specific user
export const getIssuesCreatedByUser = (userId) => {
    return getIssues({ createdBy: userId });
}

// Get all issues based on the filter input
export const getIssues = (filter) => {
    return Issue.find(filter);
}

// Update the issue
export const updateIssue = async (id, issue) => {
    // Get existing issue
    const existingIssues = await Issue.find({ _id: id });
    if (existingIssues.length === 0) {
        throw new Error('Issue not found');
    }
    const existingIssue = existingIssues[0];
    // Update the issue
    for (let key in issue) {
        existingIssue[key] = issue[key];
    }
    existingIssue.lastUpdatedAt = Date.now();
    return existingIssue.save();
};

// Delete the issue
export const deleteIssue = async (id) => {
    return Issue.deleteOne({ _id: id });
}