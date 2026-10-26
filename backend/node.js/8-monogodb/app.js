const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { startConnection } = require("./util/database.js");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user.js");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6a775d0a6a814338d0b0aab3")
    .then((user) => {
      console.log("usermysdf", user);
      req.user = new User(user.name, user.email, user._id, user.cart);
      console.log("myuser", user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

async function connectToClient() {
  try {
    const client = await startConnection();

    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}

connectToClient();
