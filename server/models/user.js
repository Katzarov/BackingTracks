"use strict";
const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username already exists.",
        },
        validate: {
          len: {
            args: [4, 16],
            msg: "Username must be between 4 and 16 characters long.",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Email is not valid.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,32}$",
            ],
            msg: "Password must ...",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );

  User.beforeCreate(async (user) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((e) => {
        throw new Error(e);
      });
  });

  User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.sync({ force: true });

  return User;
};
