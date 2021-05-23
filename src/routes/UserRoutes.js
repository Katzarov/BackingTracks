
const express = require("express");
const passport = require("passport");

const router = express.Router();

const { isAuth } = require("../routes/isAuthMiddleware");

const users = require("../controllers/UserController");
const tracks = require("../controllers/TrackController");

// @route   GET api/users
// @desc    get all users
// @access  public

router.get("/users", isAuth, users.index);

router.post("/users", users.create);

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "Login Unsuccessful",
    successMessage: "Login successful",
  }),
  function (req, res, next) {
    res.status(200).json("Login Successful");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json("Logout Successful");
});

router.get("/tracks", tracks.index);

router.post("/tracks", isAuth, tracks.create);



module.exports = router;
