import express from "express";
import http from "http";

import adminRouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import path from "path";
const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join("public")));

app.use(adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(import.meta.dirname, "views", "page-not-found.html"));
});

app.listen(8000);
