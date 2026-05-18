import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/auth.js";
import config from "../config/config.js";
import {
  UsuarioRegisterBody,
  UsuarioLoginBody,
} from "../controllers/user.controller.js";
import { UserToken, comparePass, hashPassword } from "../utils/auth.js";
import { generateRefreshToken } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export default class UserService {
  constructor() {}

  async login(datos: UsuarioLoginBody): Promise<{
    user: UserToken;
    refreshToken: string;
  } | null> {
    try {
      let usuario = await UserModel.findOne({
        email: datos.email,
      });

      if (!usuario) {
        return null;
      }

      let validatePass = await comparePass(datos.password, usuario.password);
      if (!validatePass) {
        return null;
      }

      const refreshToken = generateRefreshToken(usuario._id.toString());
      usuario.refreshToken = refreshToken;
      await usuario.save();

      let userToken: UserToken = {
        id: usuario._id.toString(),
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        oficina: usuario.oficinaId,
      };
      return { user: userToken, refreshToken };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async register(datos: UsuarioRegisterBody) {
    try {
      const hashed = await hashPassword(datos.password);
      let usuario = await UserModel.create({ ...datos, password: hashed });
      return usuario;
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(refreshToken: string): Promise<string | null> {
    try {
      if (!config.refreshSecretJWT) {
        throw new Error("Falta refresh secret");
      }
      const decoded = jwt.verify(refreshToken, config.refreshSecretJWT);

      const usuario = await UserModel.findById(decoded.id);

      if (!usuario) {
        return null;
      }

      // Verifica que coincida con DB
      if (usuario.refreshToken !== refreshToken) {
        console.log("Token invalido");
        return null;
      }

      const accessToken: string = generateToken({
        id: usuario._id.toString(),
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        oficina: usuario.oficinaId,
      });

      return accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
