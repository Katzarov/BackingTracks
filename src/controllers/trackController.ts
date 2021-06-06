import { Request, Response } from "express";
import { User, Track } from "../models";
import {
    getInfo,
    getFormatsForClient,
    getFormats,
    getMetadata,
    chooseFormatAuto,
    chooseFormatManually,
    getDownloadStream
} from "../services/youtubeUtils";
import { convertStream } from "../services/streamConverterUtils";
import { getSaveStream } from "../services/streamIoUtils";

import stream from "stream";

import { promisify } from "util";

export async function create(req: Request, res: Response) {
    const { name, author, url, privateTrack } = req.body;
    //@ts-ignore
    const userUuid = req.user.uuid;

    try {
        const user = await User.findOneOrFail({ uuid: userUuid });

        const track = new Track({ name, author, url, privateTrack, user });

        await track.save();

        return res.json(track);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export async function getTracksofUser(req: Request, res: Response) {
    //@ts-ignore
    const userUuid = req.user.uuid;
    console.log(userUuid);

    try {
        // const users = await User.find({ relations: ["tracks"], where: { uuid: userUuid } });
        const tracks = await Track.find({ relations: ["user"], where: { user: userUuid } });
        // const t = await getConnection()
        //     .createQueryBuilder()
        //     .select("users.firstName")
        //     .from(User, "users")
        //     .getOne();

        return res.json(tracks);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export async function getYouTubeTrackInfo(req: Request, res: Response) {
    const { url } = req.body;
    try {
        const info = await getInfo(url);
        const metaData = getMetadata(info);
        const formats = getFormats(info);
        const formatsPresent = getFormatsForClient(formats);
        const chosenFormat = chooseFormatAuto(formats).itag;

        return res.json({ metaData, formatsPresent, chosenFormat });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export async function downloadYouTubeTrack(req: Request, res: Response) {
    const { url, itag } = req.body;
    const pipeline = promisify(stream.pipeline);

    try {
        const info = await getInfo(url);
        const metaData = getMetadata(info);

        const formats = getFormats(info);
        const chosenFormat = chooseFormatManually(formats, itag);

        await pipeline(
            getDownloadStream(url, chosenFormat),
            convertStream,
            getSaveStream(metaData.title)
        );

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
