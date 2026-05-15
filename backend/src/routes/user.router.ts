import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
/* userRouter.post("/register");
userRouter.get("/me");
userRouter.post("/me"); */

export default userRouter;
