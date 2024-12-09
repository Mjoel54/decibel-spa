const { DataTypes } = require("sequelize");
const sequelize = require("./db.js");
const Artist = require("./artists.js");

const Song = sequelize.define("Song", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // duration in seconds
    allowNull: false,
  },
});

// songs belongs to an artist
Song.belongsTo(Artist, { foreignKey: "artistsId", onDelete: "CASCADE" });
Artist.hasMany(Song, { foreignKey: "artistsId" });

module.exports = Song;
