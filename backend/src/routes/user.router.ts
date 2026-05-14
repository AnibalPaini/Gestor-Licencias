import express from "express";
import user from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", user.login);
userRouter.post("/register");
userRouter.get("/me");
userRouter.post("/me");
