import express from "express";
const router = express.Router();

import { create, login } from "../controllers/userController";

router.post("/register", create);
router.post("/login", login);

export default router;
