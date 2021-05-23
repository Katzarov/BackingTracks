"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "User" });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        private: undefined,
      };
    }
  }
  Track.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
