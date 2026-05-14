import UserModel from "../models/user.model.js";
import { Usuario } from "../types/types.js";
import {
  UsuarioRegisterBody,
  UsuarioLoginBody,
} from "../controllers/user.controller.js";
import { UserToken, comparePass } from "../utils/auth.js";

export default class UserService {
  constructor() {}

  async login(datos: UsuarioLoginBody): Promise<UserToken | null> {
    try {
      let usuario: Usuario | null = await UserModel.findOne({
        email: datos.email,
      });
      if (!usuario) return null;
      let validatePass = comparePass(datos.password, usuario.password);
      if (!validatePass) return null;

      let userToken: UserToken = {
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        oficina: usuario.oficinaId,
      };
      return userToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async register(datos: UsuarioRegisterBody) {
    try {
      await UserModel.create(datos);
    } catch (error) {
      console.log(error);
    }
  }
}
