const { User } = require("../models");

const index = (req, res) => {
  User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured.",
      });
    });
};

const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phash: password,
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { index, create };
