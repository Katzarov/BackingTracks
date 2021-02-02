const express = require('express');
const router = express.Router();

const users = require("../controllers/UserController");

// @route   GET api/users
// @desc    get all users
// @access  public

router.get('/users', users.index);

module.exports = router;