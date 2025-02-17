const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/db_worldreader");
    console.log("mongodb connected");
  } catch (e) {
    console.log(`[!] Mongodb not connected`.red.underline.bold());
    console.log(e);
  }
};
module.exports = connectDB;
