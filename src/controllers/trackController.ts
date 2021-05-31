import { Request, Response } from "express";
import { User, Track } from "../models";

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
