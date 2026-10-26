import path from "path";

export const pageNotFound = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "not found",
    path: req.url,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
