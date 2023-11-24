import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (user) => {
    if (user.name != null && user.email != null && user.password != null) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = await User.create(user);
        // Create the token
        const jwtPayload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };
        return generateAccessToken(jwtPayload);
    }
    throw new Error('Please provide name, email and password');
}

export const loginUser = async (user) => {
    if (user.email != null && user.password != null) {
        const userFromDB = await User.findOne({ email: user.email });
        if (userFromDB.length > 0) {
            const isMatch = await bcrypt.compare(user.password, userFromDB.password);
            if (isMatch) {
                // Create the token
                const jwtPayload = {
                    id: userFromDB._id,
                    name: userFromDB.name,
                    email: userFromDB.email
                };
                return generateAccessToken(jwtPayload);
            }
            throw new Error(`Invalid email or password`);
        }
    }
    throw new Error('Please provide email and password');
}

export const getUserFromToken = async (token) => {
    try {
        const payload = await getTokenContent(token);
        const userId = payload.id;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {

    }
}

export const getUsers = async () => {
    return await User.find();
}