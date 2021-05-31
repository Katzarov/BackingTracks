import express from "express";
import { create, login } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", create);
userRouter.post("/login", login);

export { userRouter };
