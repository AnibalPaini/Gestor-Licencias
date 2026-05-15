import mongoose from "mongoose";
import config from "../config/config.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri || "mongodb://localhost:27017/Licencias");
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Fallo la conexion a DB: ", error);
  }
};
