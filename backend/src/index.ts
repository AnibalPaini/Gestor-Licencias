import express from "express";
import config from "./config/config.js";
import { connectMongo } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import { userRutes, licenciaRouter } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secretCookie));

app.get("/", (_req, res) => {
  res.send("Servidor funcionando");
});

app.use("/api/user", userRutes)
app.use("/api/licencia", licenciaRouter)

app.listen(config.port, () => {
  console.log("Servidor en puerto ", config.port);
});

connectMongo();
