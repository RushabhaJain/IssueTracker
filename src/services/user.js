import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (user) => {
    if (user.name != null && user.email != null && user.password != null) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = new User({
            name: user.name,
            email: user.email,
            password: user.password
        });
        return await User.create(newUser);
    }
    throw new Error('Please provide name, email and password');
}

export const loginUser = async (user) => {
    if (user.email != null && user.password != null) {
        const userFromDB = await User.findOne({ email: user.email });
        if (userFromDB.length > 0) {
            const isMatch = await bcrypt.compare(user.password, userFromDB.password);
            if (isMatch) {
                return userFromDB[0];
            }
            throw new Error(`Invalid email or password`);
        }
    }
    throw new Error('Please provide email and password');
}

export const getUsers = async () => {
    return await User.find();
}