import { Request, Response } from "express";
import UserService from "../services/user.service.js";
import { Usuario } from "../types/types.js";

type RegisterBody = {
  nombre: string;
  email: string;
  password: string;
  oficinaId: string;
};

const login = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
const register = (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {
    let { nombre, email, password, oficinaId } = req.body;
  } catch (error) {}
};
