import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { products } from "./admin.js";

const router = express.Router();

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

router.get("/", (req, res, next) => {
  console.log(products);
  res.sendFile(path.join(dirName, "..", "views", "shop.html"));
});

export default router;
