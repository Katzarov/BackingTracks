import { Request, Response } from "express";
import Track from "../models/track";

const index = (_req: Request, res: Response) => {
    Track.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured."
            });
        });
};

const create = async (req: Request, res: Response) => {
    const { name, author, url, privateTrack } = req.body;
    try {
        const track = await Track.create({
            name,
            author,
            url,
            privateTrack
            // userId: req.user.id
        });

        return res.json(track);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = { index, create };
