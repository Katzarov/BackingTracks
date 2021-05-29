import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors({ origin: true, credentials: true }));

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import sequelize from "./models";
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection to the database has been established successfully.");
    })
    .catch((err: any) => {
        console.error("Unable to connect to the database:", err);
    });

if (process.argv[2] === "dev") {
    sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
}

// init models
require("./models/user");
require("./models/track");

import passport from "passport";
import { passportConfig } from "./config/passport";
passportConfig(passport);
app.use(passport.initialize());

import userRoutes from "./routes/UserRoutes";
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
