import path from "path";
import express from "express";
import {
  postAddProduct,
  getAddedProductsForaAdmin,
} from "../controllers/products.js";

// const path = require("path");

// const express = require("express");

// const rootDir = require("../util/path");

const router = express.Router();

console.log(import.meta.dirname);

// /admin/add-product => GET
router.get("/add-product", getAddedProductsForaAdmin);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

export default router;
