const { Track } = require("../models");

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

module.exports = { create };
