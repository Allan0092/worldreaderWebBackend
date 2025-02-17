const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  date_of_birth: { type: Date },
  Country: { type: String, default: "North Korea" },
  registrationDate: { type: Date, default: Date.now },
  verificationStatus: { type: Boolean, default: false }, // For user verification
  profilePicture: { type: String, default: "./default_pic.jpg" },
  activated: { type: Boolean, default: true }, // false if deleted account
});

const User = mongoose.model("User", userSchema);

module.exports = User;
