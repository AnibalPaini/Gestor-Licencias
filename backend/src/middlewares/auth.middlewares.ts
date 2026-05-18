import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import config from "../config/config.js";
import { UserToken } from "../utils/auth.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookie = req.signedCookies.token;
  if (!cookie) return res.status(401).send({ error: "No autentucado" });
  try {
    if (!config.secretJWT) throw new Error("Falta jst secret");
    const decoded = jwt.verify(cookie, config.secretJWT) as UserToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden - Invalid or expired token",
    });
  }
};

export const authRolMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);

    if (!req.user) {
      return res.status(401).send({ error: "No autorizado!" });
    }
    if (!roles.includes(req.user.rol)) {
      return res.status(403).send({ error: "Acceso denegado!" });
    }
    next();
  };
};
