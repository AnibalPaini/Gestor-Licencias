import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";

export type UserToken = {
  email: string;
  nombre: string;
  rol: string;
  oficina?: string;
};

const jwtSecret = config.secretJWT;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePass = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (usuario: UserToken) => {
  if (!jwtSecret) {
    throw new Error("Falta secret de token.");
  }
  return jwt.sign(usuario, jwtSecret, { expiresIn: "1d" });
};
