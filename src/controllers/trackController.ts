import { Request, Response } from "express";
import { User } from "../models/User";
import { Track } from "../models/Track";

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
        const users = await User.find({ relations: ["tracks"], where: { uuid: userUuid } });
        // const tracks = await User.find({ relations: ["user"] });

        return res.json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
}
