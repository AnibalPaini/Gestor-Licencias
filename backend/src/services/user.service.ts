import UserModel from "../models/user.model.js";
import { Usuario } from "../types/types.js";
import {
  UsuarioRegisterBody,
  UsuarioLoginBody,
} from "../controllers/user.controller.js";
import { UserToken, comparePass, hashPassword } from "../utils/auth.js";

export default class UserService {
  constructor() {}

  async login(datos: UsuarioLoginBody): Promise<UserToken | null> {
    try {
      let usuario: Usuario | null = await UserModel.findOne({
        email: datos.email,
      });
      console.log(usuario);

      if (!usuario) return null;
      console.log(datos.password);
      console.log(usuario.password);
      
      let validatePass = await comparePass(datos.password, usuario.password);
      console.log(validatePass);
      
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
      const hashed = await hashPassword(datos.password);
      let usuario= await UserModel.create({ ...datos, password: hashed });
      return usuario;
    } catch (error) {
      console.log(error);
    }
  }
}
