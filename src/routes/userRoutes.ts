const express = require("express");
const router = express.Router();

import { create } from "../controllers/userController";

// Register a new user
router.post("/register", create);

export default router;
