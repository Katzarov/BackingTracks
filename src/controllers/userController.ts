import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

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

export async function login(req: Request, res: Response, next: NextFunction) {
    User.findOne({ where: { email: req.body.email } })
        //@ts-ignore
        .then(user => {
            if (!user) {
                return res
                    .status(401)
                    .json({ success: false, msg: "No user registered with email." });
            }

            const isValid = isSamePassword(req.body.password, user.phash, user.salt);

            if (isValid) {
                const tokenObject = issueJWT(user);

                res.status(200).json({
                    success: true,
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires
                });
            } else {
                res.status(401).json({ success: false, msg: "Wrong password." });
            }
        })
        .catch((err: any) => {
            res.status(400).json({ success: false, msg: "Bad request." });
            next(err);
        });
}
