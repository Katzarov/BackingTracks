const { Track } = require("../models");

const index = (req, res) => {
  Track.findAll()
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
  const { name, author, url, private } = req.body;

  try {
    const track = await Track.create({
      name,
      author,
      url,
      private,
      userId: req.user.id,
    });

    return res.json(track);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { index, create };
