import express from "express";
import {
  getPosts,
  createPost,
  editPost,
  deletePost,
} from "../controllers/feed.js";

import { body } from "express-validator";
export const router = express.Router();

router.get(
  "/posts",
  [body("title").trim().isLength({ min: 5 }), body("content").trim({ min: 5 })],

  getPosts,
);
router.post("/posts", createPost);

router.get("/post/:postId", getPost);

router.put("/post/:postId", editPost);

router.delete("/post/:postId", deletePost);
