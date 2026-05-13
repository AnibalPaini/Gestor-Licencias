import express from "express";

const userRouter = express.Router()

userRouter.post("/login")
userRouter.post("/register")
userRouter.get("/me")
userRouter.post("/me")