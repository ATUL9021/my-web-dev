const { getDatabase } = require("../util/database.js");
const mongodb = require("mongodb");
class User {
  constructor(userName, email, id, cart) {
    this.name = userName;
    this.email = email;
    this.cart = cart; //{items:[]}
    console.log("this.cart v", this.cart);
    if (id) {
      this._id = new mongodb.ObjectId(id);
    }
  }

  async save() {
    try {
      return await getDatabase().collection("users").insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  async getCart() {
    const cartItems = this.cart.items;
    const productIds = cartItems.map((item) => item._id);
    const allProducts = await getDatabase()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    for (let i = 0; i < allProducts.length; i++) {
      console.log("length", allProducts.length);
      const product = allProducts[i];
      product.quantity = this.cart.items.find((item) => {
        return item._id.toString() === product._id.toString();
      }).quantity;
    }
    return allProducts;
  }

  async addOrder() {
    const allDetailsCart = await this.getCart();
    const orders = {
      items: allDetailsCart,
      user: {
        _id: this._id,
        name: this.name,
        email: this.email,
      },
    };
    await getDatabase().collection("orders").insertOne(orders);
    return await getDatabase()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
  }

  async getOrders() {
    return await getDatabase()
      .collection("orders")
      .find({ "user._id": this._id })
      .toArray();
  }

  async deleteCartItemById(id) {
    this.cart.items = this.cart.items.filter((item) => {
      return id.toString() !== item._id.toString();
    });

    return await getDatabase()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
  }

  async addToCart(product) {
    console.log(this.cart, " vy");

    const myProduct = this.cart?.items?.find((item) => {
      console.log(
        "startfinding",
        item._id.toString(),
        " dfd",
        product._id.toString(),
      );
      return item._id.toString() === product._id.toString();
    });

    if (myProduct) {
      myProduct.quantity++;
    } else {
      if (this.cart) {
        console.log("mycart", this.cart);
        this.cart.items.push({
          _id: new mongodb.ObjectId(product._id),
          quantity: 1,
        });
      } else {
        this.cart = {
          items: [{ _id: new mongodb.ObjectId(product._id), quantity: 1 }],
        };
        console.log("updated cart", this.cart);
      }
    }

    await getDatabase()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
  }

  static async findById(id) {
    try {
      return await getDatabase()
        .collection("users")
        .findOne({ _id: new mongodb.ObjectId(id) });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
