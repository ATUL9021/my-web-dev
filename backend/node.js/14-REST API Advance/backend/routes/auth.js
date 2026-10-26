import express from "express";
import { signup } from "../controllers/auth.js";
import { body } from "express-validator";
import { User } from "../models/user.js";
export const router = express.Router();

router.put(
  "singup",
  [
    body("email")
      .isEmail()
      .withMessage("email is incorrect")
      .custom(async (value, { req }) => {
        const result = await User.findOne({ email: value });
        if (result) {
          return Promise.reject("email already exists");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .isAlphanumeric()
      .withMessage("password is not strong"),

    body("name").trim().not().isEmpty(),
  ],
  signup,
);

router.post("/login", login);
