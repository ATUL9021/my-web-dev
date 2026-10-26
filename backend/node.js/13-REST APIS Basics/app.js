import express from "express";
import { router as feedRouter } from "./routes/feed.js";
const app = express();

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
app.use("/feed", feedRouter);
app.listen(8080);
