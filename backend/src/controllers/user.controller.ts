import { Request, Response } from "express";
import UserService from "../services/user.service.js";
import { Usuario } from "../types/types.js";
import { generateToken } from "../utils/auth.js";
import { UserToken } from "../utils/auth.js";

const userService = new UserService();

export type UsuarioRegisterBody = {
  nombre: string;
  email: string;
  password: string;
  oficinaId: string;
};

export type UsuarioLoginBody = {
  email: string;
  password: string;
};

const login = async (req: Request<{}, {}, UsuarioLoginBody>, res: Response) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Debe completar los campos" });
    }
    let data = await userService.login({ email, password });
    if (!data)
      return res.status(400).send({ error: "Credenciales no validas!" });

    //Access token
    let token = generateToken(data.user);
    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 30,
    });

    // REFRESH TOKEN
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      signed: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).send({ payload: "Login!" });
  } catch (error) {}
};

const register = async (
  req: Request<{}, {}, UsuarioRegisterBody>,
  res: Response,
) => {
  try {
    let { nombre, email, password, oficinaId } = req.body;

    if (!nombre || !email || !password || oficinaId) {
      return res.status(400).send({ error: "Faltan datos!" });
    }
    let datos = { nombre, email, password, oficinaId };
    await userService.register(datos);
    return res.status(201).send({ payload: "Usuario registrado con exito!" });
  } catch (error) {
    return res.status(500).send({ error: "Error del servidor." });
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken: string = req.signedCookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send({ error: "No autorizado" });
    }
    let accessToken = await userService.refresh(refreshToken);
    if (!accessToken) {
      return res.status(404).send("No valido");
    }
    res.cookie("token", accessToken, {
      httpOnly: true,
      signed: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 30,
    });
    return res.status(200).send({
      message: "Token renovado",
    });
  } catch (error) {}
};

export default {
  register,
  login,
  refresh,
};
