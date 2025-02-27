const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/db_worldreader");
    console.log("mongodb connected");
  } catch (error) {
    console.log(`[!] Mongodb not connected`.red.underline.bold(), error);
    console.log(error);
  }
};
module.exports = connectDB;
