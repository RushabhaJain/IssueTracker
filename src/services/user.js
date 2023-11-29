import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/token.js";

export const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    // Create the token
    const jwtPayload = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    };
    return generateAccessToken(jwtPayload);
  } catch (error) {
    if (error.code === 11000) {
        throw new Error(`User already exists with email ${user.email}`);
    }
  }
};

export const loginUser = async (user) => {
    const userFromDB = await User.findOne({ email: user.email });
    if (userFromDB) {
      const isMatch = await bcrypt.compare(user.password, userFromDB.password);
      if (isMatch) {
        // Create the token
        const jwtPayload = {
          id: userFromDB._id.toString(),
          name: userFromDB.name
        };
        const token = generateAccessToken(jwtPayload);
        return token;
      }
      throw new Error(`Invalid email or password`);
    }
};

export const getUserFromToken = async (token) => {
  try {
    const payload = await getTokenContent(token);
    const userId = payload.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {}
};

export const getUsers = async () => {
  return await User.find();
};
