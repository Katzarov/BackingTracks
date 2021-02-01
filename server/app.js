const express = require("express");
const app = express();

const db = require("./models/index");

async function createServer() {
  try {
    await db.sequelize.authenticate();
    await app.listen(3000);
    console.log("listening");
  } catch (e) {
    console.log(e);
  }
}
createServer();
