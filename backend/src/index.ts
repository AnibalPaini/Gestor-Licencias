import express from "express";
import config from "./config/config.js";
import { connectMongo } from "./config/connectDB.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Servidor funcionando");
});

app.listen(config.port, () => {
  console.log("Servidor en puerto ", config.port);
});

connectMongo()