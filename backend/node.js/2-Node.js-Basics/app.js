import http from "http";
import fs from "fs";
import { requestHandler } from "./routes.js";

function reListener(req, res) {}
const server = http.createServer(requestHandler);
const atul = "shende";
server.listen(3000);
