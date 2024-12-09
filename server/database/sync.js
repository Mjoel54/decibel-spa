const sequelize = require("./db.js");
const User = require("./models/user.js");
const Artist = require("./models/artists.js");
const Song = require("./models/song.js");
const Playlist = require("./models/playlist.js");

(async () => {
  try {
    await sequelize.sync({ force: true }); // user this only in dev, it drops tables before recreating them
    console.log("Database synced!");
  } catch (error) {
    console.log("Error syncing database :(", error);
  } finally {
    process.exit();
  }
})();
