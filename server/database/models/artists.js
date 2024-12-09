const { DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const Artist = sequelize.define("Artist", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allownull: false,
  },
});

module.exports = Artist;
