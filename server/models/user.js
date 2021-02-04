"use strict";
const { hashPassword } = require("../utils/passwordUtils");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
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
        allowNull: false,
        defaultValue: "0",
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

  User.sync({ force: true });

  return User;
};
