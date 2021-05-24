import express from "express";
const app = express();
import cors from "cors";

app.use(cors({ origin: true, credentials: true }));

import session from "express-session";
import passport from "passport";

app.use(express.json());

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import db from "./models/index";

if (process.argv[2] === "dev") {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
}

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        }
    })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, _res, next) => {
    console.log(req.session);
    console.log(req.user);

    if (req.user) {
        //@ts-ignore
        console.log(req.user.email);
    }
    next();
});

import userRoutes from "./routes/UserRoutes";

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
