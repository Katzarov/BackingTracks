import express from "express";
import passport from "passport";
import {
    create,
    getTracksofUser,
    getYouTubeTrackInfo,
    downloadYouTubeTrack
} from "../controllers/trackController";

const trackRouter = express.Router();

trackRouter.post("/tracks", passport.authenticate("jwt", { session: false }), create);
trackRouter.get("/tracks", passport.authenticate("jwt", { session: false }), getTracksofUser);
trackRouter.get("/tracks-info", getYouTubeTrackInfo);
trackRouter.get("/tracks-download", downloadYouTubeTrack);

export { trackRouter };
