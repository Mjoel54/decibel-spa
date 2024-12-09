const { DataTypes } = require("sequelize");
const sequelize = require("./db.js");
const User = require("./user.js");
const Song = require("./song.js");

const Playlist = sequelize.define("Playlist", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Playlist.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Playlist, { foreginKey: "userId" });

const PlaylistSong = sequelize.define("PlaylistSong", {});

Playlist.belongsToMany(Song, { through: PlaylistSong });
Song.belongsToMany(Playlist, { through: PlaylistSong });

module.exports = Playlist;
