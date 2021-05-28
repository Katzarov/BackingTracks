import { Request, Response } from "express";
// import { validate } from "class-validator";
import { User } from "../models/User";

export async function create(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = User.create({ firstName, lastName, email, phash: password });

        // const errors = await validate(user);
        // if (errors.length > 0) throw errors;

        await user.save();

        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
