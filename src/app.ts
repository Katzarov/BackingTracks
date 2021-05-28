import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors({ origin: true, credentials: true }));

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(path.resolve(), "../.env") });

import "reflect-metadata";
import { createConnection } from "typeorm";

import passport from "passport";
import { passportConfig } from "./config/passport";
passportConfig(passport);
app.use(passport.initialize());

import userRoutes from "./routes/userRoutes";
app.use("/api", userRoutes);

createConnection()
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}.`);
        });
    })
    .catch(error => console.log(error));
