const moogoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_DB_URL;

// connect to mongodb
function connectToMongoDB() {
  moogoose.connect(process.env.MONGO_DB_URL);

  moogoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  moogoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
  });
}

module.exports = { connectToMongoDB };
