import { Request, Response } from "express";
import { User } from "../models";

import { isSamePassword } from "../utils/passwordUtils";
import { issueJWT } from "../utils/jwtUtils";

export async function create(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = User.create({ firstName, lastName, email, phash: password });

        await user.save();

        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        // user with such email not found
        if (!user) return res.status(401).json({ success: false, msg: "Wrong email or password!" });

        // password not valid
        if (!isSamePassword(req.body.password, user.phash, user.salt))
            return res.status(401).json({ success: false, msg: "Wrong email or password!" });

        // found user and valid password
        const tokenObject = issueJWT(user);

        return res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires
        });
    } catch (err) {
        return res
            .status(400)
            .json({ success: false, msg: "Bad request or something else went wrong", detail: err });
    }
}
