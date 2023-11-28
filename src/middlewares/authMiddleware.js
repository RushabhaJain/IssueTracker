import { User } from "../models/user";
import { getTokenContent } from "../utils/token";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  if (!token) {
    return res.status(401).send({
      success: false,
      error: "No token provided",
    });
  }
  try {
    const decoded = await getTokenContent(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({
        success: false,
        error: "No user found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: "Invalid token",
    });
  }
};
