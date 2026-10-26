import express from "express";
import path from "path";

const router = express.Router();

router.get("/product", (req, res, next) => {
  console.log(req.body);
  res.end();
});

router.get("/add-product", (req, res, next) => {
  console.log("hey2");
  res
    .status(202)
    .sendFile(
      path.join(import.meta.dirname, "..", "views", "add-product.html"),
    );
});

export const products = [];
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.status(202).redirect("/");
});

export default router;
