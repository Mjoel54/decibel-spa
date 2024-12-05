const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "spotify_ui",
  "your_username",
  "your_password",
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

module.exports = sequelize;
