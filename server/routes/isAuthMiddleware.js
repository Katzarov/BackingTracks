function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json("You are not authorized to view this resource");
  }
}

module.exports = { isAuth };
