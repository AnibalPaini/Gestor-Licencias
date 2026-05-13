import mongoose from "mongoose";
import { Usuario } from "../types/types.js";

const UserSchema = new mongoose.Schema<Usuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  oficinaId: { type: String, required: true },
  rol: { enum: ["admin", "usuario"], default: "usuario", required: true },
  habilitado: { type: Boolean, required: true, default: true },
});

const UserModel = mongoose.model<Usuario>("Usuario", UserSchema);

export default UserModel;