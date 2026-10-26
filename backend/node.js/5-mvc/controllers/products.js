import Product from "../models/product.js";

export function getAddedProducts(req, res, next) {
  Product.fetchAll((data) => {
    const products = data;
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
}

export function getAddedProductsForaAdmin(req, res, next) {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
}
export function postAddProduct(req, res, next) {
  console.log(req.body);
  const newProduct = new Product(req.body.title);
  newProduct.save();

  res.redirect("/");
}
