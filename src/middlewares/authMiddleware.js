import { User } from "../models/user.js";
import { getTokenContent } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.token;
  }
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

export const authGraphQLMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.token;
  }
  try {
    if (token) {
      const decoded = await getTokenContent(token);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    console.log("[Auth Middleware GraphQL] Error: ", error);
  } finally {
    next();
  }
};
