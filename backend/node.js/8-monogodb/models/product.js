const { getDatabase } = require("../util/database.js");
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
    if (id) {
      this._id = new mongodb.ObjectId(id);
    }
  }

  async save() {
    try {
      const db = getDatabase();
      if (this._id) {
        return db
          .collection("products")
          .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
      }
      return db.collection("products").insertOne(this);
    } catch (error) {
      console.log("error");
    }
  }

  static async fetchAll() {
    try {
      const db = getDatabase();
      return await db.collection("products").find().toArray();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await getDatabase()
        .collection("products")
        .find({ _id: new mongodb.ObjectId(id) })
        .next();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await getDatabase()
        .collection("products")
        .deleteOne({ _id: new mongodb.ObjectId(id) });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Product;
