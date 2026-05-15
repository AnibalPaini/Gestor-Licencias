import { Usuario } from "../types.js";

declare global {
  namespace Express {
    interface Request {
      user?: Usuario;
    }
  }
}