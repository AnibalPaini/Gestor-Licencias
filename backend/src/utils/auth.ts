import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config.js";

export type UserToken = {
  email: string;
  nombre: string;
  rol: string;
  oficina: string;
};

const jwtSecret = config.secretJWT;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePass = async (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

export const generateToken = (usuario: UserToken) => {
  if (!jwtSecret) {
    throw new Error("Falta secret de token.");
  }
  return jwt.sign(usuario, jwtSecret, { expiresIn: "1d" });
};
