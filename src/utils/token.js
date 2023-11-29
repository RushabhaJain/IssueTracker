import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

export const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: expiration });
    return token;
};

export const getTokenContent = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw new Error('Invalid token');
    }
}
