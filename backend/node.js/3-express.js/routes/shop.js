import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const router = express.Router();

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

router.get("/", (req, res, next) => {
  res.sendFile(path.join(dirName, "..", "views", "shop.html"));
});

export default router;
