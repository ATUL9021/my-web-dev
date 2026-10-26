import express from "express";
import { router as feedRouter } from "./routes/feed.js";
import { router as userRouter } from "./routes/auth.js";
import { isAuth } from "./middleware/is-auth.js";
import ioFunction from "socket.io";
import { io } from "./socket.js";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(express.json()); // parse json files
app.use((req, res, next) => {
  req.setHeader("Access-Control-Allow-Origin", "*");
  req.setHeader("Access-Control-Allow-Methods", "*");
  req.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization",
  );
});

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image"),
);
app.use("/images", express.static(path.join(import.meta.dirname, "images")));

app.use("/feed", isAuth, feedRouter);
app.use("/user", userRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({
    message: message,
  });
});

async function startConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://Atul9021:Atulyoyodj1%23@cluster0.vxu2k.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0`,
    );
    const server = app.listen(8080);
    io = ioFunction(server);

    io.on("connection", (socket) => {
      console.log(socket);
    });
  } catch (error) {
    console.log(error.message);
  }
}

startConnection();
