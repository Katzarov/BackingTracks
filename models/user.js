"use strict";
const { hashPassword } = require("../utils/passwordUtils");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Track }) {
      this.hasMany(Track, { foreignKey: "userId", as: "Tracks" });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        salt: undefined,
        phash: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email is already used.",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Email is not valid.",
          },
        },
      },
      phash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );

  User.beforeCreate((user) => {
    const { phash, salt } = hashPassword(user.phash);
    user.phash = phash;
    user.salt = salt;
  });

  return User;
};
