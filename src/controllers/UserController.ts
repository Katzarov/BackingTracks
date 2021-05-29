import { Request, Response } from "express";
import User from "../models/user";

export async function index(_req: Request, res: Response) {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export async function create(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            phash: password
        });

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
