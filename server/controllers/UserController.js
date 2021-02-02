const { User } = require("../models");

const index = (req, res) => {
  User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured.",
      });
    });
};

module.exports = { index };
