import express from "express";
const router = express.Router();
import passport from "passport";

import { create, getTracksofUser } from "../controllers/trackController";

router.post("/tracks", passport.authenticate("jwt", { session: false }), create);
router.get("/tracks", passport.authenticate("jwt", { session: false }), getTracksofUser);

export default router;
