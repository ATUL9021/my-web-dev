import express from "express";
import path from "path";

const router = express.Router();

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/dfd");
});

router.get("/add-product", (req, res, next) => {
  console.log("hey2");
  res
    .statusCode(404)
    .sendFile(
      path.join(import.meta.dirname, "..", "views", "add-product.html"),
    );
});

export default router;
