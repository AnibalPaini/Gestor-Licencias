import UserModel from "../models/user.model.js";
import { Usuario } from "../types/types.js";

export default class UserService {
  constructor() {}

  login() {}

  async register(datos: Usuario) {
    try {
      await UserModel.create(datos);
    } catch (error) {
      console.log(error);
    }
  }
}
