import express from "express";
import config from "./config/config.js";
import { connectMongo } from "./config/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secretCookie));

app.get("/", (_req, res) => {
  res.send("Servidor funcionando");
});

app.listen(config.port, () => {
  console.log("Servidor en puerto ", config.port);
});

connectMongo();
