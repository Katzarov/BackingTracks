const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));

const session = require("express-session");
const passport = require("passport");

app.use(express.json());

const db = require("./models/index");

if (process.argv[2] === "dev") {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
}

require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);

  if (req.user) {
    console.log(req.user.email);
  }
  next();
});

const userRoutes = require("./routes/UserRoutes");

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
