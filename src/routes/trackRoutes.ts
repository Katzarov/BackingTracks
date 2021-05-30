import express from "express";
import passport from "passport";
import { create, getTracksofUser } from "../controllers/trackController";

const trackRouter = express.Router();

trackRouter.post("/tracks", passport.authenticate("jwt", { session: false }), create);
trackRouter.get("/tracks", passport.authenticate("jwt", { session: false }), getTracksofUser);

export { trackRouter };
