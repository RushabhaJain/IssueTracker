import express from "express";
import { createUser } from "../services/user.js";
import {
  validateLoginUserRequest,
  validateRegisterUserRequest,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterUserRequest, async (req, res) => {
  try {
    const token = await createUser(req.body);
    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
      })
      .status(201)
      .send();
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

router.post("/login", validateLoginUserRequest, async (req, res) => {
  const token = await loginUser(req.body);
  return res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    })
    .status(200)
    .send();
});

export default router;
