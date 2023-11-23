import { User } from "../models/user.js";

export const createUser = async (user) => {
    return await User.create(user);
}

export const getUsers = async () => {
    return await User.find();
}

export const getUserByEmail = async (email) => {
    return await User.find({ email });
};