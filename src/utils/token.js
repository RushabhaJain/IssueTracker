import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: expiration, httpOnly: true });
};

export const getTokenContent = async (token) => {
    try {
        return await jwt.verify(token, secret);
    } catch (err) {
        throw new Error('Invalid token');
    }
}
