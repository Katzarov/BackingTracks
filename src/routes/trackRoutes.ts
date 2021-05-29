const express = require("express");
const router = express.Router();
const passport = require("passport");

import { create, getTracksofUser } from "../controllers/trackController";

router.post("/tracks", passport.authenticate("jwt", { session: false }), create);
router.get("/tracks", passport.authenticate("jwt", { session: false }), getTracksofUser);

export default router;
