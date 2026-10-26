import User from "../models/user";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export async function login(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne({ email: email });

    if (!result) {
      const error = new Error("email and password dont match");
      error.statusCode = 401;
      throw error;
    }

    if (!user.password === password) {
      const error = new Error("email and password dont match");
      error.statusCode = 401;
      throw error;
    }

    //json token sending

    const token = jwt.sign(
      { email: user.email, userId: user._Id.toString() },
      "secret",
      { expiresIn: "1h" },
    );

    res.status(200).json({ token: token, userId: user._Id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}
export async function signup(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const errors = validationResult.errors;
    if (!errors.isEmpty()) {
      const error = new Error("validation failed");
      error.statusCode = 422;
      error.data = error.array();
      throw error;
    }

    const user = new User({
      name: name,
      password: password,
      email: email,
    });
    const result = user.save();

    res.status(201).json({
      message: "user created successfully",
      uesr: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}
