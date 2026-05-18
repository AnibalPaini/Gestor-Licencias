import { UserToken } from "../../utils/auth.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}