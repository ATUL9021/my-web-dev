import { validationResult } from "express-validator";
import Post from "../models/post.js";
import User from "../models/user.js";
import fs from "fs";
import path from "path";
import post from "../models/post.js";
export async function getPosts(req, res, next) {
  try {
    const page = req.query.page || 1;
    const numberOfItemsPerPage = 2;
    let totalItems = 0;
    totalItems = await Post.find().countDocuments();

    const result = await Post.find()
      .skip((page - 1) * numberOfItemsPerPage)
      .limit(numberOfItemsPerPage);

    if (!result) {
      const error = new Error("could not load data");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      posts: result,
      totalItems,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}

export async function createPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!error.isEmpty()) {
      const error = new Error("Validation failed, entered wrong details");
      error.statusCode = 422;
      throw error;
    }

    if (!req.file) {
      const error = new Error("image is not uploaded");
      error.statusCode = 422;
      throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.userId;

    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: userId,
    });

    const result = await post.save();

    const userResult = await User.findById(userId);

    userResult.posts.push(result._Id);

    await userResult.save();

    res.status(201).json({
      message: "post created successfully",
      post: result,
      creator: { _id: userResult._id, name: userResult.name },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}

async function getPost(req, res, next) {
  try {
    const postId = req.params.postId;

    const result = await Post.findById(postId);

    if (!result) {
      const error = new Error("post is not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ post: result });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}

async function editPost(req, res, next) {
  try {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;

    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!imageUrl) {
      const error = new Error("image cound not be loaded");
      error.statusCode = 422;
      throw error;
    }

    const result = await Post.findById(postId);

    if (!result) {
      const error = new Error("post is not found");
      error.statusCode = 404;
      throw error;
    }

    if (imageUrl !== result.imagUrl) {
      clearImage(result.imagUrl);
    }
    result.title = title;
    result.content = content;
    result.imageUrl = imageUrl;

    const resulOfSave = result.save();

    return res.status(200).json({ post: resulOfSave });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = req.params.postId;
    const result = await Post.findById(postId);

    if (!result) {
      const error = new Error("post is not found");
      error.statusCode = 404;
      throw error;
    }

    clearImage(result.imageUrl);
    result = Post.findByIdAndDelete(postId);
    return res.status(202).json({ messgae: "deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
}

function clearImage(filePath) {
  const filePath = path.join(import.meta.dirname, "..", filePath);
  fs.unlink(filePath, (error) => console.log(error));
}
