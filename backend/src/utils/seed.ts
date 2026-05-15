import UserModel from "../models/user.model.js";
import { hashPassword } from "./auth.js";
import { Usuario } from "../types/types.js";
import { connectMongo } from "../config/connectDB.js";

connectMongo()

const createAdmin = async () => {
  try {
    const pass = await hashPassword("123");

    const userAdmin: Omit<Usuario, "id"> = {
      nombre: "admin",
      password: pass,
      rol: "admin",
      email: "admin@gmail.com",
      habilitado: true,
    };

    await UserModel.create(userAdmin);

    console.log("Usuario admin creado: admin 123");
  } catch (err) {
    console.log(err);
  }
};
createAdmin()