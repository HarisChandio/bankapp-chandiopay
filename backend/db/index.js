const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected");
  } catch (error) {
    console.log("error connecting to database");
    console.log(error);
  }
}

module.exports = { connect};
