"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: faker.internet.userName(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: "hashedpassword",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
