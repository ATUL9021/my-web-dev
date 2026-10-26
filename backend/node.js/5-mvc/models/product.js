import fs from "fs";
import path from "path";

export default class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(this.#getPath(), (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  #getPath() {
    return path.join(import.meta.dirname, "..", "data", "products.json");
  }

  static fetchAll(callback) {
    fs.readFile(this.#getPath(), (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      callback(products);
    });
  }
}
