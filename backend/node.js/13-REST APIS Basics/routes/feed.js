import express from "express";
import { getPosts, createPost } from "../controllers/feed.js";
export const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", createPost);
