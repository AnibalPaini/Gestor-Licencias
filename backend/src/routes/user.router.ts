import express from "express";
import {
  authMiddleware,
  authRolMiddleware,
  
} from "../middlewares/auth.middlewares.js";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.get("/refresh", userController.refresh);
/* userRouter.post("/register");
userRouter.get("/me");
userRouter.post("/me"); */

export default userRouter;
