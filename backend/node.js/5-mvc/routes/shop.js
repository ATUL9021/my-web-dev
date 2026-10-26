import path from "path";
import express from "express";

import { getAddedProducts } from "../controllers/products.js";
const router = express.Router();

// C:\Atul\Web Development\backend\node.js\mvc\views\shop.html
router.get("/", getAddedProducts);

export default router;
