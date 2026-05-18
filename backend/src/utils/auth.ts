import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";

export type UserToken = {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  oficina?: string;
};

const jwtSecret = config.secretJWT;
const refreshJwtSecret = config.refreshSecretJWT;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePass = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (usuario: UserToken) => {
  if (!jwtSecret) {
    throw new Error("Falta secret de token.");
  }
  return jwt.sign(usuario, jwtSecret, { expiresIn: "30m" });
};

export const generateRefreshToken = (id:string) => {
  if (!config.refreshSecretJWT) {
    throw new Error("Falta secret de token.");
  }
  return jwt.sign({id}, config.refreshSecretJWT, { expiresIn: "7d" });
};
