"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {}
  }
  Track.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      band: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Track",
      tableName: "Tracks",
    }
  );

  return Track;
};
